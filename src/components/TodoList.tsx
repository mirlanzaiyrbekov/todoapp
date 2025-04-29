import { getRemainingTime } from '@/helpers/calculate-remaining'
import {
	clearTodosFromStorage,
	getTodosFromStorage,
	saveTodoToStorage,
} from '@/helpers/storage.helpers'
import { useToast } from '@/hooks/use-toast'
import { TodoFormType } from '@/types/todoForm.type'
import { cn } from '@/utils/cn'
import { Check, X } from 'lucide-react'
import React from 'react'
import { Button } from './Button'

export const TodoList: React.FC = () => {
	const [todos, setTodos] = React.useState<TodoFormType[]>([])
	const [currentTime, setCurrentTime] = React.useState(Date.now())
	const { showToast } = useToast()

	const loadTodos = () => {
		const storedTodos = getTodosFromStorage() || []
		const dataTodos = storedTodos.filter(
			(todo) => currentTime < todo.createdAt + todo.expiresIn * 1000
		)
		if (dataTodos.length !== storedTodos.length) {
			saveTodoToStorage(dataTodos)
		}
		setTodos(storedTodos)
	}

	React.useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(Date.now())
		}, 1000)
		return () => clearInterval(timer)
	}, [])

	React.useEffect(() => {
		loadTodos()
	}, [currentTime])

	const changeStatus = (todoId: string, todoName: string) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
		)
		saveTodoToStorage(updatedTodos)
		setTodos(updatedTodos)
		showToast(`Статус "${todoName}" изменен`)
	}

	const deleteTodo = (id: string) => {
		const filteredTodos = todos.filter((todo) => todo.id !== id)
		saveTodoToStorage(filteredTodos)
		setTodos(filteredTodos)
		showToast('Задача удалена')
	}

	const cleanTodods = () => {
		clearTodosFromStorage()
		loadTodos()
		showToast('Список задач очищен')
	}

	return (
		<div className="space-y-3">
			{todos.length ? (
				todos.map((todo) => {
					const remainingTime = getRemainingTime(
						currentTime,
						todo.createdAt,
						todo.expiresIn
					)
					return (
						<div
							className={cn(
								'grid grid-cols-1 p-2 gap-4 items-center',
								'md:grid-cols-[1fr_1fr_auto]',
								'border border-gray-200 rounded-md'
							)}
							key={todo.id}
						>
							<h4 className="text-sm font-medium">{todo.todoName}</h4>
							<div
								className={cn('flex flex-col gap-2', 'sm:flex-row', 'md:gap-5')}
							>
								<div className="flex items-center gap-2">
									<small>Выполнен:</small>
									<div className="relative flex items-center">
										<input
											type="checkbox"
											checked={todo.isCompleted}
											onChange={() => changeStatus(todo.id, todo.todoName)}
											className={cn(
												'appearance-none w-5 h-5 border-2 border-gray-300 rounded-sm cursor-pointer ',
												todo.isCompleted &&
													'checked:bg-green-500 checked:border-green-500 peer'
											)}
										/>
										{todo.isCompleted ? (
											<Check
												size={14}
												className="absolute left-1/2 -translate-x-1/2 text-white text-sm pointer-events-none"
											/>
										) : (
											<X
												size={14}
												className="absolute left-1/2 w-full h-full rounded-md bg-red-500 border-red-500 peer -translate-x-1/2 text-white text-sm pointer-events-none"
											/>
										)}
									</div>
								</div>
								<div className="flex items-center gap-2">
									<small className="text-red-400 text-sm">Удаление через</small>
									<span className="text-xs">
										{remainingTime}
										<sup className="mx-1">c</sup>
									</span>
								</div>
							</div>
							<Button btnType="delete" onClick={() => deleteTodo(todo.id)} />
						</div>
					)
				})
			) : (
				<div className="flex items-center justify-center">
					<span className="text-sm text-green-800">
						Задач нет. Создайте первую запись
					</span>
				</div>
			)}
			{todos.length ? (
				<div className="fixed bottom-10 right-4 md:right-10 z-10">
					<Button
						className="rounded-xl bg-orange-600 text-xs"
						onClick={cleanTodods}
					>
						Очистить список
					</Button>
				</div>
			) : null}
		</div>
	)
}
