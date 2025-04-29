import { ToastContext } from '@/context/toast.context'
import React from 'react'

export const ToastProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [isActive, setIsActive] = React.useState(false)
	const [message, setMessage] = React.useState('')

	const showToast = React.useCallback((msg = '') => {
		setMessage(msg)
		setIsActive(true)
		setTimeout(() => setIsActive(false), 3000)
	}, [])

	const toastHidde = React.useCallback(() => {
		setIsActive(false)
	}, [])

	return (
		<ToastContext.Provider value={{ isActive, message, showToast, toastHidde }}>
			{children}
		</ToastContext.Provider>
	)
}
