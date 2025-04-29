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
		<div className="space-y-3 border border-gray-200 p-3 rounded-md">
			{todos.length ? (
				todos.map((todo) => {
					const remainingTime = getRemainingTime(
						currentTime,
						todo.createdAt,
						todo.expiresIn
					)
					return (
						<div className="grid grid-cols-2 gap-2 p-2" key={todo.id}>
							<h4 className="text-sm font-medium">{todo.todoName}</h4>
							<ul className="flex items-center justify-between w-full text-sm">
								<li className="flex items-center gap-2">
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
								</li>
								<li className="flex items-center gap-2">
									<small>Удалится через</small>
									<span>{remainingTime}</span>
								</li>
								<li>
									<Button
										btnType="delete"
										onClick={() => deleteTodo(todo.id)}
									/>
								</li>
							</ul>
						</div>
					)
				})
			) : (
				<div className="flex items-center justify-center">
					<span className="text-sm text-orange-900">
						Задач нет. Создайте первую запись
					</span>
				</div>
			)}
			<div className="fixed bottom-10 right-10 z-10">
				<Button
					className="rounded-xl bg-orange-600 text-xs"
					onClick={cleanTodods}
				>
					Очистить список
				</Button>
			</div>
		</div>
	)
}
