import { z } from "zod"
import { CatalogueSchema, WebsiteSchema } from "../prisma/generated/zod/index"

export const CatalogueWithWebsitesSchema = CatalogueSchema.extend({
  websites: z.array(WebsiteSchema),
})

export type CatalogueWithWebsites = z.infer<typeof CatalogueWithWebsitesSchema>

export const UserSessionSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image: z.string().url(),
  id: z.string()
})

export type UserSessionType = z.infer<typeof UserSessionSchema>

export type dashboardState = {
  search: boolean
  catalogueId: number
}
