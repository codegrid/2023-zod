import { z } from 'zod'
import data from '../data/blog-invalid.json' assert { type: 'json' }

/* Zod schema --------------------------------- */

const zPublishedBlogMeta = z.object({
  draft: z.literal(false), // draftがfalse
  title: z.string().trim().min(1), // 空文字を許可しない
  description: z.string().trim().min(20).max(120),
  author: z.object({
    name: z.string().trim().min(1),
  }),
})

const zDraftBlogMeta = z.object({
  draft: z.literal(true), // draftがtrue
  title: z.string().trim(), // 空文字でも良い
})

const zBlogMeta = z.union([zDraftBlogMeta, zPublishedBlogMeta])

/* parse -------------------------------------- */

const result = zBlogMeta.safeParse(data)

if (!result.success) {
  const unionErrors = result.error.format()

  console.log(JSON.stringify(unionErrors, null, 2))
}

/** Output Log

{
  "_errors": [],
  "draft": {
    "_errors": [
      "Invalid literal value, expected true"
    ]
  },
  "description": {
    "_errors": [
      "Required"
    ]
  }
}

*/
