import { ToastType } from '@/types/toast.type'
import { createContext } from 'react'

export const ToastContext = createContext<ToastType>({
	isActive: false,
	message: '',
	showToast: () => {},
	toastHidde: () => {},
})
