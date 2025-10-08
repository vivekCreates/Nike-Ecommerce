'use client';

import React from 'react'
import AuthForm from '@/components/AuthForm'
import { signUp } from '@/lib/auth/action'

export default function page() {
  return (
    <AuthForm mode="sign-up" onSubmit={signUp}/>
    
  )
}
