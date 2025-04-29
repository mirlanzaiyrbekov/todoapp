import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Toast } from '@/components/Toast'
import { ToastProvider } from '@/providers/Todo-provider'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const RootLayout: React.FC = () => {
	return (
		<ToastProvider>
			<main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
				<Header />
				<div className="xs:p-2 sm:p-5 md:p-10">
					<Outlet />
					<Toast />
				</div>
				<Footer />
			</main>
		</ToastProvider>
	)
}
