import { create } from 'zustand'

type ToastType = 'success' | 'error' | 'info'

interface ToastState {
  isOpen: boolean,
  message: string,
  type: ToastType,
  show: (msg: string, type?: ToastType) => void,
  hide: () => void,
}

export const useToastStore = create<ToastState>()((set) => ({
  isOpen: false,
  message: '',
  type: 'info',
  show: (message, type = 'info') =>
    set({ isOpen: true, message, type }),
  hide: () => set({ isOpen: false, message: '' }),
}))
