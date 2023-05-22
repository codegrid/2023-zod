import { z } from 'zod'

const zNumberLike = z.coerce.number()

const results = [
  zNumberLike.safeParse(10), // => 10
  zNumberLike.safeParse('10'), // => 10
  zNumberLike.safeParse(false), // => 0
  zNumberLike.safeParse(new Date()), // => 1683596556324
  zNumberLike.safeParse('10年'), // => Error
]

results.forEach((result) => {
  if (result.success) {
    const { data } = result
    console.log(JSON.stringify(data))
  } else {
    const { issues } = result.error
    console.log(JSON.stringify(issues, null, 2))
  }
})

/** Output Log

10
10
0
1683597514302
[
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "nan",
    "path": [],
    "message": "Expected number, received nan"
  }
]

*/
