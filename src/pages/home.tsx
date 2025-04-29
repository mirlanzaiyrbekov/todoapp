import { CreateTodo } from '@/components/forms/CreateTodo'
import { TodoList } from '@/components/TodoList'

export const HomePage = () => {
	return (
		<>
			<section>
				<CreateTodo />
			</section>
			<section>
				<TodoList />
			</section>
		</>
	)
}
