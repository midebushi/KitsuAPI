import { z } from 'zod'

export const LoginSchema = z.object({
    email: z.string().email('Make sure you entered your email correctly.'),
    password: z.string().min(1, 'Please, enter your password.'),
})

export const RegisterSchema = z.object({
    name: z.string().min(2, 'Please, enter your name.'),
    email: z.string().email('Make sure you entered your email correctly.'),
    password: z.string().min(6, 'Your password must be longer than 6 characters.'),
    passwordConfirm: z.string()
}).refine(async (data) => {
    const res = await fetch(`https://kitsu.io/api/edge/users?filter[name]=${encodeURIComponent(data.name)}`)
    const users = await res.json()
    return users.data.length === 0
}, {
     message: "The nickname is already taken, come up with another one.",
    path: ['name'],
})

export type LoginFormValues = z.infer<typeof LoginSchema>
export type RegisterFormValues = z.infer<typeof RegisterSchema>