export type ToastType = {
	isActive: boolean
	message: string
	showToast: (message?: string) => void
	toastHidde: () => void
}
