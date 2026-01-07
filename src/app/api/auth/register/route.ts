import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    
    // 1. Verificar se já existe (usando a chave de email que criaremos)
    const existingId = await db.get(`user:email:${email}`)
    if (existingId) return NextResponse.json({ message: 'User exists' }, { status: 400 })

    const userId = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, 10)

    // 2. O OBJETO DEVE TER ESSES CAMPOS EXATOS
    const newUser = {
      id: userId,
      name,
      email,
      hashedPassword, // O CredentialsProvider vai ler isso
      emailVerified: null, // O Adapter gosta disso
    }

    // 3. Salva no Redis
    // A chave 'user:id' é o que o Adapter e o JWT usam
    await db.set(`user:${userId}`, JSON.stringify(newUser))
    // A chave 'user:email:email' é o nosso índice de busca rápida
    await db.set(`user:email:${email}`, userId)

    return NextResponse.json({ message: 'Created' }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}

