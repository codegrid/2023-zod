import { z } from 'zod'

const zTwitterId = z
  .string()
  .trim()
  .transform((v) => v.replace(/^@/, ''))

const result1 = zTwitterId.safeParse('@tetracalibers')
const result2 = zTwitterId.safeParse('tetracalibers')

result1.success && console.log(result1.data)
result2.success && console.log(result2.data)

/** Output Log

tetracalibers
tetracalibers

*/
