import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fetchCataloguesPaginated } from "@/actions/fetch";
import { User } from "@/lib/generated/prisma";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const sortBy = (searchParams.get("sortBy") || "name") as
      | "name"
      | "createdAt"
      | "updatedAt";
    const sortOrder = (searchParams.get("sortOrder") || "asc") as
      | "asc"
      | "desc";
    const searchQuery = searchParams.get("search") || undefined;

    // Validate page and limit
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    // Validate sortBy
    if (!["name", "createdAt", "updatedAt"].includes(sortBy)) {
      return NextResponse.json(
        { error: "Invalid sortBy parameter" },
        { status: 400 }
      );
    }

    // Validate sortOrder
    if (!["asc", "desc"].includes(sortOrder)) {
      return NextResponse.json(
        { error: "Invalid sortOrder parameter" },
        { status: 400 }
      );
    }

    const result = await fetchCataloguesPaginated(session.user as User, {
      page,
      limit,
      sortBy,
      sortOrder,
      searchQuery,
    });

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "private, max-age=60, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error fetching paginated catalogues:", error);
    return NextResponse.json(
      { error: "Failed to fetch catalogues" },
      { status: 500 }
    );
  }
}
