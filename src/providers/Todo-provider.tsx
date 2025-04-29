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
	}, [])

	const toastHidde = React.useCallback(() => {
		setIsActive(false)
	}, [])

	React.useEffect(() => {
		let timeOutId: any
		if (isActive) {
			timeOutId = setTimeout(() => setIsActive(false), 1200)
		}
		return () => clearTimeout(timeOutId)
	}, [isActive])

	return (
		<ToastContext.Provider value={{ isActive, message, showToast, toastHidde }}>
			{children}
		</ToastContext.Provider>
	)
}
