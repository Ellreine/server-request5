import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../../../firebase'

export const useRequestGetTodos = () => {
	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const todosDbRef = ref(db, 'todos')

		return onValue(todosDbRef, snapshot => {
			const loadedTodos = snapshot.val() || []

			console.log('321312', loadedTodos)
			console.log('321312', Object.values(loadedTodos))
			setTodos(Object.values(loadedTodos))
			setIsLoading(false)
		})
	}, [])

	return { isLoading, todos }
}
