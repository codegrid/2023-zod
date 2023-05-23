import { z } from 'zod'

// Zodスキーマによる検証を行い、その検証結果を管理するクラス
class Validator<T extends z.ZodTypeAny> {
  zSchema: T
  data: z.output<T> | null = null
  errors: Set<string> = new Set<string>()
  invalid: boolean = false

  constructor(schema: T) {
    this.zSchema = schema
  }

  validate(value: unknown) {
    // 検証前にリセット
    this.errors.clear()
    this.data = null

    // 検証実行
    const result = this.zSchema.safeParse(value)

    if (result.success) {
      // 検証成功時はデータを格納
      this.data = result.data
    } else {
      // 検証失敗時はエラーを格納
      result.error.format()._errors.forEach((message: string) => {
        this.errors.add(message)
      })
    }

    // エラーの有無によってinvalidフラグを切り替え
    this.invalid = this.errors.size > 0
  }
}

/* Date utility ------------------------------- */

// 今日の日付を取得する関数
const today = () => {
  const now = new Date()
  now.setDate(now.getDate() - 1)
  return now
}

// Dateオブジェクトを '0000/00/00' 形式の文字列に変換する関数
const toYYYYMMDD = (date: Date, separator = '/') => {
  const yyyy = date.getFullYear()
  const mm = (date.getMonth() + 1).toString().padStart(2, '0')
  const dd = date.getDate().toString().padStart(2, '0')
  return [yyyy, mm, dd].join(separator)
}

/* Zod schema --------------------------------- */

// 入社日検証スキーマ
export const zJoined = z.coerce
  .date({ errorMap: () => ({ message: '入社日を入力してください' }) })
  .min(new Date('2009-10-01'), { message: '会社設立前の日付は指定できません' })
  .max(today(), { message: '未来の日付は指定できません' })
  .transform((date) => toYYYYMMDD(date))

/* validate ----------------------------------- */

const joined = new Validator(zJoined)

joined.validate('')
console.log(joined.data, joined.invalid, joined.errors)

joined.validate('2022-11-01')
console.log(joined.data, joined.invalid, joined.errors)

joined.validate('2002-09-12')
console.log(joined.data, joined.invalid, joined.errors)

joined.validate('2122-11-01')
console.log(joined.data, joined.invalid, joined.errors)

/** Output Log

null true Set(1) { '入社日を入力してください' }
2022/11/01 false Set(0) {}
null true Set(1) { '会社設立前の日付は指定できません' }
null true Set(1) { '未来の日付は指定できません' }

*/
