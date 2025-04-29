import { cn } from '@/utils/cn'
import React, { ButtonHTMLAttributes } from 'react'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	btnType?: 'delete' | 'create' | 'default'
}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
	({ className, btnType = 'default', children, ...props }, ref) => {
		switch (btnType) {
			case 'delete':
				return (
					<button
						ref={ref}
						className={cn(
							'bg-transparent border-none',
							'bg-orange-500',
							'text-white py-2 px-4 rounded-lg text-xs',
							'hover:opacity-50 cursor-pointer',
							'transition-opacity delay-75'
						)}
						{...props}
					>
						Удалить
					</button>
				)
			case 'create':
				return (
					<button
						ref={ref}
						className={cn(
							'bg-transparent border-none',
							'bg-green-500',
							'text-white p-2.5 rounded-md text-sm',
							'hover:opacity-50 cursor-pointer',
							'transition-opacity delay-75'
						)}
						{...props}
					>
						Создать
					</button>
				)
			case 'default':
				return (
					<button
						ref={ref}
						className={cn(
							'bg-transparent border-none',
							'bg-green-500',
							'text-white p-2.5 rounded-md text-sm',
							'hover:opacity-50 cursor-pointer',
							'transition-opacity delay-75',
							className
						)}
						{...props}
					>
						{children}
					</button>
				)
			default:
				return (
					<button
						ref={ref}
						className={cn(
							'bg-transparent border-none',
							'bg-green-500',
							'text-white p-2.5 rounded-md text-sm',
							'hover:opacity-50 cursor-pointer',
							'transition-opacity delay-75'
						)}
						{...props}
					>
						{children}
					</button>
				)
		}
	}
)
