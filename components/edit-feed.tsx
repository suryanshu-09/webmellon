"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSetAtom } from "jotai";
import {
  channelYTAtom,
  imageWPAtom,
  urlNewsAtom,
  urlWPAtom,
} from "@/store/atoms/selectedAtom";
import { SonnerAddYT } from "@/components/sonner-add-yt";
import { SonnerDeleteYT } from "@/components/sonner-delete-yt";
import SelectYT from "@/components/select-yt";
import { SonnerAddWP } from "@/components/sonner-add-wp";
import { SonnerDeleteWP } from "@/components/sonner-delete-wp";
import SelectWP from "@/components/select-wp";
import SelectNews from "@/components/select-news";
import { SonnerAddNews } from "./sonner-add-news";
import { SonnerDeleteNews } from "./sonner-delete-news";

export function EditFeed() {
  const setWP = useSetAtom(urlWPAtom);
  const setImg = useSetAtom(imageWPAtom);
  const newChannel = useSetAtom(channelYTAtom);
  const setNews = useSetAtom(urlNewsAtom);

  return (
    <Tabs defaultValue="yt" className="w-full">
      <TabsList className="hidden sm:grid w-full grid-cols-3">
        <TabsTrigger value="yt">Edit Youtube Feed</TabsTrigger>
        <TabsTrigger value="wp">Edit WordPress Feed</TabsTrigger>
        <TabsTrigger value="news">Edit News Feed</TabsTrigger>
      </TabsList>

      <div className="flex flex-col gap-4 sm:hidden">
        <Card>
          <CardHeader>
            <CardTitle>Edit Youtube Feed</CardTitle>
            <CardDescription>
              Make changes to your youtube feed here. Click save when
              you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Select a Channel</Label>
              <SelectYT />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Add a Channel by ID</Label>
              <Input
                id="username"
                placeholder="New Name"
                onChange={(e) => newChannel(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SonnerAddYT />
            <SonnerDeleteYT />
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Edit WordPress Feed</CardTitle>
            <CardDescription>Edit your wordpress feed here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Select a Feed</Label>
              <SelectWP />
            </div>
            <div className="space-y-1">
              <Label htmlFor="current">Add a WordPress RSS Feed</Label>
              <Input
                id="current"
                placeholder="URL"
                onChange={(e) => setWP(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="current">
                Add the image index for the WordPress Feed
              </Label>
              <Input
                id="current"
                placeholder="Image"
                type="number"
                onChange={(e) => setImg(parseInt(e.target.value))}
              />
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SonnerAddWP />
            <SonnerDeleteWP />
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Edit News Feed</CardTitle>
            <CardDescription>Edit your news feed here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Select a Feed</Label>
              <SelectNews />
            </div>
            <div className="space-y-1">
              <Label htmlFor="current">Add a News Feed</Label>
              <Input
                id="current"
                placeholder="URL"
                onChange={(e) => setNews(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SonnerAddNews />
            <SonnerDeleteNews />
          </CardFooter>
        </Card>
      </div>

      {/* Desktop tabbed layout — hidden on small screens */}
      <div className="hidden sm:block">
        <TabsContent value="yt">
          <Card>
            <CardHeader>
              <CardTitle>Edit Youtube Feed</CardTitle>
              <CardDescription>
                Make changes to your youtube feed here. Click save when
                you&apos;re done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Select a Channel</Label>
                <SelectYT />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Add a Channel by ID</Label>
                <Input
                  id="username"
                  placeholder="New Name"
                  onChange={(e) => newChannel(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SonnerAddYT />
              <SonnerDeleteYT />
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="wp">
          <Card>
            <CardHeader>
              <CardTitle>Edit WordPress Feed</CardTitle>
              <CardDescription>Edit your wordpress feed here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Select a Feed</Label>
                <SelectWP />
              </div>
              <div className="space-y-1">
                <Label htmlFor="current">Add a WordPress RSS Feed</Label>
                <Input
                  id="current"
                  placeholder="URL"
                  onChange={(e) => setWP(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="current">
                  Add the image index for the WordPress Feed
                </Label>
                <Input
                  id="current"
                  placeholder="Image"
                  type="number"
                  onChange={(e) => setImg(parseInt(e.target.value))}
                />
              </div>
            </CardContent>
            <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SonnerAddWP />
              <SonnerDeleteWP />
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="news">
          <Card>
            <CardHeader>
              <CardTitle>Edit News Feed</CardTitle>
              <CardDescription>Edit your news feed here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Select a Feed</Label>
                <SelectNews />
              </div>
              <div className="space-y-1">
                <Label htmlFor="current">Add a News Feed</Label>
                <Input
                  id="current"
                  placeholder="URL"
                  onChange={(e) => setNews(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SonnerAddNews />
              <SonnerDeleteNews />
            </CardFooter>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
}
