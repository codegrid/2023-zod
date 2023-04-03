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

  // エラー発生箇所とエラーメッセージを一覧表示する例
  issues.forEach((issue) => {
    // 各issueのpathは配列になっているため、->で繋ぎ合わせて階層を表す文字列に変換
    // pathの文字数や深さの違いを吸収するため、padEndで20文字分のスペースを確保し、エラーメッセージが縦に揃って表示されるようにする
    console.log(issue.path.join(' -> ').padEnd(20, ' '), issue.message)
  })
}

/** 表示結果

0 -> src             Invalid url
0 -> src             Invalid input: must start with "http"
0 -> alt             String must contain at least 1 character(s)
0 -> width           Number must be greater than or equal to 100
0 -> height          Number must be less than or equal to 500
1 -> src             Invalid input: must start with "http"
1 -> src             Invalid input: must end with ".png"
1 -> alt             Required
1 -> width           Expected number, received string

*/
