import { z } from 'zod'
import images from '../data/invalid-images.json' assert { type: 'json' }

/* Zod schema --------------------------------- */

const zSrc = z.string().trim().url().startsWith('http').endsWith('.png')
const zAlt = z.string().trim().min(1)
const zSize = z.number().min(100).max(500)

const zImage = z.object({
  src: zSrc,
  alt: zAlt,
  width: zSize,
  height: zSize,
})
const zImages = zImage.array()

/* parse -------------------------------------- */

const result = zImages.safeParse(images)

if (!result.success) {
  // ZodError.flatten
  const flatError = result.error.flatten()

  // 2スペースインデントで整形して表示
  console.log(JSON.stringify(flatError, null, 2))
}

/** 表示結果

{
  "formErrors": [],
  "fieldErrors": {
    "0": [
      "Invalid url",
      "Invalid input: must start with \"http\"",
      "String must contain at least 1 character(s)",
      "Number must be greater than or equal to 100",
      "Number must be less than or equal to 500"
    ],
    "1": [
      "Invalid input: must start with \"http\"",
      "Invalid input: must end with \".png\"",
      "Required",
      "Expected number, received string"
    ]
  }
}

*/
