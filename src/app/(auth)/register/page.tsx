'use client'

import { FC, useState } from 'react'
import Button from '@/components/ui/Button'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const SignUpPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleSignUp() {
    if (!name || !email || !password) {
      toast.error('Please fill all fields.')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Something went wrong.')
        return
      }

      toast.success('Account created successfully!')
      router.push('/login')
    } catch (err) {
      toast.error('Failed to create account.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-4">
          <img src="/logo/logo_whitemode_realtimechat.png" alt="Logo" />
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-8 space-y-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Button
            type="button"
            onClick={handleSignUp}
            isLoading={isLoading}
            className="w-full mt-4"
          >
            {isLoading ? 'Creating...' : 'Sign Up'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
