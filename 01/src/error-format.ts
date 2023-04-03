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
  // ZodError.format
  const formattedError = result.error.format()

  // 2スペースインデントで整形して表示
  console.log(JSON.stringify(formattedError, null, 2))
}

/** 表示結果

{
  "0": {
    "_errors": [],
    "src": {
      "_errors": [
        "Invalid url",
        "Invalid input: must start with \"http\""
      ]
    },
    "alt": {
      "_errors": [
        "String must contain at least 1 character(s)"
      ]
    },
    "width": {
      "_errors": [
        "Number must be greater than or equal to 100"
      ]
    },
    "height": {
      "_errors": [
        "Number must be less than or equal to 500"
      ]
    }
  },
  "1": {
    "_errors": [],
    "src": {
      "_errors": [
        "Invalid input: must start with \"http\"",
        "Invalid input: must end with \".png\""
      ]
    },
    "alt": {
      "_errors": [
        "Required"
      ]
    },
    "width": {
      "_errors": [
        "Expected number, received string"
      ]
    }
  },
  "_errors": []
}

*/
