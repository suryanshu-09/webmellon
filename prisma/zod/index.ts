import { z } from 'zod';
import { Prisma } from '../../lib/generated/prisma';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const YtRSSScalarFieldEnumSchema = z.enum(['id','channelId','userId']);

export const NewsRSSScalarFieldEnumSchema = z.enum(['id','url','userId']);

export const WpRSSScalarFieldEnumSchema = z.enum(['id','url','userId','image']);

export const CatalogueScalarFieldEnumSchema = z.enum(['id','name','userId']);

export const WebsiteScalarFieldEnumSchema = z.enum(['id','catalogueId','name','url','favicon','userId']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','preferences','createdAt','updatedAt']);

export const AccountScalarFieldEnumSchema = z.enum(['userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state','createdAt','updatedAt']);

export const SessionScalarFieldEnumSchema = z.enum(['sessionToken','userId','expires','createdAt','updatedAt']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// YT RSS SCHEMA
/////////////////////////////////////////

export const YtRSSSchema = z.object({
  id: z.number().int(),
  channelId: z.string(),
  userId: z.string(),
})

export type YtRSS = z.infer<typeof YtRSSSchema>

/////////////////////////////////////////
// NEWS RSS SCHEMA
/////////////////////////////////////////

export const NewsRSSSchema = z.object({
  id: z.number().int(),
  url: z.string(),
  userId: z.string(),
})

export type NewsRSS = z.infer<typeof NewsRSSSchema>

/////////////////////////////////////////
// WP RSS SCHEMA
/////////////////////////////////////////

export const WpRSSSchema = z.object({
  id: z.number().int(),
  url: z.string(),
  userId: z.string(),
  image: z.number().int(),
})

export type WpRSS = z.infer<typeof WpRSSSchema>

/////////////////////////////////////////
// CATALOGUE SCHEMA
/////////////////////////////////////////

export const CatalogueSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  userId: z.string(),
})

export type Catalogue = z.infer<typeof CatalogueSchema>

/////////////////////////////////////////
// WEBSITE SCHEMA
/////////////////////////////////////////

export const WebsiteSchema = z.object({
  id: z.number().int(),
  catalogueId: z.number().int(),
  name: z.string(),
  url: z.string(),
  favicon: z.string(),
  userId: z.string(),
})

export type Website = z.infer<typeof WebsiteSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  preferences: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// YT RSS
//------------------------------------------------------

export const YtRSSIncludeSchema: z.ZodType<Prisma.YtRSSInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const YtRSSArgsSchema: z.ZodType<Prisma.YtRSSDefaultArgs> = z.object({
  select: z.lazy(() => YtRSSSelectSchema).optional(),
  include: z.lazy(() => YtRSSIncludeSchema).optional(),
}).strict();

