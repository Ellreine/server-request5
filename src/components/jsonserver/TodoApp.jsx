import styles from './TodoApp.module.css'
import { useState } from 'react'
import AddTodo from './AddTodo/AddTodo'
import Header from './Header/Header'
import TodoList from './TodoList/TodoList'
import { useRequestAddTodo, useRequestDeleteTodo, useRequestGetTodos, useRequestUpdateTodo } from './Hooks'
import { Container } from 'react-bootstrap'

// import useSortAndFilterTodos from './Utils.js/useSortAndFilterTodos'
import useDebouncedSortAndFilterTodos from './Utils.js/useSortAndFilterTodos'

function TodoApp() {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false)
	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag)

	const { isLoading, todos } = useRequestGetTodos()
	const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodos)
	const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo(refreshTodos)
	const { isUpdating, requestUpdateTodo } = useRequestUpdateTodo(refreshTodos)
	const [sortOrder, setSortOrder] = useState('asc')
	const [searchValue, setSearchValue] = useState('')

	// const sortedTodos = useSortAndFilterTodos(todos, sortOrder, searchValue) // добавил valueInput
	const debouncedSortAndFilteredTodos = useDebouncedSortAndFilterTodos(todos, sortOrder, searchValue, 700)

	const handleSortOrderChange = order => {
		setSortOrder(order)
	}

	return (
		<Container>
			<Header />
			<AddTodo
				isCreating={isCreating}
				requestAddTodo={requestAddTodo}
				handleSortOrderChange={handleSortOrderChange}
				setSearchValue={setSearchValue}
			/>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<TodoList
					// todos={sortedTodos}
					todos={debouncedSortAndFilteredTodos}
					requestDeleteTodo={requestDeleteTodo}
					isDeleting={isDeleting}
					requestUpdateTodo={requestUpdateTodo}
					isUpdating={isUpdating}
				/>
			)}
		</Container>
	)
}
export default TodoApp
//  json-server --watch db.json --port 3004 --delay 2000
