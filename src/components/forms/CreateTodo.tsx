import {
	getTodosFromStorage,
	saveTodoToStorage,
} from '@/helpers/storage.helpers'
import { useToast } from '@/hooks/use-toast'
import { TodoFormType } from '@/types/todoForm.type'
import React from 'react'
import { Button } from '../Button'

export const CreateTodo: React.FC = () => {
	const [todoValue, setTodoValue] = React.useState('')
	const { showToast } = useToast()

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (todoValue.length < 5) {
			showToast('Минимальная длина задачи 5 символов')
			return
		}
		const existingTodos = getTodosFromStorage() || []
		const newTodo: TodoFormType = {
			id: Date.now().toString(),
			isCompleted: false,
			todoName: todoValue,
			createdAt: Date.now(),
			expiresIn: 10,
		}
		const save = saveTodoToStorage([...existingTodos, newTodo])
		showToast(save.message)
		setTodoValue('')
	}

	return (
		<form
			onSubmit={onSubmit}
			className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-5 py-5"
		>
			<div className="relative p-5 rounded-sm border border-gray-400">
				<input
					onChange={(e) => setTodoValue(e.target.value)}
					value={todoValue}
					type="text"
					className="absolute top-0 left-0 w-full h-full focus:outline-0 p-2"
				/>
			</div>
			<Button btnType="create" />
		</form>
	)
}
