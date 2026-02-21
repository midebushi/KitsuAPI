import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
    theme: 'dark' | 'light',
    toggleTheme: () => void,
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: 'light',
            toggleTheme: () => {
                const { theme } = get();
                const newTheme = theme === 'light' ? 'dark' : 'light'

                const root = window.document.documentElement;
                if (newTheme === 'dark') {
                root.classList.add('dark');
                } else {
                root.classList.remove('dark');
                }

                set({ theme: newTheme });
            }
        }),
        {
            name: 'theme-storage',
            onRehydrateStorage: () => (state) => {
                if (state?.theme === 'dark') {
                document.documentElement.classList.add('dark');

                } else {
                document.documentElement.classList.remove('dark');
                }
            }
        }
    )
)
