import { CatalogueWithWebsites } from "@/types/types";
import DisplayWebsite from "@/components/display-website";
import { Website } from "@/prisma/generated/zod";

export default function DisplayCatalogue({ catalogue }: { catalogue: CatalogueWithWebsites }) {
  return (
    <div className="my-6">
      <div className="flex justify-center">
        <div className="truncate flex justify-center font-bold text-lg sm:text-2xl bg-[#023047] rounded-lg p-3 text-[#F6F8E3] max-w-min min-w-60 sm:min-w-max">
          {catalogue.name}
        </div>
      </div>
      {catalogue.websites.length !== 0 ?
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-6 ">
          {Array.isArray(catalogue.websites) && catalogue.websites.map((web: Website) => {
            return <DisplayWebsite key={web.id} website={web} />
          })}
        </div>
        : <div className="flex justify-center mt-6">No websites in this catalogue, please add some.</div>
      }
    </div>
  )
}
