import { z } from 'zod'

const zBooleanLike = z.coerce.boolean()

const results = [
  zBooleanLike.safeParse(10), // => true
  zBooleanLike.safeParse('10'), // => true
  zBooleanLike.safeParse(0), // => false
  zBooleanLike.safeParse('0'), // => true
  zBooleanLike.safeParse(false), // => false
  zBooleanLike.safeParse(new Date()), // => true
]

results.forEach((result) => {
  if (result.success) {
    const { data } = result
    console.log(JSON.stringify(data))
  }
})

/** Output Log

true
true
false
true
false
true

*/
