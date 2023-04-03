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
  // ZodError.issues
  const issues = result.error.issues

  // 2スペースインデントで整形して表示
  console.log(JSON.stringify(issues, null, 2))
}

/** 表示結果

[
  {
    "validation": "url",
    "code": "invalid_string",
    "message": "Invalid url",
    "path": [
      0,
      "src"
    ]
  },
  {
    "code": "invalid_string",
    "validation": {
      "startsWith": "http"
    },
    "message": "Invalid input: must start with \"http\"",
    "path": [
      0,
      "src"
    ]
  },
  {
    "code": "too_small",
    "minimum": 1,
    "type": "string",
    "inclusive": true,
    "exact": false,
    "message": "String must contain at least 1 character(s)",
    "path": [
      0,
      "alt"
    ]
  },
  {
    "code": "too_small",
    "minimum": 100,
    "type": "number",
    "inclusive": true,
    "exact": false,
    "message": "Number must be greater than or equal to 100",
    "path": [
      0,
      "width"
    ]
  },
  {
    "code": "too_big",
    "maximum": 500,
    "type": "number",
    "inclusive": true,
    "exact": false,
    "message": "Number must be less than or equal to 500",
    "path": [
      0,
      "height"
    ]
  },
  {
    "code": "invalid_string",
    "validation": {
      "startsWith": "http"
    },
    "message": "Invalid input: must start with \"http\"",
    "path": [
      1,
      "src"
    ]
  },
  {
    "code": "invalid_string",
    "validation": {
      "endsWith": ".png"
    },
    "message": "Invalid input: must end with \".png\"",
    "path": [
      1,
      "src"
    ]
  },
  {
    "code": "invalid_type",
    "expected": "string",
    "received": "undefined",
    "path": [
      1,
      "alt"
    ],
    "message": "Required"
  },
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "string",
    "path": [
      1,
      "width"
    ],
    "message": "Expected number, received string"
  }
]

*/
