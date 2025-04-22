"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAtomValue } from "jotai"
import { Label } from "@/components/ui/label"
import { userAtom } from "@/store/atoms/userAtom"
import { deleteUser } from "@/actions/delete"
import { logout } from "@/actions/auth"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/prisma/generated/zod"
import { Session } from "next-auth"

export function EditProfile() {
  const user: Session["user"] | null = useAtomValue(userAtom);

  return (
    <Card className="w-[300px] sm:w-[350px] mt-3">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Manage Your Profile</CardTitle>
            <CardDescription>Bird&apos;s Eye View of your account</CardDescription>
          </div>
          <Avatar className="">
            <AvatarImage src={user?.image ?? ""} />
            <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() ?? "WM"}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2 sm:space-y-3">
              <Label htmlFor="name">Name</Label>
              <div className="border rounded-md p-2">{user?.name}</div>
              <Label htmlFor="email">Email</Label>
              <div className="border rounded-md p-2">{user?.email}</div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end mt-2">
        <AlertDialog>
          <AlertDialogTrigger asChild><Button variant="destructive">Delete User</Button></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={async () => {
                await deleteUser(user as User)
                logout();
              }}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card >
  )
}
