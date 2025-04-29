import { TodoEnumName } from '@/enums/todo.enum'
import { TodoFormType } from '@/types/todoForm.type'

export const saveTodoToStorage = (
	todo: TodoFormType[]
): { message: string } => {
	try {
		localStorage.setItem(TodoEnumName.TO_STORAGE, JSON.stringify(todo))
		return {
			message: 'Задача успешно создана',
		}
	} catch (error) {
		console.error('Ошибка при сохранении в localStorage:', error)
		return {
			message: 'Ошибка при сохранении в localStorage',
		}
	}
}
export const clearTodosFromStorage = () => {
	localStorage.removeItem(TodoEnumName.TO_STORAGE)
}
export const getTodosFromStorage = (): TodoFormType[] => {
	try {
		const storedData = localStorage.getItem(TodoEnumName.TO_STORAGE)
		return storedData ? JSON.parse(storedData) : []
	} catch (error) {
		console.error('Ошибка при загрузки задач из localStorage:', error)
		return []
	}
}
