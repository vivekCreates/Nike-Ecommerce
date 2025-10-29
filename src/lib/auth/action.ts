"use server";

import * as z from "zod";
import { auth } from "./index";
import { headers } from "next/headers";

const name = z.string().trim().min(3, "Username must be atleast of 3 characters.").max(50, "Username cannot be more than 50 characters")
const email = z.string().trim()
const password = z.string().min(6, "Password must be atleast of 6 characters.").max(100, "Password cannot be more than 100 characters.")



const signUpSchema = z.object({
  name,
  email,
  password
})

const signInSchema = z.object({
  email,
  password
})



export const signUp = async (formData: FormData) => {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }
  console.log(name, email, password)

  
  try {
    
    const data = signUpSchema.parse(rawData)
    const res = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    })
    return { ok: true, userId: res?.user.id }
  } catch (error) {
    if(error instanceof z.ZodError){
      return { ok: false, errors: error.flatten().fieldErrors }
    }
  }

}


export const signIn = async (formData: FormData) => {

  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }
  try {
    const data = signInSchema.parse(rawData)

    const res = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password
      }
    })
    
    return { ok: true, userId: res?.user.id }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { ok: false, errors: error.flatten().fieldErrors }
    }
  }
}

export const getCurrentUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    return session?.user ?? null;
  } catch (e) {
    console.log(e);
    return null;
  }
}


export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers()
  })
}