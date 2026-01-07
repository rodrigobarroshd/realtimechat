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
        if (!credentials?.email || !credentials?.password) return null
    
      
        const userId = await fetchRedis("get", `user:email:${credentials.email}`)
        if (!userId) return null

     
        const userResult = await fetchRedis("get", `user:${userId}`)
        if (!userResult) return null
        
        if (!userResult) return null
    
        const user = JSON.parse(userResult)
    
      
        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword)
    
        if (!isValid) return null
    
        
        return {
          id: user.id,
          name: user.name,
          email: user.email,
         
        }
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      // 1. No momento do login/registro (quando o parâmetro 'user' existe)
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.image,
        }
      }
  
      // 2. Em requisições subsequentes, buscamos os dados atualizados
      try {
        const dbUserResult = await fetchRedis('get', `user:${token.id}`) as string | null
        if (!dbUserResult) return token
  
        const dbUser = JSON.parse(dbUserResult)
  
        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
        }
      } catch {
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
