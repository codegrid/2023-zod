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
  const { issues } = result.error

  console.log(JSON.stringify(issues, null, 2))
}

/** Output Log

[
  {
    "code": "invalid_union",
    "unionErrors": [
      {
        "issues": [
          {
            "received": false,
            "code": "invalid_literal",
            "expected": true,
            "path": [
              "draft"
            ],
            "message": "Invalid literal value, expected true"
          }
        ],
        "name": "ZodError"
      },
      {
        "issues": [
          {
            "code": "invalid_type",
            "expected": "string",
            "received": "undefined",
            "path": [
              "description"
            ],
            "message": "Required"
          }
        ],
        "name": "ZodError"
      }
    ],
    "path": [],
    "message": "Invalid input"
  }
]

*/
