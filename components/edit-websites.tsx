"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs"
import { SelectEdit } from "@/components/select"
import { useSetAtom } from "jotai"
import { nameWebsiteAtom, urlWebsiteAtom } from "@/store/atoms/selectedAtom"
import { SonnerDeleteWebsite } from "@/components/sonner-delete-website"
import { SonnerUpdateWebsite } from "@/components/sonner-update-website"
import { SonnerAddWebsite } from "@/components/sonner-add-website"

export function EditWebsite() {
  const setName = useSetAtom(nameWebsiteAtom);
  const setUrl = useSetAtom(urlWebsiteAtom);
  return (
    <Tabs defaultValue="edit" className="w-[300px] sm:w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="edit">Edit Websites</TabsTrigger>
        <TabsTrigger value="add">Add a Website</TabsTrigger>
      </TabsList>
      <TabsContent value="edit">
        <Card>
          <CardHeader>
            <CardTitle>Edit</CardTitle>
            <CardDescription>
              Make changes to your Websites here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Select a Catalogue</Label>
              <SelectEdit dataType="catalogue"></SelectEdit>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Select a Website</Label>
              <SelectEdit dataType="website"></SelectEdit>
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">New Name</Label>
              <Input
                id="username"
                placeholder="New Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">New URL</Label>
              <Input
                id="url"
                placeholder="New URL"
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SonnerUpdateWebsite />
            <SonnerDeleteWebsite />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="add">
        <Card>
          <CardHeader>
            <CardTitle>Add</CardTitle>
            <CardDescription>
              Add your Website here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Select a Catalogue to add the website to</Label>
              <SelectEdit dataType="catalogue"></SelectEdit>
            </div>
            <div className="space-y-1">
              <Label htmlFor="current">New Website</Label>
              <Input id="current"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">URL</Label>
              <Input
                id="url"
                placeholder="New URL"
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-1">
            <SonnerAddWebsite />
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs >
  )
}
