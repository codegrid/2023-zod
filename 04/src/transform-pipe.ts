import { z } from 'zod'

const zPostCode = z
  .string()
  .trim()
  .transform((v) => v.replace('-', ''))
  .pipe(z.string().length(7))

const result = zPostCode.safeParse('123-4567')

if (result.success) {
  console.log(result.data)
}

/** Output Log

1234567

*/
