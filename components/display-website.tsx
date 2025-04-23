import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Website } from "@/prisma/generated/zod"

export default function DisplayWebsite({ website }: { website: Website }) {
  return (
    <div className="flex justify-around">
      <div className="border rounded-lg p-3 mt-3 bg-[#8ACED7] dark:bg-[#17171A] max-w-108 min-w-70 sm:min-w-108 flex justify-center items-center">
        <div>
          <Avatar>
            <AvatarImage src={website.favicon} />
            <AvatarFallback>{website.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <LinkWithArrow link={website.url} name={website.name}></LinkWithArrow>
        </div>
      </div>
    </div>
  )
}


function LinkWithArrow({ link, name }: { link: string, name: string }) {
  return (
    <Button asChild variant="link" className="p-0 h-auto text-base">
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <div className="truncate overflow-hidden whitespace-nowrap max-w-[150px]">
          {name}
        </div>
        <ArrowUpRight className="ml-1 h-4 w-4" />
      </Link>
    </Button>
  )
}
