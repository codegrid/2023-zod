import { z } from 'zod'

/* Zod schema --------------------------------- */

const zFile = z.object({
  name: z.string(),
  created: z.date().transform((date) => date.toString()),
})

type FileInput = z.input<typeof zFile>
type FileOutput = z.output<typeof zFile>

type DirectoryInput = FileInput & {
  children?: DirectoryInput[]
}
type DirectoryOutput = FileOutput & {
  children?: DirectoryOutput[]
}

type ZodDirectory = z.ZodType<DirectoryOutput, z.ZodTypeDef, DirectoryInput>

const zDirectory: ZodDirectory = zFile.extend({
  children: z
    .lazy(() => zDirectory)
    .array()
    .optional(),
})

const result = zDirectory.safeParse({
  name: 'src',
  created: new Date('2023-03-08'),
  children: [
    {
      name: 'pages',
      created: new Date('2023-05-07'),
      children: [
        {
          name: 'index.astro',
          created: new Date('2023-05-07'),
        },
        {
          name: 'blog',
          created: new Date('2023-05-05'),
          children: [
            {
              name: '[slug].astro',
              created: new Date('2023-05-05'),
            },
          ],
        },
      ],
    },
  ],
})

if (result.success) {
  console.log(JSON.stringify(result.data, null, 2))
} else {
  console.log(JSON.stringify(result.error, null, 2))
}

/** Output Log

{
  "name": "src",
  "created": "Wed Mar 08 2023 09:00:00 GMT+0900 (日本標準時)",
  "children": [
    {
      "name": "pages",
      "created": "Sun May 07 2023 09:00:00 GMT+0900 (日本標準時)",
      "children": [
        {
          "name": "index.astro",
          "created": "Sun May 07 2023 09:00:00 GMT+0900 (日本標準時)"
        },
        {
          "name": "blog",
          "created": "Fri May 05 2023 09:00:00 GMT+0900 (日本標準時)",
          "children": [
            {
              "name": "[slug].astro",
              "created": "Fri May 05 2023 09:00:00 GMT+0900 (日本標準時)"
            }
          ]
        }
      ]
    }
  ]
}

*/
