'use client'
import React from 'react'
import AuthForm from '@/components/AuthForm'
import { signIn } from '@/lib/auth/action'

export default function page() {
  return (
    <AuthForm mode="sign-in" onSubmit={signIn}/>
  )
}
