import { z } from 'zod'

/* Zod schema --------------------------------- */

const zNumberOrBool = z.union([z.number(), z.boolean()], {
  errorMap: (issue, ctx) => {
    // ZodUnionから発生したエラーなら
    if (issue.code === z.ZodIssueCode.invalid_union) {
      // デフォルトを書き換える
      return { message: 'should be number or boolean' }
    }
    // それ以外のエラーなら、メッセージはそのまま
    return { message: ctx.defaultError }
  },
})

/* parse -------------------------------------- */

const result = zNumberOrBool.safeParse('hogehoge')

if (!result.success) {
  const error = result.error.flatten()

  console.log(JSON.stringify(error, null, 2))
}

/** Output Log

{
  "formErrors": [
    "should be number or boolean"
  ],
  "fieldErrors": {}
}

*/
