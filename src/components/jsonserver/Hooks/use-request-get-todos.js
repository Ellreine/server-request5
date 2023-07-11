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

			console.log('loadedTodos', loadedTodos)
			console.log('Object', Object.values(loadedTodos))

			const arrayData = []
			for (const key in loadedTodos) {
				arrayData.push({ ...loadedTodos[key], id: key })
			}

			setTodos(arrayData)
			setIsLoading(false)
		})
	}, [])

	return { isLoading, todos }
}
