import { z } from 'zod'
import image from '../data/images.json' assert { type: 'json' }

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

const zHorizontalImage = zImage.refine((data) => data.width > data.height, {
  message: '横長の画像を指定してください',
  path: ['height'],
})

/* parse -------------------------------------- */

const result = zHorizontalImage.array().safeParse(image)

if (!result.success) {
  const issues = result.error.issues
  // 2スペースインデントで整形して表示
  console.log(JSON.stringify(issues, null, 2))
}

/** 実行結果（pathの0は、images.json配列の最初の要素に問題があることを示す）

[
  {
    "code": "custom",
    "message": "横長の画像を指定してください",
    "path": [
      0,
      "height"
    ]
  }
]

*/
