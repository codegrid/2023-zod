import { z } from 'zod'

/* Zod schema --------------------------------- */

/* 手順1: TS型で表現 -------------------------------- */

// nameを持つオブジェクトのZodスキーマ
const zFile = z.object({
  name: z.string(),
})

// nameを持つオブジェクトのTS型
type File = z.infer<typeof zFile>

// nameとchildrenを持つ再帰オブジェクトのTS型
type Directory = File & {
  children?: Directory[]
}

/* 手順2: Zodスキーマの型を取得 -------------------------- */

// Directory型のデータを検証するZodスキーマのTS型
type ZodDirectory = z.ZodType<Directory>

/* 手順3~4: Zodスキーマを定義し、型を指定 -------------------- */

// Directory型のデータを検証するZodスキーマ
// デフォルトではany型になってしまうため、ZodDirectory型を明示的に指定する
const zDirectory: ZodDirectory = zFile.extend({
  children: z
    .lazy(() => zDirectory)
    .array()
    .optional(),
})

/* parse -------------------------------------- */

const data = {
  name: 'src',
  children: [
    {
      name: 'pages',
      children: [
        { name: 'index.astro' },
        { name: 'blog', children: [{ name: '[slug].astro' }] },
      ],
    },
  ],
}

const result = zDirectory.safeParse(data)

if (result.success) {
  console.log(JSON.stringify(result.data, null, 2))
} else {
  console.log(JSON.stringify(result.error, null, 2))
}

/** Output Log

{
  "name": "src",
  "children": [
    {
      "name": "pages",
      "children": [
        {
          "name": "index.astro"
        },
        {
          "name": "blog",
          "children": [
            {
              "name": "[slug].astro"
            }
          ]
        }
      ]
    }
  ]
}

*/
