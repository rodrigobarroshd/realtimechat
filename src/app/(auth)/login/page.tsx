'use client'

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginIndex from '@/components/ui/signin-signup/travel-connect-signin'
export const dynamic = 'force-dynamic';

const Page: FC = () => {
  return (
    <LoginIndex/>
  
  )
}

export default Page
