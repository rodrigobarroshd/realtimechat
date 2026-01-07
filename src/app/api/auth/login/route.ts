export const runtime = 'nodejs'
import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Redis } from '@upstash/redis'


// export async function POST() {
//   return NextResponse.json({ ok: true })
// }

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json()
//     const JWT_SECRET = process.env.JWT_SECRET!

//     if (!JWT_SECRET) {
//       throw new Error('JWT_SECRET not defined')
//     }
//     if (!email || !password) {
//       return NextResponse.json(
//         { message: 'Missing fields' },
//         { status: 400 }
//       )
//     }

//     const user = await user.findUnique({
//       where: { email },
//     })

//     if (!user || !user.password) {
//       return NextResponse.json(
//         { message: 'Invalid credentials' },
//         { status: 401 }
//       )
//     }

//     const isValid = await bcrypt.compare(password, user.password)

//     if (!isValid) {
//       return NextResponse.json(
//         { message: 'Invalid credentials' },
//         { status: 401 }
//       )
//     }

//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: '7d' }
//     )

//     return NextResponse.json({
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//       },
//     })
//   } catch (error) {
//     console.error('[LOGIN_ERROR]', error)
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }
export async function POST(req: Request) {
  try {
    const {
      UPSTASH_REDIS_REST_URL,
      UPSTASH_REDIS_REST_TOKEN,
      JWT_SECRET,
    } = process.env

    if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN || !JWT_SECRET) {
      return NextResponse.json(
        { message: 'Server misconfiguration' },
        { status: 500 }
      )
    }

    const redis = new Redis({
      url: UPSTASH_REDIS_REST_URL,
      token: UPSTASH_REDIS_REST_TOKEN,
    })

    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Missing fields' },
        { status: 400 }
      )
    }

    const userKey = `user:email:${email}`
    const user = await redis.get<{
      id: string
      name: string
      email: string
      password: string
    }>(userKey)

    if (!user || !user.password) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('[LOGIN_ERROR]', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}