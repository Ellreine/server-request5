import { useState } from 'react'
import { ref, update } from 'firebase/database'
import { db } from '../../../firebase'

export const useRequestUpdateTodo = () => {
	const [isUpdating, setIsUpdating] = useState(false)

	const requestUpdateTodo = (id, completed, title) => {
		setIsUpdating(true)

		const todoDbRef = ref(db, `todos/${id}`)
		update(todoDbRef, {
			title: title,
			completed: completed,
			id: id
		})
			// fetch(`http://localhost:3004/todos/${id}`, {
			// 	method: 'PUT',
			// 	headers: { 'Content-Type': 'application/json;charset=utf-8' },
			// 	body: JSON.stringify({
			// 		title: title,
			// 		completed: completed
			// 	})
			// })
			// 	.then(rawResponse => rawResponse.json())
			.then(response => {
				console.log('Задача обновлена, ответ сервера:', response)
				// refreshTodos()
			})
			.finally(() => setIsUpdating(false))
	}

	return {
		isUpdating,
		requestUpdateTodo
	}
}
