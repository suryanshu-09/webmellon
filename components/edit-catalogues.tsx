"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { SelectEdit } from "./select"
import { useSetAtom } from "jotai"
import { nameCatalogueAtom } from "@/store/atoms/selectedAtom"
import { SonnerDeleteCatalogue } from "@/components/sonner-delete-catalogue"
import { SonnerUpdateCatalogue } from "@/components/sonner-update-catalogue"
import { SonnerAddCatalogue } from "@/components/sonner-add-catalogue"
import { z } from "zod"


export const editCatalogueSchema = z.object({
  nameCatalogue: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name should be at least one letter long" }),
});

export function EditCatalogue() {
  const setName = useSetAtom(nameCatalogueAtom)
  return (
    <Tabs defaultValue="edit" className="w-[300px] sm:w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="edit">Edit Catalogues</TabsTrigger>
        <TabsTrigger value="add">Add a Catalogue</TabsTrigger>
      </TabsList>
      <TabsContent value="edit">
        <Card>
          <CardHeader>
            <CardTitle>Edit</CardTitle>
            <CardDescription>
              Make changes to your catalogues here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Select a Catalogue</Label>
              <SelectEdit dataType="catalogue"></SelectEdit>
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">New Name</Label>
              <Input
                id="username"
                placeholder="New Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SonnerUpdateCatalogue />
            <SonnerDeleteCatalogue />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="add">
        <Card>
          <CardHeader>
            <CardTitle>Add</CardTitle>
            <CardDescription>
              Add your catalogue here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">New Catalogue</Label>
              <Input id="current"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-1">
            <SonnerAddCatalogue />
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs >
  )
}
