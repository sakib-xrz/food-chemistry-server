import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  database_uri: process.env.DATABASE_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  FRONT_END_BASE_URL: process.env.FRONT_END_BASE_URL,
  SMT_USER: process.env.SMT_USER,
  SMT_PASSWORD: process.env.SMT_PASSWORD,
  SMT_HOST: process.env.SMT_HOST,
}
