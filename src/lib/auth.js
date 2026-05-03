import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "better-auth/adapters/mongodb"

const client = new MongoClient(process.env.AUTH_DB_URL)
const db = client.db("SkillSphere")

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  
  emailAndPassword: { 
    enabled: true,
    requireEmailVerification: false 
  },
  
  // 🔐 Google OAuth Configuration
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
})