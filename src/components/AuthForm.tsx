'use client';

import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth/auth-client';
import Spinner from './Spinner';


type SubmitResult =
  | { ok: true; userId?: string }
  | { ok: false; errors: string[] };

type Props = {
  mode: "sign-in" | "sign-up";
  onSubmit: (formData: FormData) => Promise<SubmitResult>;
};

export default function AuthForm({ mode, onSubmit }: Props) {

    const [errors,setErrors] = useState<Record<string,string[]>>({

    });
    const [loading,setLoading] = useState(false)
    const router = useRouter()
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        setErrors({})
        try {
            const form = new FormData(e.currentTarget)
            const res = await onSubmit(form)
            if (!res?.ok) {
                setErrors({errors:["User not found"]})
            } else {
                router.push("/")
            }
        } catch (error: any) {
            alert(error?.message)
        }finally{
            setLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: 'google',
            callbackURL: '/',
        });
    };

    const handleGithubSignIn = async () => {
        await authClient.signIn.social({
            provider: 'github',
            callbackURL: '/'
        })
    }

    return (
        <div className='w-full min-h-screen flex items-center justify-center p-0 text-dark-900'>
            <div className='w-full max-w-full sm:max-w-md md:max-w-lg px-6 py-10 sm:px-8 md:px-12 lg:px-16'>
                <div className='flex flex-col gap-8 md:gap-6 text-center'>
                    {
                        mode === "sign-in" ?
                            (
                                <span className='text-base md:text-sm'>Don&apos;t have an account? <Link href={"/sign-up"} className='underline font-medium hover:text-dark-700 transition-colors'>sign-up</Link></span>
                            ) :
                            (
                                <span className='text-base md:text-sm'>Already have an account? <Link href={"/sign-in"} className='underline font-medium hover:text-dark-700 transition-colors'>sign-in</Link></span>
                            )
                    }
                    <div className='flex flex-col gap-3 md:gap-2'>
                        <h1 className='text-4xl md:text-3xl lg:text-4xl font-semibold tracking-tight'>Join Nike Today</h1>
                        <p className='text-base md:text-sm text-dark-700'>Create your account to start your fitness journey</p>
                    </div>
                    <div className="w-full flex flex-col gap-4 md:gap-3">

                        <Button 
                            onClick={handleGoogleSignIn} 
                            variant={"outline"} 
                            className='h-14 md:h-12 lg:h-14 flex items-center justify-center gap-3 md:gap-2 text-base md:text-sm lg:text-base'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google flex-shrink-0 md:w-5 md:h-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" /></svg>
                            <span>Continue With Google</span>
                        </Button>


                        <Button 
                            onClick={handleGithubSignIn} 
                            variant={"outline"} 
                            className='h-14 md:h-12 lg:h-14 flex items-center justify-center gap-3 md:gap-2 text-base md:text-sm lg:text-base'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-brand-github flex-shrink-0 md:w-5 md:h-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" /></svg>
                            <span>Continue With Github</span>
                        </Button>

                    </div>
                    <div className='flex items-center justify-between gap-4 md:gap-3'>
                        <div className='h-[.5px] flex-1 bg-dark-500'></div>
                        <span className='text-sm md:text-xs text-dark-700 whitespace-nowrap'>{mode === "sign-in" ? "Or sign in with" : "Or sign up with"}</span>
                        <div className='h-[.5px] flex-1 bg-dark-500'></div>
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6 md:gap-4 lg:gap-5'>
                        {
                            mode === "sign-up" && (
                                <div className='flex flex-col gap-2.5 md:gap-2 text-left'>
                                    <Label htmlFor="username" className='text-base md:text-sm font-medium'>Username</Label>
                                    <Input 
                                        id="username" 
                                        placeholder='Enter the Username' 
                                        name='name' 
                                        className='h-14 md:h-12 lg:h-14 rounded-md text-base md:text-sm' 
                                        required
                                    />
                                <p className='text-red-500'>{errors?.name && errors.name[0]}</p>
                                </div>
                            )
                        }

                        <div className='flex flex-col gap-2.5 md:gap-2 text-left'>
                            <Label htmlFor="email" className='text-base md:text-sm font-medium'>Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder='Enter the Email' 
                                name='email' 
                                className='h-14 md:h-12 lg:h-14 rounded-md text-base md:text-sm' 
                                required
                            />
                              <p className='text-red-500'>{errors?.email && errors.email[0]}</p>
                        </div>
                        <div className='flex flex-col gap-2.5 md:gap-2 text-left'>
                            <Label htmlFor="password" className='text-base md:text-sm font-medium'>Password</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                placeholder='Enter the Password' 
                                name='password' 
                                className='h-14 md:h-12 lg:h-14 rounded-md text-base md:text-sm' 
                                required
                            />
                              <p className='text-red-500'>{errors?.password && errors.password[0]}</p>
                        </div>
                        <Button 
                            type='submit' 
                            className='w-full h-14 md:h-12 lg:h-14 rounded-full text-base md:text-sm font-medium mt-2'
                        >
                            {loading ? <Spinner/> : mode === "sign-in" ? "Sign In" : "Sign Up"}
                        </Button>
                    </form>
                    <p className='text-sm md:text-xs text-dark-700 leading-relaxed'>
                        By signing up, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    )
}