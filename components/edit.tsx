"use client";
import { redirect } from "next/navigation";
import React from "react";
import { EditCatalogue } from "@/components/edit-catalogues";
import { EditWebsite } from "@/components/edit-websites";
import { EditFeed } from "@/components/edit-feed";

export default function EditPage() {
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth > 768) {
      return redirect("/edit/catalogues");
    }
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="mt-4">
        <div className="font-bold sm:font-xl">
          Edit <span className="italic underline">Catalogues</span>
        </div>
        <EditCatalogue />
      </div>
      <div className="mt-12">
        <div className="font-bold font-xl">
          Edit <span className="italic underline">Websites</span>
        </div>
        <EditWebsite />
      </div>

      <div className="mt-12">
        <div className="font-bold sm:font-xl">
          Edit <span className="italic underline">Feed</span>
        </div>
        <EditFeed />
      </div>
    </div>
  );
}
