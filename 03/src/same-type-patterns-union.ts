import { z } from 'zod'

/* Zod schema --------------------------------- */

const zSrc = z.union([
  z.string().trim().endsWith('.png'), // PNG
  z.string().trim().endsWith('.jpg'), // JPEG
  z.string().trim().endsWith('.jpeg'), // JPEG
])

/* parse -------------------------------------- */

const result = zSrc.safeParse('hogehoge.svg')

if (!result.success) {
  const { issues } = result.error

  console.log(JSON.stringify(issues, null, 2))
}

/** Output Log

[
  {
    "code": "invalid_string",
    "validation": {
      "endsWith": ".png"
    },
    "message": "Invalid input: must end with \".png\"",
    "path": []
  }
]

*/
