import { z } from 'zod'

/* Zod schema --------------------------------- */

const zAlt = z.string().trim().min(1)

/* parse -------------------------------------- */

const result = zAlt.safeParse('   Rolf Caffey   ')

console.log(result)
