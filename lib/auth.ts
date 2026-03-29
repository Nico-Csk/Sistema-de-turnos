import { NextAuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const adminEmail = process.env.ADMIN_EMAIL || "admin@tupeluqueria.com"
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123"

        if (credentials.email !== adminEmail) return null

        // Support both bcrypt hashed and plain text passwords
        const isValid = adminPassword.startsWith('$2')
          ? await compare(credentials.password, adminPassword)
          : credentials.password === adminPassword

        if (isValid) {
          return { id: "1", name: "Admin", email: adminEmail }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string
      }
      return session
    }
  }
}

export const getAuthSession = () => getServerSession(authOptions)
