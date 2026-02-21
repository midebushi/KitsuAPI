import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  setTokens: (access: string, refresh: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: true,
        setTokens: (access, refresh) => 
          set({ accessToken: access, refreshToken: refresh, isAuthenticated: true }),
        logout: () => 
          set({ accessToken: null, refreshToken: null, isAuthenticated: false }),
      }),
      {
        name: 'kitsu-auth-storage', // имя ключа в localStorage
        storage: createJSONStorage(() => localStorage), // явно указываем, что храним в localStorage
      }
    )
  )
)
