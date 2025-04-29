import { useToast } from '@/hooks/use-toast'
import { cn } from '@/utils/cn'
import { X } from 'lucide-react'
import React from 'react'

export const Toast: React.FC = () => {
	const { isActive, message, toastHidde } = useToast()

	return (
		<div
			className={cn(
				'fixed bottom-20 left-5',
				'p-4 rounded-md shadow-sm bg-white border border-gray-200 transition-all duration-300',
				isActive
					? 'opacity-100 translate-y-0'
					: 'opacity-0 translate-y-2 pointer-events-none'
			)}
		>
			<div className="flex items-center justify-between gap-4">
				<span className="text-sm">{message || 'Информация'}</span>
				<button
					onClick={toastHidde}
					className="text-gray-500 hover:text-gray-700"
				>
					<X size={16} />
				</button>
			</div>
		</div>
	)
}
