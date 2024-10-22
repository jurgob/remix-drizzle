import { z } from 'zod'

// The schema is an object
export const envSchema = z.object({
    DATABASE_URL: z.union([
        z.literal(":inmemory:"),
        z.string().min(1),
    ])
  })
  
export  const env = envSchema.parse(process.env)
  