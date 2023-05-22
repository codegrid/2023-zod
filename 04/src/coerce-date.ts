import { z } from 'zod'

const zDateLike = z.coerce.date()

const results = [
  zDateLike.safeParse('2023/05/09'), // => "2023-05-08T15:00:00.000Z"
  zDateLike.safeParse('2023-05-09'), // => "2023-05-09T00:00:00.000Z"
  zDateLike.safeParse(20230509), // => "1970-01-01T05:37:10.509Z"
  zDateLike.safeParse(new Date()), // => "2023-05-09T01:53:24.182Z"
]

results.forEach((result) => {
  if (result.success) {
    const { data } = result
    console.log(JSON.stringify(data))
  }
})

/** Output Log

"2023-05-08T15:00:00.000Z"
"2023-05-09T00:00:00.000Z"
"1970-01-01T05:37:10.509Z"
"2023-05-22T09:49:56.293Z"

*/
