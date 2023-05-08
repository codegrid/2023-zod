import { z } from 'zod'

/* Zod schema --------------------------------- */

const allowExts = ['png', 'jpg', 'jpeg']
const zSrc = z
  .string()
  .trim()
  .refine((str) => allowExts.some((ext) => str.endsWith(`.${ext}`)), {
    message: `${allowExts.join(', ')}のいずれかの拡張子である必要があります`,
  })

/* parse -------------------------------------- */

const result = zSrc.safeParse('hogehoge.svg')

if (!result.success) {
  const { issues } = result.error

  console.log(JSON.stringify(issues, null, 2))
}

/** Output Log

[
  {
    "code": "custom",
    "message": "png, jpg, jpegのいずれかの拡張子である必要があります",
    "path": []
  }
]

*/
