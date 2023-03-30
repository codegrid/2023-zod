import { z } from 'zod'
import * as json from '../data/images.json' assert { type: 'json' }

/* Zod schema --------------------------------- */

const zSrc = z.string().trim().url().startsWith('http').endsWith('.png')
const zAlt = z.string().trim().min(1)
const zSize = z.number().min(100).max(500)

const zImage = z.object({
  src: zSrc,
  alt: zAlt,
  width: zSize,
  height: zSize,
})
const zImages = zImage.array()

/* TypeScript type ---------------------------- */

type Images = z.infer<typeof zImages>

/* data --------------------------------------- */

const images: Images = JSON.parse(JSON.stringify(json)).default

/* parse -------------------------------------- */

const result = zImages.safeParse(images)

console.log(result)
