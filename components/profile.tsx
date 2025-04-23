"use client"
import { useAtom } from "jotai"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SignOutButton } from "@/components/sign-out-button"
import { userAtom } from "@/store/atoms/userAtom"
import { redirect } from "next/navigation"
import { ModeToggle } from "./mode-toggle"

export default function Profile() {
  const [user] = useAtom(userAtom)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user && (
          <>
            <Avatar>
              <AvatarImage src={user.image ?? ""}></AvatarImage>
              <AvatarFallback>{user.name?.slice(0, 2) ?? "WM"}</AvatarFallback>
            </Avatar>
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Accout</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => redirect("/dashboard")}>Home</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => redirect("/user")}>Profile</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => redirect("/edit")}> Edit</DropdownMenuItem>
        <DropdownMenuItem><ModeToggle />Theme</DropdownMenuItem>
        <DropdownMenuItem><SignOutButton /></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}
