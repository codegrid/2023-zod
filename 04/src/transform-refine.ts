import { z } from 'zod'

const zPostCode = z
  .string()
  .trim()
  .transform((v) => v.replace('-', ''))
  .refine((v) => /^\d{7}$/.test(v))

const result = zPostCode.safeParse('123-4567')

if (result.success) {
  console.log(result.data)
}

/** Output Log

1234567

*/
