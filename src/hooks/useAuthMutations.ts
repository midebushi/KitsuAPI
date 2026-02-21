import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../store/authStore";
import { useToastStore } from "../store/toastStore";
import type { LoginFormValues, RegisterFormValues } from "../lib/validation";

export const useLoginMutation = () => {
    const navigate = useNavigate()
    const setTokens = useAuthStore((s) => s.setTokens)


    return useMutation({
        mutationFn: async (data: LoginFormValues) => {
            const params = new URLSearchParams()
            params.append('grant_type', 'password')
            params.append('username', data.email)
            params.append('password', data.password)

            const res = await fetch('https://kitsu.io/api/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/vnd.api+json',
                },
                body: params,
            })

            if (!res.ok) throw new Error('Wrong password or username.')
            return res.json()
        },
        onSuccess: (data) => {
            setTokens(data.access_token, data.refresh_token)
            navigate({ to: '/' })
        },
    })
}

export const useRegisterMutation = () => {
    const navigate = useNavigate()
    const showToast = useToastStore((s) => s.show)


    return useMutation({
        mutationFn: async (data: RegisterFormValues) => {
            const res = await fetch('https://kitsu.io/api/edge/users', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                },
                body: JSON.stringify({
                    data: {
                        type: 'users',
                        attributes: {
                            name: data.name,
                            email: data.email,
                            password: data.password,
                        }
                    }
                })
            })

            if (!res.ok) {
                const text = await res.text()

                let message = text
                try {
                    const json = JSON.parse(text)
                    message = json.message || json.errors?.[0]?.detail || text
                }
                catch {
                    // 
                }
                throw new Error(message || 'There was an error during registration.')
            }
            return res.json()
        },
        onSuccess: () => {
            showToast('Registration successful! Now log in.', 'success')
            navigate({ to: '/login' })
        }
    })
}