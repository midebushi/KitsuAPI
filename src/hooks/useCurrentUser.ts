import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../store/authStore'

export const useCurrentUser = () => {
  const { accessToken, isAuthenticated } = useAuthStore()

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const res = await fetch('https://kitsu.io/api/edge/users?filter[self]=true', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        },
      })
      if (!res.ok) throw new Error('Не смог получить юзера')
      const json = await res.json()
      return json.data[0] // Первый элемент массива — это мы
    },
    enabled: isAuthenticated, // Не делать запрос, если нет токена
    staleTime: Infinity, // Данные юзера редко меняются, кэшируем намертво
  })
}