export const YtRSSSelectSchema: z.ZodType<Prisma.YtRSSSelect> = z.object({
  id: z.boolean().optional(),
  channelId: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// NEWS RSS
//------------------------------------------------------

export const NewsRSSIncludeSchema: z.ZodType<Prisma.NewsRSSInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const NewsRSSArgsSchema: z.ZodType<Prisma.NewsRSSDefaultArgs> = z.object({
  select: z.lazy(() => NewsRSSSelectSchema).optional(),
  include: z.lazy(() => NewsRSSIncludeSchema).optional(),
}).strict();

export const NewsRSSSelectSchema: z.ZodType<Prisma.NewsRSSSelect> = z.object({
  id: z.boolean().optional(),
  url: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// WP RSS
//------------------------------------------------------

export const WpRSSIncludeSchema: z.ZodType<Prisma.WpRSSInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const WpRSSArgsSchema: z.ZodType<Prisma.WpRSSDefaultArgs> = z.object({
  select: z.lazy(() => WpRSSSelectSchema).optional(),
  include: z.lazy(() => WpRSSIncludeSchema).optional(),
}).strict();

export const WpRSSSelectSchema: z.ZodType<Prisma.WpRSSSelect> = z.object({
  id: z.boolean().optional(),
  url: z.boolean().optional(),
  userId: z.boolean().optional(),
  image: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// CATALOGUE
//------------------------------------------------------

export const CatalogueIncludeSchema: z.ZodType<Prisma.CatalogueInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  websites: z.union([z.boolean(),z.lazy(() => WebsiteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CatalogueCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CatalogueArgsSchema: z.ZodType<Prisma.CatalogueDefaultArgs> = z.object({
  select: z.lazy(() => CatalogueSelectSchema).optional(),
  include: z.lazy(() => CatalogueIncludeSchema).optional(),
}).strict();

export const CatalogueCountOutputTypeArgsSchema: z.ZodType<Prisma.CatalogueCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CatalogueCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CatalogueCountOutputTypeSelectSchema: z.ZodType<Prisma.CatalogueCountOutputTypeSelect> = z.object({
  websites: z.boolean().optional(),
}).strict();

export const CatalogueSelectSchema: z.ZodType<Prisma.CatalogueSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  websites: z.union([z.boolean(),z.lazy(() => WebsiteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CatalogueCountOutputTypeArgsSchema)]).optional(),
}).strict()

// WEBSITE
//------------------------------------------------------

export const WebsiteIncludeSchema: z.ZodType<Prisma.WebsiteInclude> = z.object({
  catalogue: z.union([z.boolean(),z.lazy(() => CatalogueArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const WebsiteArgsSchema: z.ZodType<Prisma.WebsiteDefaultArgs> = z.object({
  select: z.lazy(() => WebsiteSelectSchema).optional(),
  include: z.lazy(() => WebsiteIncludeSchema).optional(),
}).strict();

export const WebsiteSelectSchema: z.ZodType<Prisma.WebsiteSelect> = z.object({
  id: z.boolean().optional(),
  catalogueId: z.boolean().optional(),
  name: z.boolean().optional(),
  url: z.boolean().optional(),
  favicon: z.boolean().optional(),
  userId: z.boolean().optional(),
  catalogue: z.union([z.boolean(),z.lazy(() => CatalogueArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  catalogues: z.union([z.boolean(),z.lazy(() => CatalogueFindManyArgsSchema)]).optional(),
  news: z.union([z.boolean(),z.lazy(() => NewsRSSFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  websites: z.union([z.boolean(),z.lazy(() => WebsiteFindManyArgsSchema)]).optional(),
  wp: z.union([z.boolean(),z.lazy(() => WpRSSFindManyArgsSchema)]).optional(),
  yt: z.union([z.boolean(),z.lazy(() => YtRSSFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  catalogues: z.boolean().optional(),
  news: z.boolean().optional(),
  sessions: z.boolean().optional(),
  websites: z.boolean().optional(),
  wp: z.boolean().optional(),
  yt: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  preferences: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  catalogues: z.union([z.boolean(),z.lazy(() => CatalogueFindManyArgsSchema)]).optional(),
  news: z.union([z.boolean(),z.lazy(() => NewsRSSFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  websites: z.union([z.boolean(),z.lazy(() => WebsiteFindManyArgsSchema)]).optional(),
  wp: z.union([z.boolean(),z.lazy(() => WpRSSFindManyArgsSchema)]).optional(),
  yt: z.union([z.boolean(),z.lazy(() => YtRSSFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const YtRSSWhereInputSchema: z.ZodType<Prisma.YtRSSWhereInput> = z.object({
  AND: z.union([ z.lazy(() => YtRSSWhereInputSchema),z.lazy(() => YtRSSWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => YtRSSWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => YtRSSWhereInputSchema),z.lazy(() => YtRSSWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const YtRSSOrderByWithRelationInputSchema: z.ZodType<Prisma.YtRSSOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const YtRSSWhereUniqueInputSchema: z.ZodType<Prisma.YtRSSWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    user_ytrss_channelId_unique: z.lazy(() => YtRSSUser_ytrss_channelId_uniqueCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    user_ytrss_channelId_unique: z.lazy(() => YtRSSUser_ytrss_channelId_uniqueCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  user_ytrss_channelId_unique: z.lazy(() => YtRSSUser_ytrss_channelId_uniqueCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => YtRSSWhereInputSchema),z.lazy(() => YtRSSWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => YtRSSWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => YtRSSWhereInputSchema),z.lazy(() => YtRSSWhereInputSchema).array() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const YtRSSOrderByWithAggregationInputSchema: z.ZodType<Prisma.YtRSSOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => YtRSSCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => YtRSSAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => YtRSSMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => YtRSSMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => YtRSSSumOrderByAggregateInputSchema).optional()
}).strict();

export const YtRSSScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.YtRSSScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => YtRSSScalarWhereWithAggregatesInputSchema),z.lazy(() => YtRSSScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => YtRSSScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => YtRSSScalarWhereWithAggregatesInputSchema),z.lazy(() => YtRSSScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  channelId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const NewsRSSWhereInputSchema: z.ZodType<Prisma.NewsRSSWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NewsRSSWhereInputSchema),z.lazy(() => NewsRSSWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NewsRSSWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NewsRSSWhereInputSchema),z.lazy(() => NewsRSSWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const NewsRSSOrderByWithRelationInputSchema: z.ZodType<Prisma.NewsRSSOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const NewsRSSWhereUniqueInputSchema: z.ZodType<Prisma.NewsRSSWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    user_newsrss_url_unique: z.lazy(() => NewsRSSUser_newsrss_url_uniqueCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    user_newsrss_url_unique: z.lazy(() => NewsRSSUser_newsrss_url_uniqueCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  user_newsrss_url_unique: z.lazy(() => NewsRSSUser_newsrss_url_uniqueCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => NewsRSSWhereInputSchema),z.lazy(() => NewsRSSWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NewsRSSWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NewsRSSWhereInputSchema),z.lazy(() => NewsRSSWhereInputSchema).array() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const NewsRSSOrderByWithAggregationInputSchema: z.ZodType<Prisma.NewsRSSOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NewsRSSCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => NewsRSSAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NewsRSSMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NewsRSSMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => NewsRSSSumOrderByAggregateInputSchema).optional()
}).strict();

export const NewsRSSScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NewsRSSScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NewsRSSScalarWhereWithAggregatesInputSchema),z.lazy(() => NewsRSSScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NewsRSSScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NewsRSSScalarWhereWithAggregatesInputSchema),z.lazy(() => NewsRSSScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const WpRSSWhereInputSchema: z.ZodType<Prisma.WpRSSWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WpRSSWhereInputSchema),z.lazy(() => WpRSSWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WpRSSWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WpRSSWhereInputSchema),z.lazy(() => WpRSSWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const WpRSSOrderByWithRelationInputSchema: z.ZodType<Prisma.WpRSSOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const WpRSSWhereUniqueInputSchema: z.ZodType<Prisma.WpRSSWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    user_wprss_url_unique: z.lazy(() => WpRSSUser_wprss_url_uniqueCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    user_wprss_url_unique: z.lazy(() => WpRSSUser_wprss_url_uniqueCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  user_wprss_url_unique: z.lazy(() => WpRSSUser_wprss_url_uniqueCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => WpRSSWhereInputSchema),z.lazy(() => WpRSSWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WpRSSWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WpRSSWhereInputSchema),z.lazy(() => WpRSSWhereInputSchema).array() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const WpRSSOrderByWithAggregationInputSchema: z.ZodType<Prisma.WpRSSOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WpRSSCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WpRSSAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WpRSSMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WpRSSMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WpRSSSumOrderByAggregateInputSchema).optional()
}).strict();

export const WpRSSScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WpRSSScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WpRSSScalarWhereWithAggregatesInputSchema),z.lazy(() => WpRSSScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WpRSSScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WpRSSScalarWhereWithAggregatesInputSchema),z.lazy(() => WpRSSScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const CatalogueWhereInputSchema: z.ZodType<Prisma.CatalogueWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CatalogueWhereInputSchema),z.lazy(() => CatalogueWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CatalogueWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CatalogueWhereInputSchema),z.lazy(() => CatalogueWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  websites: z.lazy(() => WebsiteListRelationFilterSchema).optional()
}).strict();

export const CatalogueOrderByWithRelationInputSchema: z.ZodType<Prisma.CatalogueOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  websites: z.lazy(() => WebsiteOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CatalogueWhereUniqueInputSchema: z.ZodType<Prisma.CatalogueWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    user_catalogue_name_unique: z.lazy(() => CatalogueUser_catalogue_name_uniqueCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    user_catalogue_name_unique: z.lazy(() => CatalogueUser_catalogue_name_uniqueCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  user_catalogue_name_unique: z.lazy(() => CatalogueUser_catalogue_name_uniqueCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => CatalogueWhereInputSchema),z.lazy(() => CatalogueWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CatalogueWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CatalogueWhereInputSchema),z.lazy(() => CatalogueWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  websites: z.lazy(() => WebsiteListRelationFilterSchema).optional()
}).strict());

export const CatalogueOrderByWithAggregationInputSchema: z.ZodType<Prisma.CatalogueOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CatalogueCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CatalogueAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CatalogueMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CatalogueMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CatalogueSumOrderByAggregateInputSchema).optional()
}).strict();

export const CatalogueScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CatalogueScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CatalogueScalarWhereWithAggregatesInputSchema),z.lazy(() => CatalogueScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CatalogueScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CatalogueScalarWhereWithAggregatesInputSchema),z.lazy(() => CatalogueScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const WebsiteWhereInputSchema: z.ZodType<Prisma.WebsiteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WebsiteWhereInputSchema),z.lazy(() => WebsiteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WebsiteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WebsiteWhereInputSchema),z.lazy(() => WebsiteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  catalogueId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  favicon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  catalogue: z.union([ z.lazy(() => CatalogueScalarRelationFilterSchema),z.lazy(() => CatalogueWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const WebsiteOrderByWithRelationInputSchema: z.ZodType<Prisma.WebsiteOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  catalogueId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  favicon: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  catalogue: z.lazy(() => CatalogueOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const WebsiteWhereUniqueInputSchema: z.ZodType<Prisma.WebsiteWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    user_website_name_unique: z.lazy(() => WebsiteUser_website_name_uniqueCompoundUniqueInputSchema),
    user_website_url_unique: z.lazy(() => WebsiteUser_website_url_uniqueCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
    user_website_name_unique: z.lazy(() => WebsiteUser_website_name_uniqueCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.number().int(),
    user_website_url_unique: z.lazy(() => WebsiteUser_website_url_uniqueCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    user_website_name_unique: z.lazy(() => WebsiteUser_website_name_uniqueCompoundUniqueInputSchema),
    user_website_url_unique: z.lazy(() => WebsiteUser_website_url_uniqueCompoundUniqueInputSchema),
  }),
  z.object({
    user_website_name_unique: z.lazy(() => WebsiteUser_website_name_uniqueCompoundUniqueInputSchema),
  }),
  z.object({
    user_website_url_unique: z.lazy(() => WebsiteUser_website_url_uniqueCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  user_website_name_unique: z.lazy(() => WebsiteUser_website_name_uniqueCompoundUniqueInputSchema).optional(),
  user_website_url_unique: z.lazy(() => WebsiteUser_website_url_uniqueCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => WebsiteWhereInputSchema),z.lazy(() => WebsiteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WebsiteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WebsiteWhereInputSchema),z.lazy(() => WebsiteWhereInputSchema).array() ]).optional(),
  catalogueId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  favicon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  catalogue: z.union([ z.lazy(() => CatalogueScalarRelationFilterSchema),z.lazy(() => CatalogueWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const WebsiteOrderByWithAggregationInputSchema: z.ZodType<Prisma.WebsiteOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  catalogueId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  favicon: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WebsiteCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WebsiteAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WebsiteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WebsiteMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WebsiteSumOrderByAggregateInputSchema).optional()
}).strict();

export const WebsiteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WebsiteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WebsiteScalarWhereWithAggregatesInputSchema),z.lazy(() => WebsiteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WebsiteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WebsiteScalarWhereWithAggregatesInputSchema),z.lazy(() => WebsiteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  catalogueId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  favicon: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  preferences: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  catalogues: z.lazy(() => CatalogueListRelationFilterSchema).optional(),
  news: z.lazy(() => NewsRSSListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  websites: z.lazy(() => WebsiteListRelationFilterSchema).optional(),
  wp: z.lazy(() => WpRSSListRelationFilterSchema).optional(),
  yt: z.lazy(() => YtRSSListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueOrderByRelationAggregateInputSchema).optional(),
  news: z.lazy(() => NewsRSSOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  websites: z.lazy(() => WebsiteOrderByRelationAggregateInputSchema).optional(),
  wp: z.lazy(() => WpRSSOrderByRelationAggregateInputSchema).optional(),
  yt: z.lazy(() => YtRSSOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  preferences: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  catalogues: z.lazy(() => CatalogueListRelationFilterSchema).optional(),
  news: z.lazy(() => NewsRSSListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  websites: z.lazy(() => WebsiteListRelationFilterSchema).optional(),
  wp: z.lazy(() => WpRSSListRelationFilterSchema).optional(),
  yt: z.lazy(() => YtRSSListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  preferences: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
})
.and(z.object({
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  sessionToken: z.string()
})
.and(z.object({
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.object({
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
})
.and(z.object({
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const YtRSSCreateInputSchema: z.ZodType<Prisma.YtRSSCreateInput> = z.object({
  channelId: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutYtInputSchema)
}).strict();

export const YtRSSUncheckedCreateInputSchema: z.ZodType<Prisma.YtRSSUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  channelId: z.string(),
  userId: z.string()
}).strict();

export const YtRSSUpdateInputSchema: z.ZodType<Prisma.YtRSSUpdateInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutYtNestedInputSchema).optional()
}).strict();

export const YtRSSUncheckedUpdateInputSchema: z.ZodType<Prisma.YtRSSUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const YtRSSCreateManyInputSchema: z.ZodType<Prisma.YtRSSCreateManyInput> = z.object({
  id: z.number().int().optional(),
  channelId: z.string(),
  userId: z.string()
}).strict();

export const YtRSSUpdateManyMutationInputSchema: z.ZodType<Prisma.YtRSSUpdateManyMutationInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const YtRSSUncheckedUpdateManyInputSchema: z.ZodType<Prisma.YtRSSUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NewsRSSCreateInputSchema: z.ZodType<Prisma.NewsRSSCreateInput> = z.object({
  url: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutNewsInputSchema)
}).strict();

export const NewsRSSUncheckedCreateInputSchema: z.ZodType<Prisma.NewsRSSUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  url: z.string(),
  userId: z.string()
}).strict();

export const NewsRSSUpdateInputSchema: z.ZodType<Prisma.NewsRSSUpdateInput> = z.object({
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutNewsNestedInputSchema).optional()
}).strict();

export const NewsRSSUncheckedUpdateInputSchema: z.ZodType<Prisma.NewsRSSUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NewsRSSCreateManyInputSchema: z.ZodType<Prisma.NewsRSSCreateManyInput> = z.object({
  id: z.number().int().optional(),
  url: z.string(),
  userId: z.string()
}).strict();

export const NewsRSSUpdateManyMutationInputSchema: z.ZodType<Prisma.NewsRSSUpdateManyMutationInput> = z.object({
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NewsRSSUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NewsRSSUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WpRSSCreateInputSchema: z.ZodType<Prisma.WpRSSCreateInput> = z.object({
  url: z.string(),
  image: z.number().int(),
  user: z.lazy(() => UserCreateNestedOneWithoutWpInputSchema)
}).strict();

export const WpRSSUncheckedCreateInputSchema: z.ZodType<Prisma.WpRSSUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  url: z.string(),
  userId: z.string(),
  image: z.number().int()
}).strict();

export const WpRSSUpdateInputSchema: z.ZodType<Prisma.WpRSSUpdateInput> = z.object({
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWpNestedInputSchema).optional()
}).strict();

export const WpRSSUncheckedUpdateInputSchema: z.ZodType<Prisma.WpRSSUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WpRSSCreateManyInputSchema: z.ZodType<Prisma.WpRSSCreateManyInput> = z.object({
  id: z.number().int().optional(),
  url: z.string(),
  userId: z.string(),
  image: z.number().int()
}).strict();

export const WpRSSUpdateManyMutationInputSchema: z.ZodType<Prisma.WpRSSUpdateManyMutationInput> = z.object({
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WpRSSUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WpRSSUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CatalogueCreateInputSchema: z.ZodType<Prisma.CatalogueCreateInput> = z.object({
  name: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutCataloguesInputSchema),
  websites: z.lazy(() => WebsiteCreateNestedManyWithoutCatalogueInputSchema).optional()
}).strict();

export const CatalogueUncheckedCreateInputSchema: z.ZodType<Prisma.CatalogueUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  userId: z.string(),
  websites: z.lazy(() => WebsiteUncheckedCreateNestedManyWithoutCatalogueInputSchema).optional()
}).strict();

export const CatalogueUpdateInputSchema: z.ZodType<Prisma.CatalogueUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCataloguesNestedInputSchema).optional(),
  websites: z.lazy(() => WebsiteUpdateManyWithoutCatalogueNestedInputSchema).optional()
}).strict();

export const CatalogueUncheckedUpdateInputSchema: z.ZodType<Prisma.CatalogueUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  websites: z.lazy(() => WebsiteUncheckedUpdateManyWithoutCatalogueNestedInputSchema).optional()
}).strict();

export const CatalogueCreateManyInputSchema: z.ZodType<Prisma.CatalogueCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  userId: z.string()
}).strict();

export const CatalogueUpdateManyMutationInputSchema: z.ZodType<Prisma.CatalogueUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CatalogueUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CatalogueUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WebsiteCreateInputSchema: z.ZodType<Prisma.WebsiteCreateInput> = z.object({
  name: z.string(),
  url: z.string(),
  favicon: z.string(),
  catalogue: z.lazy(() => CatalogueCreateNestedOneWithoutWebsitesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutWebsitesInputSchema)
}).strict();

export const WebsiteUncheckedCreateInputSchema: z.ZodType<Prisma.WebsiteUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  catalogueId: z.number().int(),
  name: z.string(),
  url: z.string(),
  favicon: z.string(),
  userId: z.string()
}).strict();

export const WebsiteUpdateInputSchema: z.ZodType<Prisma.WebsiteUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  favicon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  catalogue: z.lazy(() => CatalogueUpdateOneRequiredWithoutWebsitesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWebsitesNestedInputSchema).optional()
}).strict();

export const WebsiteUncheckedUpdateInputSchema: z.ZodType<Prisma.WebsiteUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  catalogueId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  favicon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WebsiteCreateManyInputSchema: z.ZodType<Prisma.WebsiteCreateManyInput> = z.object({
  id: z.number().int().optional(),
  catalogueId: z.number().int(),
  name: z.string(),
  url: z.string(),
  favicon: z.string(),
  userId: z.string()
}).strict();

export const WebsiteUpdateManyMutationInputSchema: z.ZodType<Prisma.WebsiteUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  favicon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WebsiteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WebsiteUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  catalogueId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  favicon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueCreateNestedManyWithoutUserInputSchema).optional(),
  news: z.lazy(() => NewsRSSCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  websites: z.lazy(() => WebsiteCreateNestedManyWithoutUserInputSchema).optional(),
  wp: z.lazy(() => WpRSSCreateNestedManyWithoutUserInputSchema).optional(),
  yt: z.lazy(() => YtRSSCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  news: z.lazy(() => NewsRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  websites: z.lazy(() => WebsiteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  wp: z.lazy(() => WpRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  yt: z.lazy(() => YtRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUpdateManyWithoutUserNestedInputSchema).optional(),
  news: z.lazy(() => NewsRSSUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  websites: z.lazy(() => WebsiteUpdateManyWithoutUserNestedInputSchema).optional(),
  wp: z.lazy(() => WpRSSUpdateManyWithoutUserNestedInputSchema).optional(),
  yt: z.lazy(() => YtRSSUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  news: z.lazy(() => NewsRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  websites: z.lazy(() => WebsiteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  wp: z.lazy(() => WpRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  yt: z.lazy(() => YtRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const YtRSSUser_ytrss_channelId_uniqueCompoundUniqueInputSchema: z.ZodType<Prisma.YtRSSUser_ytrss_channelId_uniqueCompoundUniqueInput> = z.object({
  userId: z.string(),
  channelId: z.string()
}).strict();

export const YtRSSCountOrderByAggregateInputSchema: z.ZodType<Prisma.YtRSSCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const YtRSSAvgOrderByAggregateInputSchema: z.ZodType<Prisma.YtRSSAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const YtRSSMaxOrderByAggregateInputSchema: z.ZodType<Prisma.YtRSSMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const YtRSSMinOrderByAggregateInputSchema: z.ZodType<Prisma.YtRSSMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const YtRSSSumOrderByAggregateInputSchema: z.ZodType<Prisma.YtRSSSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NewsRSSUser_newsrss_url_uniqueCompoundUniqueInputSchema: z.ZodType<Prisma.NewsRSSUser_newsrss_url_uniqueCompoundUniqueInput> = z.object({
  userId: z.string(),
  url: z.string()
}).strict();

export const NewsRSSCountOrderByAggregateInputSchema: z.ZodType<Prisma.NewsRSSCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NewsRSSAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NewsRSSAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NewsRSSMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NewsRSSMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NewsRSSMinOrderByAggregateInputSchema: z.ZodType<Prisma.NewsRSSMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NewsRSSSumOrderByAggregateInputSchema: z.ZodType<Prisma.NewsRSSSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WpRSSUser_wprss_url_uniqueCompoundUniqueInputSchema: z.ZodType<Prisma.WpRSSUser_wprss_url_uniqueCompoundUniqueInput> = z.object({
  userId: z.string(),
  url: z.string()
}).strict();

export const WpRSSCountOrderByAggregateInputSchema: z.ZodType<Prisma.WpRSSCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WpRSSAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WpRSSAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WpRSSMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WpRSSMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WpRSSMinOrderByAggregateInputSchema: z.ZodType<Prisma.WpRSSMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WpRSSSumOrderByAggregateInputSchema: z.ZodType<Prisma.WpRSSSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WebsiteListRelationFilterSchema: z.ZodType<Prisma.WebsiteListRelationFilter> = z.object({
  every: z.lazy(() => WebsiteWhereInputSchema).optional(),
  some: z.lazy(() => WebsiteWhereInputSchema).optional(),
  none: z.lazy(() => WebsiteWhereInputSchema).optional()
}).strict();

export const WebsiteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WebsiteOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CatalogueUser_catalogue_name_uniqueCompoundUniqueInputSchema: z.ZodType<Prisma.CatalogueUser_catalogue_name_uniqueCompoundUniqueInput> = z.object({
  userId: z.string(),
  name: z.string()
}).strict();

export const CatalogueCountOrderByAggregateInputSchema: z.ZodType<Prisma.CatalogueCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CatalogueAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CatalogueAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CatalogueMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CatalogueMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CatalogueMinOrderByAggregateInputSchema: z.ZodType<Prisma.CatalogueMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CatalogueSumOrderByAggregateInputSchema: z.ZodType<Prisma.CatalogueSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CatalogueScalarRelationFilterSchema: z.ZodType<Prisma.CatalogueScalarRelationFilter> = z.object({
  is: z.lazy(() => CatalogueWhereInputSchema).optional(),
  isNot: z.lazy(() => CatalogueWhereInputSchema).optional()
}).strict();

export const WebsiteUser_website_name_uniqueCompoundUniqueInputSchema: z.ZodType<Prisma.WebsiteUser_website_name_uniqueCompoundUniqueInput> = z.object({
  userId: z.string(),
  name: z.string()
}).strict();

export const WebsiteUser_website_url_uniqueCompoundUniqueInputSchema: z.ZodType<Prisma.WebsiteUser_website_url_uniqueCompoundUniqueInput> = z.object({
  userId: z.string(),
  url: z.string()
}).strict();

export const WebsiteCountOrderByAggregateInputSchema: z.ZodType<Prisma.WebsiteCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  catalogueId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  favicon: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WebsiteAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WebsiteAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  catalogueId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WebsiteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WebsiteMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  catalogueId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  favicon: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WebsiteMinOrderByAggregateInputSchema: z.ZodType<Prisma.WebsiteMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  catalogueId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  favicon: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WebsiteSumOrderByAggregateInputSchema: z.ZodType<Prisma.WebsiteSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  catalogueId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const CatalogueListRelationFilterSchema: z.ZodType<Prisma.CatalogueListRelationFilter> = z.object({
  every: z.lazy(() => CatalogueWhereInputSchema).optional(),
  some: z.lazy(() => CatalogueWhereInputSchema).optional(),
  none: z.lazy(() => CatalogueWhereInputSchema).optional()
}).strict();

export const NewsRSSListRelationFilterSchema: z.ZodType<Prisma.NewsRSSListRelationFilter> = z.object({
  every: z.lazy(() => NewsRSSWhereInputSchema).optional(),
  some: z.lazy(() => NewsRSSWhereInputSchema).optional(),
  none: z.lazy(() => NewsRSSWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const WpRSSListRelationFilterSchema: z.ZodType<Prisma.WpRSSListRelationFilter> = z.object({
  every: z.lazy(() => WpRSSWhereInputSchema).optional(),
  some: z.lazy(() => WpRSSWhereInputSchema).optional(),
  none: z.lazy(() => WpRSSWhereInputSchema).optional()
}).strict();

export const YtRSSListRelationFilterSchema: z.ZodType<Prisma.YtRSSListRelationFilter> = z.object({
  every: z.lazy(() => YtRSSWhereInputSchema).optional(),
  some: z.lazy(() => YtRSSWhereInputSchema).optional(),
  none: z.lazy(() => YtRSSWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CatalogueOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CatalogueOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NewsRSSOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NewsRSSOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WpRSSOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WpRSSOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const YtRSSOrderByRelationAggregateInputSchema: z.ZodType<Prisma.YtRSSOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  preferences: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutYtInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutYtInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutYtInputSchema),z.lazy(() => UserUncheckedCreateWithoutYtInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutYtInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const UserUpdateOneRequiredWithoutYtNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutYtNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutYtInputSchema),z.lazy(() => UserUncheckedCreateWithoutYtInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutYtInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutYtInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutYtInputSchema),z.lazy(() => UserUpdateWithoutYtInputSchema),z.lazy(() => UserUncheckedUpdateWithoutYtInputSchema) ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserCreateNestedOneWithoutNewsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutNewsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutNewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNewsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutNewsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutNewsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutNewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNewsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutNewsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutNewsInputSchema),z.lazy(() => UserUpdateWithoutNewsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNewsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutWpInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutWpInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWpInputSchema),z.lazy(() => UserUncheckedCreateWithoutWpInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWpInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutWpNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutWpNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWpInputSchema),z.lazy(() => UserUncheckedCreateWithoutWpInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWpInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutWpInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutWpInputSchema),z.lazy(() => UserUpdateWithoutWpInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWpInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCataloguesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCataloguesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCataloguesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCataloguesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCataloguesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const WebsiteCreateNestedManyWithoutCatalogueInputSchema: z.ZodType<Prisma.WebsiteCreateNestedManyWithoutCatalogueInput> = z.object({
  create: z.union([ z.lazy(() => WebsiteCreateWithoutCatalogueInputSchema),z.lazy(() => WebsiteCreateWithoutCatalogueInputSchema).array(),z.lazy(() => WebsiteUncheckedCreateWithoutCatalogueInputSchema),z.lazy(() => WebsiteUncheckedCreateWithoutCatalogueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WebsiteCreateOrConnectWithoutCatalogueInputSchema),z.lazy(() => WebsiteCreateOrConnectWithoutCatalogueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WebsiteCreateManyCatalogueInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WebsiteUncheckedCreateNestedManyWithoutCatalogueInputSchema: z.ZodType<Prisma.WebsiteUncheckedCreateNestedManyWithoutCatalogueInput> = z.object({
  create: z.union([ z.lazy(() => WebsiteCreateWithoutCatalogueInputSchema),z.lazy(() => WebsiteCreateWithoutCatalogueInputSchema).array(),z.lazy(() => WebsiteUncheckedCreateWithoutCatalogueInputSchema),z.lazy(() => WebsiteUncheckedCreateWithoutCatalogueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WebsiteCreateOrConnectWithoutCatalogueInputSchema),z.lazy(() => WebsiteCreateOrConnectWithoutCatalogueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WebsiteCreateManyCatalogueInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCataloguesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCataloguesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCataloguesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCataloguesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCataloguesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCataloguesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCataloguesInputSchema),z.lazy(() => UserUpdateWithoutCataloguesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCataloguesInputSchema) ]).optional(),
}).strict();

export const WebsiteUpdateManyWithoutCatalogueNestedInputSchema: z.ZodType<Prisma.WebsiteUpdateManyWithoutCatalogueNestedInput> = z.object({
  create: z.union([ z.lazy(() => WebsiteCreateWithoutCatalogueInputSchema),z.lazy(() => WebsiteCreateWithoutCatalogueInputSchema).array(),z.lazy(() => WebsiteUncheckedCreateWithoutCatalogueInputSchema),z.lazy(() => WebsiteUncheckedCreateWithoutCatalogueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WebsiteCreateOrConnectWithoutCatalogueInputSchema),z.lazy(() => WebsiteCreateOrConnectWithoutCatalogueInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WebsiteUpsertWithWhereUniqueWithoutCatalogueInputSchema),z.lazy(() => WebsiteUpsertWithWhereUniqueWithoutCatalogueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WebsiteCreateManyCatalogueInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WebsiteUpdateWithWhereUniqueWithoutCatalogueInputSchema),z.lazy(() => WebsiteUpdateWithWhereUniqueWithoutCatalogueInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WebsiteUpdateManyWithWhereWithoutCatalogueInputSchema),z.lazy(() => WebsiteUpdateManyWithWhereWithoutCatalogueInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WebsiteScalarWhereInputSchema),z.lazy(() => WebsiteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WebsiteUncheckedUpdateManyWithoutCatalogueNestedInputSchema: z.ZodType<Prisma.WebsiteUncheckedUpdateManyWithoutCatalogueNestedInput> = z.object({
  create: z.union([ z.lazy(() => WebsiteCreateWithoutCatalogueInputSchema),z.lazy(() => WebsiteCreateWithoutCatalogueInputSchema).array(),z.lazy(() => WebsiteUncheckedCreateWithoutCatalogueInputSchema),z.lazy(() => WebsiteUncheckedCreateWithoutCatalogueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WebsiteCreateOrConnectWithoutCatalogueInputSchema),z.lazy(() => WebsiteCreateOrConnectWithoutCatalogueInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WebsiteUpsertWithWhereUniqueWithoutCatalogueInputSchema),z.lazy(() => WebsiteUpsertWithWhereUniqueWithoutCatalogueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WebsiteCreateManyCatalogueInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WebsiteUpdateWithWhereUniqueWithoutCatalogueInputSchema),z.lazy(() => WebsiteUpdateWithWhereUniqueWithoutCatalogueInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WebsiteUpdateManyWithWhereWithoutCatalogueInputSchema),z.lazy(() => WebsiteUpdateManyWithWhereWithoutCatalogueInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WebsiteScalarWhereInputSchema),z.lazy(() => WebsiteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CatalogueCreateNestedOneWithoutWebsitesInputSchema: z.ZodType<Prisma.CatalogueCreateNestedOneWithoutWebsitesInput> = z.object({
  create: z.union([ z.lazy(() => CatalogueCreateWithoutWebsitesInputSchema),z.lazy(() => CatalogueUncheckedCreateWithoutWebsitesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CatalogueCreateOrConnectWithoutWebsitesInputSchema).optional(),
  connect: z.lazy(() => CatalogueWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutWebsitesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutWebsitesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWebsitesInputSchema),z.lazy(() => UserUncheckedCreateWithoutWebsitesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWebsitesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CatalogueUpdateOneRequiredWithoutWebsitesNestedInputSchema: z.ZodType<Prisma.CatalogueUpdateOneRequiredWithoutWebsitesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CatalogueCreateWithoutWebsitesInputSchema),z.lazy(() => CatalogueUncheckedCreateWithoutWebsitesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CatalogueCreateOrConnectWithoutWebsitesInputSchema).optional(),
  upsert: z.lazy(() => CatalogueUpsertWithoutWebsitesInputSchema).optional(),
  connect: z.lazy(() => CatalogueWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CatalogueUpdateToOneWithWhereWithoutWebsitesInputSchema),z.lazy(() => CatalogueUpdateWithoutWebsitesInputSchema),z.lazy(() => CatalogueUncheckedUpdateWithoutWebsitesInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutWebsitesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutWebsitesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWebsitesInputSchema),z.lazy(() => UserUncheckedCreateWithoutWebsitesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWebsitesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutWebsitesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutWebsitesInputSchema),z.lazy(() => UserUpdateWithoutWebsitesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWebsitesInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CatalogueCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CatalogueCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CatalogueCreateWithoutUserInputSchema),z.lazy(() => CatalogueCreateWithoutUserInputSchema).array(),z.lazy(() => CatalogueUncheckedCreateWithoutUserInputSchema),z.lazy(() => CatalogueUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CatalogueCreateOrConnectWithoutUserInputSchema),z.lazy(() => CatalogueCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CatalogueCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CatalogueWhereUniqueInputSchema),z.lazy(() => CatalogueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NewsRSSCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.NewsRSSCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => NewsRSSCreateWithoutUserInputSchema),z.lazy(() => NewsRSSCreateWithoutUserInputSchema).array(),z.lazy(() => NewsRSSUncheckedCreateWithoutUserInputSchema),z.lazy(() => NewsRSSUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsRSSCreateOrConnectWithoutUserInputSchema),z.lazy(() => NewsRSSCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NewsRSSCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NewsRSSWhereUniqueInputSchema),z.lazy(() => NewsRSSWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WebsiteCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WebsiteCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => WebsiteCreateWithoutUserInputSchema),z.lazy(() => WebsiteCreateWithoutUserInputSchema).array(),z.lazy(() => WebsiteUncheckedCreateWithoutUserInputSchema),z.lazy(() => WebsiteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WebsiteCreateOrConnectWithoutUserInputSchema),z.lazy(() => WebsiteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WebsiteCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WpRSSCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WpRSSCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => WpRSSCreateWithoutUserInputSchema),z.lazy(() => WpRSSCreateWithoutUserInputSchema).array(),z.lazy(() => WpRSSUncheckedCreateWithoutUserInputSchema),z.lazy(() => WpRSSUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WpRSSCreateOrConnectWithoutUserInputSchema),z.lazy(() => WpRSSCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WpRSSCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WpRSSWhereUniqueInputSchema),z.lazy(() => WpRSSWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const YtRSSCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.YtRSSCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => YtRSSCreateWithoutUserInputSchema),z.lazy(() => YtRSSCreateWithoutUserInputSchema).array(),z.lazy(() => YtRSSUncheckedCreateWithoutUserInputSchema),z.lazy(() => YtRSSUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => YtRSSCreateOrConnectWithoutUserInputSchema),z.lazy(() => YtRSSCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => YtRSSCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => YtRSSWhereUniqueInputSchema),z.lazy(() => YtRSSWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CatalogueUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CatalogueUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CatalogueCreateWithoutUserInputSchema),z.lazy(() => CatalogueCreateWithoutUserInputSchema).array(),z.lazy(() => CatalogueUncheckedCreateWithoutUserInputSchema),z.lazy(() => CatalogueUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CatalogueCreateOrConnectWithoutUserInputSchema),z.lazy(() => CatalogueCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CatalogueCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CatalogueWhereUniqueInputSchema),z.lazy(() => CatalogueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NewsRSSUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.NewsRSSUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => NewsRSSCreateWithoutUserInputSchema),z.lazy(() => NewsRSSCreateWithoutUserInputSchema).array(),z.lazy(() => NewsRSSUncheckedCreateWithoutUserInputSchema),z.lazy(() => NewsRSSUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsRSSCreateOrConnectWithoutUserInputSchema),z.lazy(() => NewsRSSCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NewsRSSCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NewsRSSWhereUniqueInputSchema),z.lazy(() => NewsRSSWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WebsiteUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WebsiteUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => WebsiteCreateWithoutUserInputSchema),z.lazy(() => WebsiteCreateWithoutUserInputSchema).array(),z.lazy(() => WebsiteUncheckedCreateWithoutUserInputSchema),z.lazy(() => WebsiteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WebsiteCreateOrConnectWithoutUserInputSchema),z.lazy(() => WebsiteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WebsiteCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WpRSSUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WpRSSUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => WpRSSCreateWithoutUserInputSchema),z.lazy(() => WpRSSCreateWithoutUserInputSchema).array(),z.lazy(() => WpRSSUncheckedCreateWithoutUserInputSchema),z.lazy(() => WpRSSUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WpRSSCreateOrConnectWithoutUserInputSchema),z.lazy(() => WpRSSCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WpRSSCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WpRSSWhereUniqueInputSchema),z.lazy(() => WpRSSWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const YtRSSUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.YtRSSUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => YtRSSCreateWithoutUserInputSchema),z.lazy(() => YtRSSCreateWithoutUserInputSchema).array(),z.lazy(() => YtRSSUncheckedCreateWithoutUserInputSchema),z.lazy(() => YtRSSUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => YtRSSCreateOrConnectWithoutUserInputSchema),z.lazy(() => YtRSSCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => YtRSSCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => YtRSSWhereUniqueInputSchema),z.lazy(() => YtRSSWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CatalogueUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CatalogueUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CatalogueCreateWithoutUserInputSchema),z.lazy(() => CatalogueCreateWithoutUserInputSchema).array(),z.lazy(() => CatalogueUncheckedCreateWithoutUserInputSchema),z.lazy(() => CatalogueUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CatalogueCreateOrConnectWithoutUserInputSchema),z.lazy(() => CatalogueCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CatalogueUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CatalogueUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CatalogueCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CatalogueWhereUniqueInputSchema),z.lazy(() => CatalogueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CatalogueWhereUniqueInputSchema),z.lazy(() => CatalogueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CatalogueWhereUniqueInputSchema),z.lazy(() => CatalogueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CatalogueWhereUniqueInputSchema),z.lazy(() => CatalogueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CatalogueUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CatalogueUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CatalogueUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CatalogueUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CatalogueScalarWhereInputSchema),z.lazy(() => CatalogueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NewsRSSUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.NewsRSSUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => NewsRSSCreateWithoutUserInputSchema),z.lazy(() => NewsRSSCreateWithoutUserInputSchema).array(),z.lazy(() => NewsRSSUncheckedCreateWithoutUserInputSchema),z.lazy(() => NewsRSSUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsRSSCreateOrConnectWithoutUserInputSchema),z.lazy(() => NewsRSSCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NewsRSSUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => NewsRSSUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NewsRSSCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NewsRSSWhereUniqueInputSchema),z.lazy(() => NewsRSSWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NewsRSSWhereUniqueInputSchema),z.lazy(() => NewsRSSWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NewsRSSWhereUniqueInputSchema),z.lazy(() => NewsRSSWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NewsRSSWhereUniqueInputSchema),z.lazy(() => NewsRSSWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NewsRSSUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => NewsRSSUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NewsRSSUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => NewsRSSUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NewsRSSScalarWhereInputSchema),z.lazy(() => NewsRSSScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WebsiteUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WebsiteUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => WebsiteCreateWithoutUserInputSchema),z.lazy(() => WebsiteCreateWithoutUserInputSchema).array(),z.lazy(() => WebsiteUncheckedCreateWithoutUserInputSchema),z.lazy(() => WebsiteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WebsiteCreateOrConnectWithoutUserInputSchema),z.lazy(() => WebsiteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WebsiteUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WebsiteUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WebsiteCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WebsiteUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WebsiteUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WebsiteUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => WebsiteUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WebsiteScalarWhereInputSchema),z.lazy(() => WebsiteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WpRSSUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WpRSSUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => WpRSSCreateWithoutUserInputSchema),z.lazy(() => WpRSSCreateWithoutUserInputSchema).array(),z.lazy(() => WpRSSUncheckedCreateWithoutUserInputSchema),z.lazy(() => WpRSSUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WpRSSCreateOrConnectWithoutUserInputSchema),z.lazy(() => WpRSSCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WpRSSUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WpRSSUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WpRSSCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WpRSSWhereUniqueInputSchema),z.lazy(() => WpRSSWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WpRSSWhereUniqueInputSchema),z.lazy(() => WpRSSWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WpRSSWhereUniqueInputSchema),z.lazy(() => WpRSSWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WpRSSWhereUniqueInputSchema),z.lazy(() => WpRSSWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WpRSSUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WpRSSUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WpRSSUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => WpRSSUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WpRSSScalarWhereInputSchema),z.lazy(() => WpRSSScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const YtRSSUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.YtRSSUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => YtRSSCreateWithoutUserInputSchema),z.lazy(() => YtRSSCreateWithoutUserInputSchema).array(),z.lazy(() => YtRSSUncheckedCreateWithoutUserInputSchema),z.lazy(() => YtRSSUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => YtRSSCreateOrConnectWithoutUserInputSchema),z.lazy(() => YtRSSCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => YtRSSUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => YtRSSUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => YtRSSCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => YtRSSWhereUniqueInputSchema),z.lazy(() => YtRSSWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => YtRSSWhereUniqueInputSchema),z.lazy(() => YtRSSWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => YtRSSWhereUniqueInputSchema),z.lazy(() => YtRSSWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => YtRSSWhereUniqueInputSchema),z.lazy(() => YtRSSWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => YtRSSUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => YtRSSUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => YtRSSUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => YtRSSUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => YtRSSScalarWhereInputSchema),z.lazy(() => YtRSSScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CatalogueUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CatalogueUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CatalogueCreateWithoutUserInputSchema),z.lazy(() => CatalogueCreateWithoutUserInputSchema).array(),z.lazy(() => CatalogueUncheckedCreateWithoutUserInputSchema),z.lazy(() => CatalogueUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CatalogueCreateOrConnectWithoutUserInputSchema),z.lazy(() => CatalogueCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CatalogueUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CatalogueUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CatalogueCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CatalogueWhereUniqueInputSchema),z.lazy(() => CatalogueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CatalogueWhereUniqueInputSchema),z.lazy(() => CatalogueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CatalogueWhereUniqueInputSchema),z.lazy(() => CatalogueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CatalogueWhereUniqueInputSchema),z.lazy(() => CatalogueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CatalogueUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CatalogueUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CatalogueUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CatalogueUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CatalogueScalarWhereInputSchema),z.lazy(() => CatalogueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NewsRSSUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.NewsRSSUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => NewsRSSCreateWithoutUserInputSchema),z.lazy(() => NewsRSSCreateWithoutUserInputSchema).array(),z.lazy(() => NewsRSSUncheckedCreateWithoutUserInputSchema),z.lazy(() => NewsRSSUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsRSSCreateOrConnectWithoutUserInputSchema),z.lazy(() => NewsRSSCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NewsRSSUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => NewsRSSUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NewsRSSCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NewsRSSWhereUniqueInputSchema),z.lazy(() => NewsRSSWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NewsRSSWhereUniqueInputSchema),z.lazy(() => NewsRSSWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NewsRSSWhereUniqueInputSchema),z.lazy(() => NewsRSSWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NewsRSSWhereUniqueInputSchema),z.lazy(() => NewsRSSWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NewsRSSUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => NewsRSSUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NewsRSSUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => NewsRSSUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NewsRSSScalarWhereInputSchema),z.lazy(() => NewsRSSScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WebsiteUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WebsiteUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => WebsiteCreateWithoutUserInputSchema),z.lazy(() => WebsiteCreateWithoutUserInputSchema).array(),z.lazy(() => WebsiteUncheckedCreateWithoutUserInputSchema),z.lazy(() => WebsiteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WebsiteCreateOrConnectWithoutUserInputSchema),z.lazy(() => WebsiteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WebsiteUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WebsiteUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WebsiteCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WebsiteWhereUniqueInputSchema),z.lazy(() => WebsiteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WebsiteUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WebsiteUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WebsiteUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => WebsiteUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WebsiteScalarWhereInputSchema),z.lazy(() => WebsiteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WpRSSUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WpRSSUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => WpRSSCreateWithoutUserInputSchema),z.lazy(() => WpRSSCreateWithoutUserInputSchema).array(),z.lazy(() => WpRSSUncheckedCreateWithoutUserInputSchema),z.lazy(() => WpRSSUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WpRSSCreateOrConnectWithoutUserInputSchema),z.lazy(() => WpRSSCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WpRSSUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WpRSSUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WpRSSCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WpRSSWhereUniqueInputSchema),z.lazy(() => WpRSSWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WpRSSWhereUniqueInputSchema),z.lazy(() => WpRSSWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WpRSSWhereUniqueInputSchema),z.lazy(() => WpRSSWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WpRSSWhereUniqueInputSchema),z.lazy(() => WpRSSWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WpRSSUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WpRSSUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WpRSSUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => WpRSSUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WpRSSScalarWhereInputSchema),z.lazy(() => WpRSSScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const YtRSSUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.YtRSSUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => YtRSSCreateWithoutUserInputSchema),z.lazy(() => YtRSSCreateWithoutUserInputSchema).array(),z.lazy(() => YtRSSUncheckedCreateWithoutUserInputSchema),z.lazy(() => YtRSSUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => YtRSSCreateOrConnectWithoutUserInputSchema),z.lazy(() => YtRSSCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => YtRSSUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => YtRSSUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => YtRSSCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => YtRSSWhereUniqueInputSchema),z.lazy(() => YtRSSWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => YtRSSWhereUniqueInputSchema),z.lazy(() => YtRSSWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => YtRSSWhereUniqueInputSchema),z.lazy(() => YtRSSWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => YtRSSWhereUniqueInputSchema),z.lazy(() => YtRSSWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => YtRSSUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => YtRSSUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => YtRSSUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => YtRSSUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => YtRSSScalarWhereInputSchema),z.lazy(() => YtRSSScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserCreateWithoutYtInputSchema: z.ZodType<Prisma.UserCreateWithoutYtInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueCreateNestedManyWithoutUserInputSchema).optional(),
  news: z.lazy(() => NewsRSSCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  websites: z.lazy(() => WebsiteCreateNestedManyWithoutUserInputSchema).optional(),
  wp: z.lazy(() => WpRSSCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutYtInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutYtInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  news: z.lazy(() => NewsRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  websites: z.lazy(() => WebsiteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  wp: z.lazy(() => WpRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutYtInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutYtInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutYtInputSchema),z.lazy(() => UserUncheckedCreateWithoutYtInputSchema) ]),
}).strict();

export const UserUpsertWithoutYtInputSchema: z.ZodType<Prisma.UserUpsertWithoutYtInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutYtInputSchema),z.lazy(() => UserUncheckedUpdateWithoutYtInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutYtInputSchema),z.lazy(() => UserUncheckedCreateWithoutYtInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutYtInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutYtInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutYtInputSchema),z.lazy(() => UserUncheckedUpdateWithoutYtInputSchema) ]),
}).strict();

export const UserUpdateWithoutYtInputSchema: z.ZodType<Prisma.UserUpdateWithoutYtInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUpdateManyWithoutUserNestedInputSchema).optional(),
  news: z.lazy(() => NewsRSSUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  websites: z.lazy(() => WebsiteUpdateManyWithoutUserNestedInputSchema).optional(),
  wp: z.lazy(() => WpRSSUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutYtInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutYtInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  news: z.lazy(() => NewsRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  websites: z.lazy(() => WebsiteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  wp: z.lazy(() => WpRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutNewsInputSchema: z.ZodType<Prisma.UserCreateWithoutNewsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  websites: z.lazy(() => WebsiteCreateNestedManyWithoutUserInputSchema).optional(),
  wp: z.lazy(() => WpRSSCreateNestedManyWithoutUserInputSchema).optional(),
  yt: z.lazy(() => YtRSSCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutNewsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutNewsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  websites: z.lazy(() => WebsiteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  wp: z.lazy(() => WpRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  yt: z.lazy(() => YtRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutNewsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutNewsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutNewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutNewsInputSchema) ]),
}).strict();

export const UserUpsertWithoutNewsInputSchema: z.ZodType<Prisma.UserUpsertWithoutNewsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutNewsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNewsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutNewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutNewsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutNewsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutNewsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutNewsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNewsInputSchema) ]),
}).strict();

export const UserUpdateWithoutNewsInputSchema: z.ZodType<Prisma.UserUpdateWithoutNewsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  websites: z.lazy(() => WebsiteUpdateManyWithoutUserNestedInputSchema).optional(),
  wp: z.lazy(() => WpRSSUpdateManyWithoutUserNestedInputSchema).optional(),
  yt: z.lazy(() => YtRSSUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutNewsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutNewsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  websites: z.lazy(() => WebsiteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  wp: z.lazy(() => WpRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  yt: z.lazy(() => YtRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutWpInputSchema: z.ZodType<Prisma.UserCreateWithoutWpInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueCreateNestedManyWithoutUserInputSchema).optional(),
  news: z.lazy(() => NewsRSSCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  websites: z.lazy(() => WebsiteCreateNestedManyWithoutUserInputSchema).optional(),
  yt: z.lazy(() => YtRSSCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutWpInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutWpInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  news: z.lazy(() => NewsRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  websites: z.lazy(() => WebsiteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  yt: z.lazy(() => YtRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutWpInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutWpInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutWpInputSchema),z.lazy(() => UserUncheckedCreateWithoutWpInputSchema) ]),
}).strict();

export const UserUpsertWithoutWpInputSchema: z.ZodType<Prisma.UserUpsertWithoutWpInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutWpInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWpInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutWpInputSchema),z.lazy(() => UserUncheckedCreateWithoutWpInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutWpInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWpInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutWpInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWpInputSchema) ]),
}).strict();

export const UserUpdateWithoutWpInputSchema: z.ZodType<Prisma.UserUpdateWithoutWpInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUpdateManyWithoutUserNestedInputSchema).optional(),
  news: z.lazy(() => NewsRSSUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  websites: z.lazy(() => WebsiteUpdateManyWithoutUserNestedInputSchema).optional(),
  yt: z.lazy(() => YtRSSUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutWpInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutWpInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  news: z.lazy(() => NewsRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  websites: z.lazy(() => WebsiteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  yt: z.lazy(() => YtRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutCataloguesInputSchema: z.ZodType<Prisma.UserCreateWithoutCataloguesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  news: z.lazy(() => NewsRSSCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  websites: z.lazy(() => WebsiteCreateNestedManyWithoutUserInputSchema).optional(),
  wp: z.lazy(() => WpRSSCreateNestedManyWithoutUserInputSchema).optional(),
  yt: z.lazy(() => YtRSSCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCataloguesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCataloguesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  news: z.lazy(() => NewsRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  websites: z.lazy(() => WebsiteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  wp: z.lazy(() => WpRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  yt: z.lazy(() => YtRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCataloguesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCataloguesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCataloguesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCataloguesInputSchema) ]),
}).strict();

export const WebsiteCreateWithoutCatalogueInputSchema: z.ZodType<Prisma.WebsiteCreateWithoutCatalogueInput> = z.object({
  name: z.string(),
  url: z.string(),
  favicon: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutWebsitesInputSchema)
}).strict();

export const WebsiteUncheckedCreateWithoutCatalogueInputSchema: z.ZodType<Prisma.WebsiteUncheckedCreateWithoutCatalogueInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  url: z.string(),
  favicon: z.string(),
  userId: z.string()
}).strict();

export const WebsiteCreateOrConnectWithoutCatalogueInputSchema: z.ZodType<Prisma.WebsiteCreateOrConnectWithoutCatalogueInput> = z.object({
  where: z.lazy(() => WebsiteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WebsiteCreateWithoutCatalogueInputSchema),z.lazy(() => WebsiteUncheckedCreateWithoutCatalogueInputSchema) ]),
}).strict();

export const WebsiteCreateManyCatalogueInputEnvelopeSchema: z.ZodType<Prisma.WebsiteCreateManyCatalogueInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WebsiteCreateManyCatalogueInputSchema),z.lazy(() => WebsiteCreateManyCatalogueInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutCataloguesInputSchema: z.ZodType<Prisma.UserUpsertWithoutCataloguesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCataloguesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCataloguesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCataloguesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCataloguesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCataloguesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCataloguesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCataloguesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCataloguesInputSchema) ]),
}).strict();

export const UserUpdateWithoutCataloguesInputSchema: z.ZodType<Prisma.UserUpdateWithoutCataloguesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  news: z.lazy(() => NewsRSSUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  websites: z.lazy(() => WebsiteUpdateManyWithoutUserNestedInputSchema).optional(),
  wp: z.lazy(() => WpRSSUpdateManyWithoutUserNestedInputSchema).optional(),
  yt: z.lazy(() => YtRSSUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCataloguesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCataloguesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  news: z.lazy(() => NewsRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  websites: z.lazy(() => WebsiteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  wp: z.lazy(() => WpRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  yt: z.lazy(() => YtRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const WebsiteUpsertWithWhereUniqueWithoutCatalogueInputSchema: z.ZodType<Prisma.WebsiteUpsertWithWhereUniqueWithoutCatalogueInput> = z.object({
  where: z.lazy(() => WebsiteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WebsiteUpdateWithoutCatalogueInputSchema),z.lazy(() => WebsiteUncheckedUpdateWithoutCatalogueInputSchema) ]),
  create: z.union([ z.lazy(() => WebsiteCreateWithoutCatalogueInputSchema),z.lazy(() => WebsiteUncheckedCreateWithoutCatalogueInputSchema) ]),
}).strict();

export const WebsiteUpdateWithWhereUniqueWithoutCatalogueInputSchema: z.ZodType<Prisma.WebsiteUpdateWithWhereUniqueWithoutCatalogueInput> = z.object({
  where: z.lazy(() => WebsiteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WebsiteUpdateWithoutCatalogueInputSchema),z.lazy(() => WebsiteUncheckedUpdateWithoutCatalogueInputSchema) ]),
}).strict();

export const WebsiteUpdateManyWithWhereWithoutCatalogueInputSchema: z.ZodType<Prisma.WebsiteUpdateManyWithWhereWithoutCatalogueInput> = z.object({
  where: z.lazy(() => WebsiteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WebsiteUpdateManyMutationInputSchema),z.lazy(() => WebsiteUncheckedUpdateManyWithoutCatalogueInputSchema) ]),
}).strict();

export const WebsiteScalarWhereInputSchema: z.ZodType<Prisma.WebsiteScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WebsiteScalarWhereInputSchema),z.lazy(() => WebsiteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WebsiteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WebsiteScalarWhereInputSchema),z.lazy(() => WebsiteScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  catalogueId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  favicon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const CatalogueCreateWithoutWebsitesInputSchema: z.ZodType<Prisma.CatalogueCreateWithoutWebsitesInput> = z.object({
  name: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutCataloguesInputSchema)
}).strict();

export const CatalogueUncheckedCreateWithoutWebsitesInputSchema: z.ZodType<Prisma.CatalogueUncheckedCreateWithoutWebsitesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  userId: z.string()
}).strict();

export const CatalogueCreateOrConnectWithoutWebsitesInputSchema: z.ZodType<Prisma.CatalogueCreateOrConnectWithoutWebsitesInput> = z.object({
  where: z.lazy(() => CatalogueWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CatalogueCreateWithoutWebsitesInputSchema),z.lazy(() => CatalogueUncheckedCreateWithoutWebsitesInputSchema) ]),
}).strict();

export const UserCreateWithoutWebsitesInputSchema: z.ZodType<Prisma.UserCreateWithoutWebsitesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueCreateNestedManyWithoutUserInputSchema).optional(),
  news: z.lazy(() => NewsRSSCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  wp: z.lazy(() => WpRSSCreateNestedManyWithoutUserInputSchema).optional(),
  yt: z.lazy(() => YtRSSCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutWebsitesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutWebsitesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  news: z.lazy(() => NewsRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  wp: z.lazy(() => WpRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  yt: z.lazy(() => YtRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutWebsitesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutWebsitesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutWebsitesInputSchema),z.lazy(() => UserUncheckedCreateWithoutWebsitesInputSchema) ]),
}).strict();

export const CatalogueUpsertWithoutWebsitesInputSchema: z.ZodType<Prisma.CatalogueUpsertWithoutWebsitesInput> = z.object({
  update: z.union([ z.lazy(() => CatalogueUpdateWithoutWebsitesInputSchema),z.lazy(() => CatalogueUncheckedUpdateWithoutWebsitesInputSchema) ]),
  create: z.union([ z.lazy(() => CatalogueCreateWithoutWebsitesInputSchema),z.lazy(() => CatalogueUncheckedCreateWithoutWebsitesInputSchema) ]),
  where: z.lazy(() => CatalogueWhereInputSchema).optional()
}).strict();

export const CatalogueUpdateToOneWithWhereWithoutWebsitesInputSchema: z.ZodType<Prisma.CatalogueUpdateToOneWithWhereWithoutWebsitesInput> = z.object({
  where: z.lazy(() => CatalogueWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CatalogueUpdateWithoutWebsitesInputSchema),z.lazy(() => CatalogueUncheckedUpdateWithoutWebsitesInputSchema) ]),
}).strict();

export const CatalogueUpdateWithoutWebsitesInputSchema: z.ZodType<Prisma.CatalogueUpdateWithoutWebsitesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCataloguesNestedInputSchema).optional()
}).strict();

export const CatalogueUncheckedUpdateWithoutWebsitesInputSchema: z.ZodType<Prisma.CatalogueUncheckedUpdateWithoutWebsitesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutWebsitesInputSchema: z.ZodType<Prisma.UserUpsertWithoutWebsitesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutWebsitesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWebsitesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutWebsitesInputSchema),z.lazy(() => UserUncheckedCreateWithoutWebsitesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutWebsitesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWebsitesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutWebsitesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWebsitesInputSchema) ]),
}).strict();

export const UserUpdateWithoutWebsitesInputSchema: z.ZodType<Prisma.UserUpdateWithoutWebsitesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUpdateManyWithoutUserNestedInputSchema).optional(),
  news: z.lazy(() => NewsRSSUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  wp: z.lazy(() => WpRSSUpdateManyWithoutUserNestedInputSchema).optional(),
  yt: z.lazy(() => YtRSSUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutWebsitesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutWebsitesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  news: z.lazy(() => NewsRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  wp: z.lazy(() => WpRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  yt: z.lazy(() => YtRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CatalogueCreateWithoutUserInputSchema: z.ZodType<Prisma.CatalogueCreateWithoutUserInput> = z.object({
  name: z.string(),
  websites: z.lazy(() => WebsiteCreateNestedManyWithoutCatalogueInputSchema).optional()
}).strict();

export const CatalogueUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CatalogueUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  websites: z.lazy(() => WebsiteUncheckedCreateNestedManyWithoutCatalogueInputSchema).optional()
}).strict();

export const CatalogueCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CatalogueCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CatalogueWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CatalogueCreateWithoutUserInputSchema),z.lazy(() => CatalogueUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CatalogueCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CatalogueCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CatalogueCreateManyUserInputSchema),z.lazy(() => CatalogueCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const NewsRSSCreateWithoutUserInputSchema: z.ZodType<Prisma.NewsRSSCreateWithoutUserInput> = z.object({
  url: z.string()
}).strict();

export const NewsRSSUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.NewsRSSUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  url: z.string()
}).strict();

export const NewsRSSCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.NewsRSSCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => NewsRSSWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NewsRSSCreateWithoutUserInputSchema),z.lazy(() => NewsRSSUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const NewsRSSCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.NewsRSSCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NewsRSSCreateManyUserInputSchema),z.lazy(() => NewsRSSCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const WebsiteCreateWithoutUserInputSchema: z.ZodType<Prisma.WebsiteCreateWithoutUserInput> = z.object({
  name: z.string(),
  url: z.string(),
  favicon: z.string(),
  catalogue: z.lazy(() => CatalogueCreateNestedOneWithoutWebsitesInputSchema)
}).strict();

export const WebsiteUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.WebsiteUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  catalogueId: z.number().int(),
  name: z.string(),
  url: z.string(),
  favicon: z.string()
}).strict();

export const WebsiteCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.WebsiteCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => WebsiteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WebsiteCreateWithoutUserInputSchema),z.lazy(() => WebsiteUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const WebsiteCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.WebsiteCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WebsiteCreateManyUserInputSchema),z.lazy(() => WebsiteCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const WpRSSCreateWithoutUserInputSchema: z.ZodType<Prisma.WpRSSCreateWithoutUserInput> = z.object({
  url: z.string(),
  image: z.number().int()
}).strict();

export const WpRSSUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.WpRSSUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  url: z.string(),
  image: z.number().int()
}).strict();

export const WpRSSCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.WpRSSCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => WpRSSWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WpRSSCreateWithoutUserInputSchema),z.lazy(() => WpRSSUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const WpRSSCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.WpRSSCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WpRSSCreateManyUserInputSchema),z.lazy(() => WpRSSCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const YtRSSCreateWithoutUserInputSchema: z.ZodType<Prisma.YtRSSCreateWithoutUserInput> = z.object({
  channelId: z.string()
}).strict();

export const YtRSSUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.YtRSSUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  channelId: z.string()
}).strict();

export const YtRSSCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.YtRSSCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => YtRSSWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => YtRSSCreateWithoutUserInputSchema),z.lazy(() => YtRSSUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const YtRSSCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.YtRSSCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => YtRSSCreateManyUserInputSchema),z.lazy(() => YtRSSCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CatalogueUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CatalogueUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CatalogueWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CatalogueUpdateWithoutUserInputSchema),z.lazy(() => CatalogueUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CatalogueCreateWithoutUserInputSchema),z.lazy(() => CatalogueUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CatalogueUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CatalogueUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CatalogueWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CatalogueUpdateWithoutUserInputSchema),z.lazy(() => CatalogueUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const CatalogueUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CatalogueUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CatalogueScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CatalogueUpdateManyMutationInputSchema),z.lazy(() => CatalogueUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const CatalogueScalarWhereInputSchema: z.ZodType<Prisma.CatalogueScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CatalogueScalarWhereInputSchema),z.lazy(() => CatalogueScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CatalogueScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CatalogueScalarWhereInputSchema),z.lazy(() => CatalogueScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const NewsRSSUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.NewsRSSUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => NewsRSSWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NewsRSSUpdateWithoutUserInputSchema),z.lazy(() => NewsRSSUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => NewsRSSCreateWithoutUserInputSchema),z.lazy(() => NewsRSSUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const NewsRSSUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.NewsRSSUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => NewsRSSWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NewsRSSUpdateWithoutUserInputSchema),z.lazy(() => NewsRSSUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const NewsRSSUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.NewsRSSUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => NewsRSSScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NewsRSSUpdateManyMutationInputSchema),z.lazy(() => NewsRSSUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const NewsRSSScalarWhereInputSchema: z.ZodType<Prisma.NewsRSSScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NewsRSSScalarWhereInputSchema),z.lazy(() => NewsRSSScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NewsRSSScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NewsRSSScalarWhereInputSchema),z.lazy(() => NewsRSSScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const WebsiteUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WebsiteUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => WebsiteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WebsiteUpdateWithoutUserInputSchema),z.lazy(() => WebsiteUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => WebsiteCreateWithoutUserInputSchema),z.lazy(() => WebsiteUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const WebsiteUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WebsiteUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => WebsiteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WebsiteUpdateWithoutUserInputSchema),z.lazy(() => WebsiteUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const WebsiteUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.WebsiteUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => WebsiteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WebsiteUpdateManyMutationInputSchema),z.lazy(() => WebsiteUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const WpRSSUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WpRSSUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => WpRSSWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WpRSSUpdateWithoutUserInputSchema),z.lazy(() => WpRSSUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => WpRSSCreateWithoutUserInputSchema),z.lazy(() => WpRSSUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const WpRSSUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WpRSSUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => WpRSSWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WpRSSUpdateWithoutUserInputSchema),z.lazy(() => WpRSSUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const WpRSSUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.WpRSSUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => WpRSSScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WpRSSUpdateManyMutationInputSchema),z.lazy(() => WpRSSUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const WpRSSScalarWhereInputSchema: z.ZodType<Prisma.WpRSSScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WpRSSScalarWhereInputSchema),z.lazy(() => WpRSSScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WpRSSScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WpRSSScalarWhereInputSchema),z.lazy(() => WpRSSScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const YtRSSUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.YtRSSUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => YtRSSWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => YtRSSUpdateWithoutUserInputSchema),z.lazy(() => YtRSSUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => YtRSSCreateWithoutUserInputSchema),z.lazy(() => YtRSSUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const YtRSSUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.YtRSSUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => YtRSSWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => YtRSSUpdateWithoutUserInputSchema),z.lazy(() => YtRSSUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const YtRSSUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.YtRSSUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => YtRSSScalarWhereInputSchema),
  data: z.union([ z.lazy(() => YtRSSUpdateManyMutationInputSchema),z.lazy(() => YtRSSUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const YtRSSScalarWhereInputSchema: z.ZodType<Prisma.YtRSSScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => YtRSSScalarWhereInputSchema),z.lazy(() => YtRSSScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => YtRSSScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => YtRSSScalarWhereInputSchema),z.lazy(() => YtRSSScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  catalogues: z.lazy(() => CatalogueCreateNestedManyWithoutUserInputSchema).optional(),
  news: z.lazy(() => NewsRSSCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  websites: z.lazy(() => WebsiteCreateNestedManyWithoutUserInputSchema).optional(),
  wp: z.lazy(() => WpRSSCreateNestedManyWithoutUserInputSchema).optional(),
  yt: z.lazy(() => YtRSSCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  catalogues: z.lazy(() => CatalogueUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  news: z.lazy(() => NewsRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  websites: z.lazy(() => WebsiteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  wp: z.lazy(() => WpRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  yt: z.lazy(() => YtRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  catalogues: z.lazy(() => CatalogueUpdateManyWithoutUserNestedInputSchema).optional(),
  news: z.lazy(() => NewsRSSUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  websites: z.lazy(() => WebsiteUpdateManyWithoutUserNestedInputSchema).optional(),
  wp: z.lazy(() => WpRSSUpdateManyWithoutUserNestedInputSchema).optional(),
  yt: z.lazy(() => YtRSSUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  catalogues: z.lazy(() => CatalogueUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  news: z.lazy(() => NewsRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  websites: z.lazy(() => WebsiteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  wp: z.lazy(() => WpRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  yt: z.lazy(() => YtRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueCreateNestedManyWithoutUserInputSchema).optional(),
  news: z.lazy(() => NewsRSSCreateNestedManyWithoutUserInputSchema).optional(),
  websites: z.lazy(() => WebsiteCreateNestedManyWithoutUserInputSchema).optional(),
  wp: z.lazy(() => WpRSSCreateNestedManyWithoutUserInputSchema).optional(),
  yt: z.lazy(() => YtRSSCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  news: z.lazy(() => NewsRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  websites: z.lazy(() => WebsiteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  wp: z.lazy(() => WpRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  yt: z.lazy(() => YtRSSUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUpdateManyWithoutUserNestedInputSchema).optional(),
  news: z.lazy(() => NewsRSSUpdateManyWithoutUserNestedInputSchema).optional(),
  websites: z.lazy(() => WebsiteUpdateManyWithoutUserNestedInputSchema).optional(),
  wp: z.lazy(() => WpRSSUpdateManyWithoutUserNestedInputSchema).optional(),
  yt: z.lazy(() => YtRSSUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferences: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  catalogues: z.lazy(() => CatalogueUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  news: z.lazy(() => NewsRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  websites: z.lazy(() => WebsiteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  wp: z.lazy(() => WpRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  yt: z.lazy(() => YtRSSUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const WebsiteCreateManyCatalogueInputSchema: z.ZodType<Prisma.WebsiteCreateManyCatalogueInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  url: z.string(),
  favicon: z.string(),
  userId: z.string()
}).strict();

export const WebsiteUpdateWithoutCatalogueInputSchema: z.ZodType<Prisma.WebsiteUpdateWithoutCatalogueInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  favicon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWebsitesNestedInputSchema).optional()
}).strict();

export const WebsiteUncheckedUpdateWithoutCatalogueInputSchema: z.ZodType<Prisma.WebsiteUncheckedUpdateWithoutCatalogueInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  favicon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WebsiteUncheckedUpdateManyWithoutCatalogueInputSchema: z.ZodType<Prisma.WebsiteUncheckedUpdateManyWithoutCatalogueInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  favicon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CatalogueCreateManyUserInputSchema: z.ZodType<Prisma.CatalogueCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const NewsRSSCreateManyUserInputSchema: z.ZodType<Prisma.NewsRSSCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  url: z.string()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const WebsiteCreateManyUserInputSchema: z.ZodType<Prisma.WebsiteCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  catalogueId: z.number().int(),
  name: z.string(),
  url: z.string(),
  favicon: z.string()
}).strict();

export const WpRSSCreateManyUserInputSchema: z.ZodType<Prisma.WpRSSCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  url: z.string(),
  image: z.number().int()
}).strict();

export const YtRSSCreateManyUserInputSchema: z.ZodType<Prisma.YtRSSCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  channelId: z.string()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CatalogueUpdateWithoutUserInputSchema: z.ZodType<Prisma.CatalogueUpdateWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  websites: z.lazy(() => WebsiteUpdateManyWithoutCatalogueNestedInputSchema).optional()
}).strict();

export const CatalogueUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CatalogueUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  websites: z.lazy(() => WebsiteUncheckedUpdateManyWithoutCatalogueNestedInputSchema).optional()
}).strict();

export const CatalogueUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.CatalogueUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NewsRSSUpdateWithoutUserInputSchema: z.ZodType<Prisma.NewsRSSUpdateWithoutUserInput> = z.object({
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NewsRSSUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.NewsRSSUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NewsRSSUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.NewsRSSUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WebsiteUpdateWithoutUserInputSchema: z.ZodType<Prisma.WebsiteUpdateWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  favicon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  catalogue: z.lazy(() => CatalogueUpdateOneRequiredWithoutWebsitesNestedInputSchema).optional()
}).strict();

export const WebsiteUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.WebsiteUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  catalogueId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  favicon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WebsiteUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.WebsiteUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  catalogueId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  favicon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WpRSSUpdateWithoutUserInputSchema: z.ZodType<Prisma.WpRSSUpdateWithoutUserInput> = z.object({
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WpRSSUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.WpRSSUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WpRSSUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.WpRSSUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const YtRSSUpdateWithoutUserInputSchema: z.ZodType<Prisma.YtRSSUpdateWithoutUserInput> = z.object({
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const YtRSSUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.YtRSSUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const YtRSSUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.YtRSSUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const YtRSSFindFirstArgsSchema: z.ZodType<Prisma.YtRSSFindFirstArgs> = z.object({
  select: YtRSSSelectSchema.optional(),
  include: YtRSSIncludeSchema.optional(),
  where: YtRSSWhereInputSchema.optional(),
  orderBy: z.union([ YtRSSOrderByWithRelationInputSchema.array(),YtRSSOrderByWithRelationInputSchema ]).optional(),
  cursor: YtRSSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ YtRSSScalarFieldEnumSchema,YtRSSScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const YtRSSFindFirstOrThrowArgsSchema: z.ZodType<Prisma.YtRSSFindFirstOrThrowArgs> = z.object({
  select: YtRSSSelectSchema.optional(),
  include: YtRSSIncludeSchema.optional(),
  where: YtRSSWhereInputSchema.optional(),
  orderBy: z.union([ YtRSSOrderByWithRelationInputSchema.array(),YtRSSOrderByWithRelationInputSchema ]).optional(),
  cursor: YtRSSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ YtRSSScalarFieldEnumSchema,YtRSSScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const YtRSSFindManyArgsSchema: z.ZodType<Prisma.YtRSSFindManyArgs> = z.object({
  select: YtRSSSelectSchema.optional(),
  include: YtRSSIncludeSchema.optional(),
  where: YtRSSWhereInputSchema.optional(),
  orderBy: z.union([ YtRSSOrderByWithRelationInputSchema.array(),YtRSSOrderByWithRelationInputSchema ]).optional(),
  cursor: YtRSSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ YtRSSScalarFieldEnumSchema,YtRSSScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const YtRSSAggregateArgsSchema: z.ZodType<Prisma.YtRSSAggregateArgs> = z.object({
  where: YtRSSWhereInputSchema.optional(),
  orderBy: z.union([ YtRSSOrderByWithRelationInputSchema.array(),YtRSSOrderByWithRelationInputSchema ]).optional(),
  cursor: YtRSSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const YtRSSGroupByArgsSchema: z.ZodType<Prisma.YtRSSGroupByArgs> = z.object({
  where: YtRSSWhereInputSchema.optional(),
  orderBy: z.union([ YtRSSOrderByWithAggregationInputSchema.array(),YtRSSOrderByWithAggregationInputSchema ]).optional(),
  by: YtRSSScalarFieldEnumSchema.array(),
  having: YtRSSScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const YtRSSFindUniqueArgsSchema: z.ZodType<Prisma.YtRSSFindUniqueArgs> = z.object({
  select: YtRSSSelectSchema.optional(),
  include: YtRSSIncludeSchema.optional(),
  where: YtRSSWhereUniqueInputSchema,
}).strict() ;

export const YtRSSFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.YtRSSFindUniqueOrThrowArgs> = z.object({
  select: YtRSSSelectSchema.optional(),
  include: YtRSSIncludeSchema.optional(),
  where: YtRSSWhereUniqueInputSchema,
}).strict() ;

export const NewsRSSFindFirstArgsSchema: z.ZodType<Prisma.NewsRSSFindFirstArgs> = z.object({
  select: NewsRSSSelectSchema.optional(),
  include: NewsRSSIncludeSchema.optional(),
  where: NewsRSSWhereInputSchema.optional(),
  orderBy: z.union([ NewsRSSOrderByWithRelationInputSchema.array(),NewsRSSOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsRSSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NewsRSSScalarFieldEnumSchema,NewsRSSScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NewsRSSFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NewsRSSFindFirstOrThrowArgs> = z.object({
  select: NewsRSSSelectSchema.optional(),
  include: NewsRSSIncludeSchema.optional(),
  where: NewsRSSWhereInputSchema.optional(),
  orderBy: z.union([ NewsRSSOrderByWithRelationInputSchema.array(),NewsRSSOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsRSSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NewsRSSScalarFieldEnumSchema,NewsRSSScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NewsRSSFindManyArgsSchema: z.ZodType<Prisma.NewsRSSFindManyArgs> = z.object({
  select: NewsRSSSelectSchema.optional(),
  include: NewsRSSIncludeSchema.optional(),
  where: NewsRSSWhereInputSchema.optional(),
  orderBy: z.union([ NewsRSSOrderByWithRelationInputSchema.array(),NewsRSSOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsRSSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NewsRSSScalarFieldEnumSchema,NewsRSSScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NewsRSSAggregateArgsSchema: z.ZodType<Prisma.NewsRSSAggregateArgs> = z.object({
  where: NewsRSSWhereInputSchema.optional(),
  orderBy: z.union([ NewsRSSOrderByWithRelationInputSchema.array(),NewsRSSOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsRSSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NewsRSSGroupByArgsSchema: z.ZodType<Prisma.NewsRSSGroupByArgs> = z.object({
  where: NewsRSSWhereInputSchema.optional(),
  orderBy: z.union([ NewsRSSOrderByWithAggregationInputSchema.array(),NewsRSSOrderByWithAggregationInputSchema ]).optional(),
  by: NewsRSSScalarFieldEnumSchema.array(),
  having: NewsRSSScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NewsRSSFindUniqueArgsSchema: z.ZodType<Prisma.NewsRSSFindUniqueArgs> = z.object({
  select: NewsRSSSelectSchema.optional(),
  include: NewsRSSIncludeSchema.optional(),
  where: NewsRSSWhereUniqueInputSchema,
}).strict() ;

export const NewsRSSFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NewsRSSFindUniqueOrThrowArgs> = z.object({
  select: NewsRSSSelectSchema.optional(),
  include: NewsRSSIncludeSchema.optional(),
  where: NewsRSSWhereUniqueInputSchema,
}).strict() ;

export const WpRSSFindFirstArgsSchema: z.ZodType<Prisma.WpRSSFindFirstArgs> = z.object({
  select: WpRSSSelectSchema.optional(),
  include: WpRSSIncludeSchema.optional(),
  where: WpRSSWhereInputSchema.optional(),
  orderBy: z.union([ WpRSSOrderByWithRelationInputSchema.array(),WpRSSOrderByWithRelationInputSchema ]).optional(),
  cursor: WpRSSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WpRSSScalarFieldEnumSchema,WpRSSScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WpRSSFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WpRSSFindFirstOrThrowArgs> = z.object({
  select: WpRSSSelectSchema.optional(),
  include: WpRSSIncludeSchema.optional(),
  where: WpRSSWhereInputSchema.optional(),
  orderBy: z.union([ WpRSSOrderByWithRelationInputSchema.array(),WpRSSOrderByWithRelationInputSchema ]).optional(),
  cursor: WpRSSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WpRSSScalarFieldEnumSchema,WpRSSScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WpRSSFindManyArgsSchema: z.ZodType<Prisma.WpRSSFindManyArgs> = z.object({
  select: WpRSSSelectSchema.optional(),
  include: WpRSSIncludeSchema.optional(),
  where: WpRSSWhereInputSchema.optional(),
  orderBy: z.union([ WpRSSOrderByWithRelationInputSchema.array(),WpRSSOrderByWithRelationInputSchema ]).optional(),
  cursor: WpRSSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WpRSSScalarFieldEnumSchema,WpRSSScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WpRSSAggregateArgsSchema: z.ZodType<Prisma.WpRSSAggregateArgs> = z.object({
  where: WpRSSWhereInputSchema.optional(),
  orderBy: z.union([ WpRSSOrderByWithRelationInputSchema.array(),WpRSSOrderByWithRelationInputSchema ]).optional(),
  cursor: WpRSSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WpRSSGroupByArgsSchema: z.ZodType<Prisma.WpRSSGroupByArgs> = z.object({
  where: WpRSSWhereInputSchema.optional(),
  orderBy: z.union([ WpRSSOrderByWithAggregationInputSchema.array(),WpRSSOrderByWithAggregationInputSchema ]).optional(),
  by: WpRSSScalarFieldEnumSchema.array(),
  having: WpRSSScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WpRSSFindUniqueArgsSchema: z.ZodType<Prisma.WpRSSFindUniqueArgs> = z.object({
  select: WpRSSSelectSchema.optional(),
  include: WpRSSIncludeSchema.optional(),
  where: WpRSSWhereUniqueInputSchema,
}).strict() ;

export const WpRSSFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WpRSSFindUniqueOrThrowArgs> = z.object({
  select: WpRSSSelectSchema.optional(),
  include: WpRSSIncludeSchema.optional(),
  where: WpRSSWhereUniqueInputSchema,
}).strict() ;

export const CatalogueFindFirstArgsSchema: z.ZodType<Prisma.CatalogueFindFirstArgs> = z.object({
  select: CatalogueSelectSchema.optional(),
  include: CatalogueIncludeSchema.optional(),
  where: CatalogueWhereInputSchema.optional(),
  orderBy: z.union([ CatalogueOrderByWithRelationInputSchema.array(),CatalogueOrderByWithRelationInputSchema ]).optional(),
  cursor: CatalogueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CatalogueScalarFieldEnumSchema,CatalogueScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CatalogueFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CatalogueFindFirstOrThrowArgs> = z.object({
  select: CatalogueSelectSchema.optional(),
  include: CatalogueIncludeSchema.optional(),
  where: CatalogueWhereInputSchema.optional(),
  orderBy: z.union([ CatalogueOrderByWithRelationInputSchema.array(),CatalogueOrderByWithRelationInputSchema ]).optional(),
  cursor: CatalogueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CatalogueScalarFieldEnumSchema,CatalogueScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CatalogueFindManyArgsSchema: z.ZodType<Prisma.CatalogueFindManyArgs> = z.object({
  select: CatalogueSelectSchema.optional(),
  include: CatalogueIncludeSchema.optional(),
  where: CatalogueWhereInputSchema.optional(),
  orderBy: z.union([ CatalogueOrderByWithRelationInputSchema.array(),CatalogueOrderByWithRelationInputSchema ]).optional(),
  cursor: CatalogueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CatalogueScalarFieldEnumSchema,CatalogueScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CatalogueAggregateArgsSchema: z.ZodType<Prisma.CatalogueAggregateArgs> = z.object({
  where: CatalogueWhereInputSchema.optional(),
  orderBy: z.union([ CatalogueOrderByWithRelationInputSchema.array(),CatalogueOrderByWithRelationInputSchema ]).optional(),
  cursor: CatalogueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CatalogueGroupByArgsSchema: z.ZodType<Prisma.CatalogueGroupByArgs> = z.object({
  where: CatalogueWhereInputSchema.optional(),
  orderBy: z.union([ CatalogueOrderByWithAggregationInputSchema.array(),CatalogueOrderByWithAggregationInputSchema ]).optional(),
  by: CatalogueScalarFieldEnumSchema.array(),
  having: CatalogueScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CatalogueFindUniqueArgsSchema: z.ZodType<Prisma.CatalogueFindUniqueArgs> = z.object({
  select: CatalogueSelectSchema.optional(),
  include: CatalogueIncludeSchema.optional(),
  where: CatalogueWhereUniqueInputSchema,
}).strict() ;

export const CatalogueFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CatalogueFindUniqueOrThrowArgs> = z.object({
  select: CatalogueSelectSchema.optional(),
  include: CatalogueIncludeSchema.optional(),
  where: CatalogueWhereUniqueInputSchema,
}).strict() ;

export const WebsiteFindFirstArgsSchema: z.ZodType<Prisma.WebsiteFindFirstArgs> = z.object({
  select: WebsiteSelectSchema.optional(),
  include: WebsiteIncludeSchema.optional(),
  where: WebsiteWhereInputSchema.optional(),
  orderBy: z.union([ WebsiteOrderByWithRelationInputSchema.array(),WebsiteOrderByWithRelationInputSchema ]).optional(),
  cursor: WebsiteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WebsiteScalarFieldEnumSchema,WebsiteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WebsiteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WebsiteFindFirstOrThrowArgs> = z.object({
  select: WebsiteSelectSchema.optional(),
  include: WebsiteIncludeSchema.optional(),
  where: WebsiteWhereInputSchema.optional(),
  orderBy: z.union([ WebsiteOrderByWithRelationInputSchema.array(),WebsiteOrderByWithRelationInputSchema ]).optional(),
  cursor: WebsiteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WebsiteScalarFieldEnumSchema,WebsiteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WebsiteFindManyArgsSchema: z.ZodType<Prisma.WebsiteFindManyArgs> = z.object({
  select: WebsiteSelectSchema.optional(),
  include: WebsiteIncludeSchema.optional(),
  where: WebsiteWhereInputSchema.optional(),
  orderBy: z.union([ WebsiteOrderByWithRelationInputSchema.array(),WebsiteOrderByWithRelationInputSchema ]).optional(),
  cursor: WebsiteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WebsiteScalarFieldEnumSchema,WebsiteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WebsiteAggregateArgsSchema: z.ZodType<Prisma.WebsiteAggregateArgs> = z.object({
  where: WebsiteWhereInputSchema.optional(),
  orderBy: z.union([ WebsiteOrderByWithRelationInputSchema.array(),WebsiteOrderByWithRelationInputSchema ]).optional(),
  cursor: WebsiteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WebsiteGroupByArgsSchema: z.ZodType<Prisma.WebsiteGroupByArgs> = z.object({
  where: WebsiteWhereInputSchema.optional(),
  orderBy: z.union([ WebsiteOrderByWithAggregationInputSchema.array(),WebsiteOrderByWithAggregationInputSchema ]).optional(),
  by: WebsiteScalarFieldEnumSchema.array(),
  having: WebsiteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WebsiteFindUniqueArgsSchema: z.ZodType<Prisma.WebsiteFindUniqueArgs> = z.object({
  select: WebsiteSelectSchema.optional(),
  include: WebsiteIncludeSchema.optional(),
  where: WebsiteWhereUniqueInputSchema,
}).strict() ;

export const WebsiteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WebsiteFindUniqueOrThrowArgs> = z.object({
  select: WebsiteSelectSchema.optional(),
  include: WebsiteIncludeSchema.optional(),
  where: WebsiteWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const YtRSSCreateArgsSchema: z.ZodType<Prisma.YtRSSCreateArgs> = z.object({
  select: YtRSSSelectSchema.optional(),
  include: YtRSSIncludeSchema.optional(),
  data: z.union([ YtRSSCreateInputSchema,YtRSSUncheckedCreateInputSchema ]),
}).strict() ;

export const YtRSSUpsertArgsSchema: z.ZodType<Prisma.YtRSSUpsertArgs> = z.object({
  select: YtRSSSelectSchema.optional(),
  include: YtRSSIncludeSchema.optional(),
  where: YtRSSWhereUniqueInputSchema,
  create: z.union([ YtRSSCreateInputSchema,YtRSSUncheckedCreateInputSchema ]),
  update: z.union([ YtRSSUpdateInputSchema,YtRSSUncheckedUpdateInputSchema ]),
}).strict() ;

export const YtRSSCreateManyArgsSchema: z.ZodType<Prisma.YtRSSCreateManyArgs> = z.object({
  data: z.union([ YtRSSCreateManyInputSchema,YtRSSCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const YtRSSCreateManyAndReturnArgsSchema: z.ZodType<Prisma.YtRSSCreateManyAndReturnArgs> = z.object({
  data: z.union([ YtRSSCreateManyInputSchema,YtRSSCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const YtRSSDeleteArgsSchema: z.ZodType<Prisma.YtRSSDeleteArgs> = z.object({
  select: YtRSSSelectSchema.optional(),
  include: YtRSSIncludeSchema.optional(),
  where: YtRSSWhereUniqueInputSchema,
}).strict() ;

export const YtRSSUpdateArgsSchema: z.ZodType<Prisma.YtRSSUpdateArgs> = z.object({
  select: YtRSSSelectSchema.optional(),
  include: YtRSSIncludeSchema.optional(),
  data: z.union([ YtRSSUpdateInputSchema,YtRSSUncheckedUpdateInputSchema ]),
  where: YtRSSWhereUniqueInputSchema,
}).strict() ;

export const YtRSSUpdateManyArgsSchema: z.ZodType<Prisma.YtRSSUpdateManyArgs> = z.object({
  data: z.union([ YtRSSUpdateManyMutationInputSchema,YtRSSUncheckedUpdateManyInputSchema ]),
  where: YtRSSWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const YtRSSUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.YtRSSUpdateManyAndReturnArgs> = z.object({
  data: z.union([ YtRSSUpdateManyMutationInputSchema,YtRSSUncheckedUpdateManyInputSchema ]),
  where: YtRSSWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const YtRSSDeleteManyArgsSchema: z.ZodType<Prisma.YtRSSDeleteManyArgs> = z.object({
  where: YtRSSWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NewsRSSCreateArgsSchema: z.ZodType<Prisma.NewsRSSCreateArgs> = z.object({
  select: NewsRSSSelectSchema.optional(),
  include: NewsRSSIncludeSchema.optional(),
  data: z.union([ NewsRSSCreateInputSchema,NewsRSSUncheckedCreateInputSchema ]),
}).strict() ;

export const NewsRSSUpsertArgsSchema: z.ZodType<Prisma.NewsRSSUpsertArgs> = z.object({
  select: NewsRSSSelectSchema.optional(),
  include: NewsRSSIncludeSchema.optional(),
  where: NewsRSSWhereUniqueInputSchema,
  create: z.union([ NewsRSSCreateInputSchema,NewsRSSUncheckedCreateInputSchema ]),
  update: z.union([ NewsRSSUpdateInputSchema,NewsRSSUncheckedUpdateInputSchema ]),
}).strict() ;

export const NewsRSSCreateManyArgsSchema: z.ZodType<Prisma.NewsRSSCreateManyArgs> = z.object({
  data: z.union([ NewsRSSCreateManyInputSchema,NewsRSSCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NewsRSSCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NewsRSSCreateManyAndReturnArgs> = z.object({
  data: z.union([ NewsRSSCreateManyInputSchema,NewsRSSCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NewsRSSDeleteArgsSchema: z.ZodType<Prisma.NewsRSSDeleteArgs> = z.object({
  select: NewsRSSSelectSchema.optional(),
  include: NewsRSSIncludeSchema.optional(),
  where: NewsRSSWhereUniqueInputSchema,
}).strict() ;

export const NewsRSSUpdateArgsSchema: z.ZodType<Prisma.NewsRSSUpdateArgs> = z.object({
  select: NewsRSSSelectSchema.optional(),
  include: NewsRSSIncludeSchema.optional(),
  data: z.union([ NewsRSSUpdateInputSchema,NewsRSSUncheckedUpdateInputSchema ]),
  where: NewsRSSWhereUniqueInputSchema,
}).strict() ;

export const NewsRSSUpdateManyArgsSchema: z.ZodType<Prisma.NewsRSSUpdateManyArgs> = z.object({
  data: z.union([ NewsRSSUpdateManyMutationInputSchema,NewsRSSUncheckedUpdateManyInputSchema ]),
  where: NewsRSSWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NewsRSSUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.NewsRSSUpdateManyAndReturnArgs> = z.object({
  data: z.union([ NewsRSSUpdateManyMutationInputSchema,NewsRSSUncheckedUpdateManyInputSchema ]),
  where: NewsRSSWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NewsRSSDeleteManyArgsSchema: z.ZodType<Prisma.NewsRSSDeleteManyArgs> = z.object({
  where: NewsRSSWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WpRSSCreateArgsSchema: z.ZodType<Prisma.WpRSSCreateArgs> = z.object({
  select: WpRSSSelectSchema.optional(),
  include: WpRSSIncludeSchema.optional(),
  data: z.union([ WpRSSCreateInputSchema,WpRSSUncheckedCreateInputSchema ]),
}).strict() ;

export const WpRSSUpsertArgsSchema: z.ZodType<Prisma.WpRSSUpsertArgs> = z.object({
  select: WpRSSSelectSchema.optional(),
  include: WpRSSIncludeSchema.optional(),
  where: WpRSSWhereUniqueInputSchema,
  create: z.union([ WpRSSCreateInputSchema,WpRSSUncheckedCreateInputSchema ]),
  update: z.union([ WpRSSUpdateInputSchema,WpRSSUncheckedUpdateInputSchema ]),
}).strict() ;

export const WpRSSCreateManyArgsSchema: z.ZodType<Prisma.WpRSSCreateManyArgs> = z.object({
  data: z.union([ WpRSSCreateManyInputSchema,WpRSSCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WpRSSCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WpRSSCreateManyAndReturnArgs> = z.object({
  data: z.union([ WpRSSCreateManyInputSchema,WpRSSCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WpRSSDeleteArgsSchema: z.ZodType<Prisma.WpRSSDeleteArgs> = z.object({
  select: WpRSSSelectSchema.optional(),
  include: WpRSSIncludeSchema.optional(),
  where: WpRSSWhereUniqueInputSchema,
}).strict() ;

export const WpRSSUpdateArgsSchema: z.ZodType<Prisma.WpRSSUpdateArgs> = z.object({
  select: WpRSSSelectSchema.optional(),
  include: WpRSSIncludeSchema.optional(),
  data: z.union([ WpRSSUpdateInputSchema,WpRSSUncheckedUpdateInputSchema ]),
  where: WpRSSWhereUniqueInputSchema,
}).strict() ;

export const WpRSSUpdateManyArgsSchema: z.ZodType<Prisma.WpRSSUpdateManyArgs> = z.object({
  data: z.union([ WpRSSUpdateManyMutationInputSchema,WpRSSUncheckedUpdateManyInputSchema ]),
  where: WpRSSWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WpRSSUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.WpRSSUpdateManyAndReturnArgs> = z.object({
  data: z.union([ WpRSSUpdateManyMutationInputSchema,WpRSSUncheckedUpdateManyInputSchema ]),
  where: WpRSSWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WpRSSDeleteManyArgsSchema: z.ZodType<Prisma.WpRSSDeleteManyArgs> = z.object({
  where: WpRSSWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CatalogueCreateArgsSchema: z.ZodType<Prisma.CatalogueCreateArgs> = z.object({
  select: CatalogueSelectSchema.optional(),
  include: CatalogueIncludeSchema.optional(),
  data: z.union([ CatalogueCreateInputSchema,CatalogueUncheckedCreateInputSchema ]),
}).strict() ;

export const CatalogueUpsertArgsSchema: z.ZodType<Prisma.CatalogueUpsertArgs> = z.object({
  select: CatalogueSelectSchema.optional(),
  include: CatalogueIncludeSchema.optional(),
  where: CatalogueWhereUniqueInputSchema,
  create: z.union([ CatalogueCreateInputSchema,CatalogueUncheckedCreateInputSchema ]),
  update: z.union([ CatalogueUpdateInputSchema,CatalogueUncheckedUpdateInputSchema ]),
}).strict() ;

export const CatalogueCreateManyArgsSchema: z.ZodType<Prisma.CatalogueCreateManyArgs> = z.object({
  data: z.union([ CatalogueCreateManyInputSchema,CatalogueCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CatalogueCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CatalogueCreateManyAndReturnArgs> = z.object({
  data: z.union([ CatalogueCreateManyInputSchema,CatalogueCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CatalogueDeleteArgsSchema: z.ZodType<Prisma.CatalogueDeleteArgs> = z.object({
  select: CatalogueSelectSchema.optional(),
  include: CatalogueIncludeSchema.optional(),
  where: CatalogueWhereUniqueInputSchema,
}).strict() ;

export const CatalogueUpdateArgsSchema: z.ZodType<Prisma.CatalogueUpdateArgs> = z.object({
  select: CatalogueSelectSchema.optional(),
  include: CatalogueIncludeSchema.optional(),
  data: z.union([ CatalogueUpdateInputSchema,CatalogueUncheckedUpdateInputSchema ]),
  where: CatalogueWhereUniqueInputSchema,
}).strict() ;

export const CatalogueUpdateManyArgsSchema: z.ZodType<Prisma.CatalogueUpdateManyArgs> = z.object({
  data: z.union([ CatalogueUpdateManyMutationInputSchema,CatalogueUncheckedUpdateManyInputSchema ]),
  where: CatalogueWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CatalogueUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CatalogueUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CatalogueUpdateManyMutationInputSchema,CatalogueUncheckedUpdateManyInputSchema ]),
  where: CatalogueWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CatalogueDeleteManyArgsSchema: z.ZodType<Prisma.CatalogueDeleteManyArgs> = z.object({
  where: CatalogueWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WebsiteCreateArgsSchema: z.ZodType<Prisma.WebsiteCreateArgs> = z.object({
  select: WebsiteSelectSchema.optional(),
  include: WebsiteIncludeSchema.optional(),
  data: z.union([ WebsiteCreateInputSchema,WebsiteUncheckedCreateInputSchema ]),
}).strict() ;

export const WebsiteUpsertArgsSchema: z.ZodType<Prisma.WebsiteUpsertArgs> = z.object({
  select: WebsiteSelectSchema.optional(),
  include: WebsiteIncludeSchema.optional(),
  where: WebsiteWhereUniqueInputSchema,
  create: z.union([ WebsiteCreateInputSchema,WebsiteUncheckedCreateInputSchema ]),
  update: z.union([ WebsiteUpdateInputSchema,WebsiteUncheckedUpdateInputSchema ]),
}).strict() ;

export const WebsiteCreateManyArgsSchema: z.ZodType<Prisma.WebsiteCreateManyArgs> = z.object({
  data: z.union([ WebsiteCreateManyInputSchema,WebsiteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WebsiteCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WebsiteCreateManyAndReturnArgs> = z.object({
  data: z.union([ WebsiteCreateManyInputSchema,WebsiteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WebsiteDeleteArgsSchema: z.ZodType<Prisma.WebsiteDeleteArgs> = z.object({
  select: WebsiteSelectSchema.optional(),
  include: WebsiteIncludeSchema.optional(),
  where: WebsiteWhereUniqueInputSchema,
}).strict() ;

export const WebsiteUpdateArgsSchema: z.ZodType<Prisma.WebsiteUpdateArgs> = z.object({
  select: WebsiteSelectSchema.optional(),
  include: WebsiteIncludeSchema.optional(),
  data: z.union([ WebsiteUpdateInputSchema,WebsiteUncheckedUpdateInputSchema ]),
  where: WebsiteWhereUniqueInputSchema,
}).strict() ;

export const WebsiteUpdateManyArgsSchema: z.ZodType<Prisma.WebsiteUpdateManyArgs> = z.object({
  data: z.union([ WebsiteUpdateManyMutationInputSchema,WebsiteUncheckedUpdateManyInputSchema ]),
  where: WebsiteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WebsiteUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.WebsiteUpdateManyAndReturnArgs> = z.object({
  data: z.union([ WebsiteUpdateManyMutationInputSchema,WebsiteUncheckedUpdateManyInputSchema ]),
  where: WebsiteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const WebsiteDeleteManyArgsSchema: z.ZodType<Prisma.WebsiteDeleteManyArgs> = z.object({
  where: WebsiteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationTokenUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;