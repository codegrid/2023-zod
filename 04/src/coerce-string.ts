import { z } from 'zod'

const zStringLike = z.coerce.string()

const results = [
  zStringLike.safeParse(10), // => "10"
  zStringLike.safeParse('10'), // => "10"
  zStringLike.safeParse(false), // => "false"
  zStringLike.safeParse(new Date()), // => "Tue May 09 2023 10:47:55 GMT+0900 (日本標準時)"
]

results.forEach((result) => {
  if (result.success) {
    const { data } = result
    console.log(JSON.stringify(data))
  }
})

/** Output Log

"10"
"10"
"false"
"Mon May 22 2023 18:48:57 GMT+0900 (日本標準時)"

*/
