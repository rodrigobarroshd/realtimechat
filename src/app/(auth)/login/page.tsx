'use client'

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginIndex from '@/components/ui/signin-signup/travel-connect-signin'
export const dynamic = 'force-dynamic';
const Page: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  // async function loginWithGoogle() {
  //   setIsLoading(true)
  //   try {
  //     await signIn('google')
  //   } catch (error) {
  //     toast.error('Something went wrong with your login.')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }
  // async function loginWithEmail(e: React.FormEvent) {
  //   e.preventDefault()
  //   setIsLoading(true)
  
  //   try {
  //     const res = await signIn('credentials', {
  //       email,
  //       password,
  //       redirect: false, // Mantemos false para você tratar o sucesso/erro com toast
  //     })
  
  //     if (res?.error) {
  //       toast.error('Invalid email or password')
  //     } else {
  //       toast.success('Logged in successfully!')
  //       router.refresh() // Atualiza o estado da página
  //       router.push('/dashboard')
  //     }
  //   } catch (error) {
  //     toast.error('Something went wrong')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <LoginIndex/>
    
    // <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
    //   <div className='w-full flex flex-col items-center max-w-md space-y-8'>
    //     <div className='flex flex-col items-center gap-8'>
    //       <img src='/logo/logo_whitemode_realtimechat.png' alt='Logo' />
    //       <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
    //         Sign in to your account
    //       </h2>
    //     </div>

      
    //     <form onSubmit={loginWithEmail} className='w-full space-y-4'>
    //       <input
    //         type='email'
    //         placeholder='Email'
    //         value={email}
            
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //         className='w-full p-2 border rounded'
    //       />
    //       <input
    //         type='password'
    //         placeholder='Password'
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //         className='w-full p-2 border rounded'
    //       />
    //       <Button type='submit' isLoading={isLoading} className='w-full'>
    //         Sign in
    //       </Button>
    //     </form>

    //     <div className='flex items-center gap-4 w-full'>
    //       <hr className='flex-1 border-gray-300' />
    //       <span className='text-gray-500'>OR</span>
    //       <hr className='flex-1 border-gray-300' />
    //     </div>

       
    //     <Button
    //       isLoading={isLoading}
    //       type='button'
    //       className='max-w-sm mx-auto w-full'
    //       onClick={loginWithGoogle}>
    //       <svg
    //         className='mr-2 h-4 w-4'
    //         aria-hidden='true'
    //         focusable='false'
    //         data-prefix='fab'
    //         data-icon='google'
    //         role='img'
    //         xmlns='http://www.w3.org/2000/svg'
    //         viewBox='0 0 24 24'>
    //         <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
    //         <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
    //         <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' />
    //         <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' />
    //       </svg>
    //       Google
    //     </Button>
    //   </div>
    // </div>
     
  )
}

export default Page
