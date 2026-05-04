import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { nextCookies } from "better-auth/next-js"
export const dynamic = "force-dynamic"


const client = new MongoClient(process.env.AUTH_DB_URL,
  {
    tls: true,

  })
const db = client.db("SkillSphere")

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, {
    client
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false
  },

  //  Google OAuth Configuration
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [nextCookies()],
  advanced: {

    crossSubDomainCookies: {
      enabled: true,
      domain: "scintillating-salamander-01dbec.netlify.app",
    },
    trustedOrigins: [
      "http://localhost:3000",
      "http://localhost:3002",
      "https://scintillating-salamander-01dbec.netlify.app",
      process.env.NEXT_PUBLIC_BASE_URL,
    ].filter(Boolean),
  }
})