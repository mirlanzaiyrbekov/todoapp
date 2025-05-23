import { Header } from '@/components/Header'
import { Toast } from '@/components/Toast'
import { ToastProvider } from '@/providers/Toast-provider'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const RootLayout: React.FC = () => {
	return (
		<ToastProvider>
			<main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
				<Header />
				<div className="p-3 sm:p-5 md:p-10">
					<Outlet />
					<Toast />
				</div>
				{/* <Footer /> */}
			</main>
		</ToastProvider>
	)
}
