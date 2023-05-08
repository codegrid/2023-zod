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

// draftの値によって切り替え
const zBlogMeta = z.discriminatedUnion('draft', [
  zDraftBlogMeta,
  zPublishedBlogMeta,
])

/* parse -------------------------------------- */

const result = zBlogMeta.safeParse(data)

if (!result.success) {
  const { issues } = result.error

  console.log(JSON.stringify(issues, null, 2))
}

/** Output Log

[
  {
    "code": "invalid_type",
    "expected": "string",
    "received": "undefined",
    "path": [
      "description"
    ],
    "message": "Required"
  }
]

*/
