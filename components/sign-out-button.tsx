"use client";
import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export const SignOutButton = () => {
  return (
    <Button
      onClick={() => {
        sessionStorage.clear();
        localStorage.clear();
        logout();
      }}
      variant="destructive"
      className="w-full"
    >
      {" "}
      Sign Out
    </Button>
  );
};
