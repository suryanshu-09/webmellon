"use client";
import { redirect } from "next/navigation";
import React from "react";

export default function EditPage() {
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth > 768) {
      return redirect("/edit/catalogues");
    }
  });

  return <div>Car</div>;
}
