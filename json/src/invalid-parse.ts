import { z } from 'zod'
import * as json from '../data/invalid-images.json' assert { type: 'json' }

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

if (result.success) {
  const data = result.data
  console.log(JSON.stringify(data, null, 2))
} else {
  const error = result.error

  console.log('error.format()'.padStart(100, '-'))
  const formattedError = error.format()
  console.log(JSON.stringify(formattedError, null, 2))

  console.log('error.flatten()'.padStart(100, '-'))
  const flatError = error.flatten()
  console.log(JSON.stringify(flatError, null, 2))

  console.log('error.issues'.padStart(100, '-'))
  const issues = error.issues
  console.log(JSON.stringify(issues, null, 2))

  console.log('error.issues.forEach...'.padStart(100, '-'))
  issues.forEach((issue) => {
    console.log(issue.path.join(' -> ').padEnd(20, ' '), issue.message)
  })
}
