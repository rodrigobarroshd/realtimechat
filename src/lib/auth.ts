import { NextAuthOptions } from 'next-auth'
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter'
import { db } from './db'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials' // 1. Importar o provider
import { fetchRedis } from '@/helpers/redis'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  if (!clientId || !clientSecret) throw new Error('Missing Google Credentials')
  return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
    // 2. Adicionar CredentialsProvider
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Dados de login necessários')
        }

        // Busca o usuário no Prisma (Neon/Postgres)
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          throw new Error('Usuário não encontrado ou senha não definida')
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error('Senha incorreta')
        }

        // Retorna o objeto user para ser guardado no JWT
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      // No momento do login, o objeto 'user' está disponível. 
      // Preenchemos o token IMEDIATAMENTE.
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.image,
        }
      }

      // Nas chamadas subsequentes, tentamos atualizar com o Redis
      try {
        const dbUserResult = (await fetchRedis('get', `user:${token.id}`)) as string | null
        if (!dbUserResult) return token

        const dbUser = JSON.parse(dbUserResult)
        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
        }
      } catch (error) {
        return token
      }
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      return session
    },

    // AJUSTE AQUI: O redirect precisa ser mais robusto
    async redirect({ url, baseUrl }) {
      // Se a URL de destino for o login ou a home, manda pro dashboard
      if (url.includes('/login') || url === baseUrl) return `${baseUrl}/dashboard`
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`
    },
  },
}
