import { z } from 'zod'

/* Zod schema --------------------------------- */

const zContent = z
  .string()
  .refine(
    (text) => text.length >= 60,
    (text) => ({
      message: `${60 - text.length}文字足りません。`,
    })
  )
  .refine(
    (text) => text.length <= 200,
    (text) => ({
      message: `${text.length - 200}文字超過しています。`,
    })
  )

/* parse -------------------------------------- */

const shortResult = zContent.safeParse('短すぎるテキスト')
const longResult = zContent.safeParse('長すぎるテキスト'.repeat(40))

if (!shortResult.success) {
  console.log(shortResult.error.format())
}

if (!longResult.success) {
  console.log(longResult.error.format())
}

/** 実行結果

{ _errors: [ '52文字足りません。' ] }
{ _errors: [ '120文字超過しています。' ] }

*/
