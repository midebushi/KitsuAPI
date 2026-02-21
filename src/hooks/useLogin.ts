import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../store/authStore'

const KITSU_AUTH_URL = 'https://kitsu.io/api/oauth/token'

export const useLogin = () => {
  const setTokens = useAuthStore((state) => state.setTokens)

  return useMutation({
    mutationFn: async ({ email, password }: any) => {
      const body = new URLSearchParams() // Kitsu любит form-urlencoded, сука
      body.append('grant_type', 'password')
      body.append('username', email) // ДА, поле username, но пишем туда email!
      body.append('password', password)

      const res = await fetch(KITSU_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })

      if (!res.ok) throw new Error('Хуёвый логин или пароль!')
      return res.json()
    },
    onSuccess: (data) => {
      // Сохраняем токены в зустанд (и в локалсторадж автоматом)
      setTokens(data.access_token, data.refresh_token)
    },
  })
}
