import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { User as NextAuthUser, getServerSession, Session, NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' as const },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) return null

        const valid = await bcrypt.compare(credentials.password, user.password)

        if (!valid) return null

        console.log('login')

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) token.id = user.id
      return token
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) session.user.id = token.id as string
      return session
    },

    async redirect({ url, baseUrl }) {
      if (url === baseUrl) return `${baseUrl}/admin`
      return url
    },
  },
}

export const auth = () => getServerSession(authOptions)
