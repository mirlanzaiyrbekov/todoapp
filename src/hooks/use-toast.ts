import { ToastContext } from '@/context/toast.context'
import { useContext } from 'react'

export const useToast = () => {
	const context = useContext(ToastContext)
	if (!context) {
		throw new Error('Toast context is not allowed')
	}
	return context
}
