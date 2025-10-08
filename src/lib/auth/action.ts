"use server";

import * as z from "zod";
import { auth } from "./index";

const name = z.string().trim().min(3,"Username must be atleast of 3 characters.").max(50,"Username cannot be more than 50 characters")
const email = z.string().trim()
const password = z.string().min(6,"Password must be atleast of 6 characters.").max(100,"Password cannot be more than 100 characters.")



const signUpSchema = z.object({
    name,
    email,
    password
})

const signInSchema = z.object({
    email,
    password
})



export const signUp = async(form:FormData)=>{

    const rawData = {
        name: form.get("name") as string,
        email: form.get("email") as string,
        password: form.get("password") as string,
    }

    console.log(rawData)

    const data = signUpSchema.parse(rawData)

    console.log(data);

    const res = await auth.api.signUpEmail({
        body:{
        name:data.name,
        email:data.email,
        password:data.password
     }
})
    return {ok:true, userId: res?.user.id}
    
}


export const signIn = async(form:FormData)=>{

    const rawData = {
        email: form.get("email") as string,
        password: form.get("password") as string,
    }
}