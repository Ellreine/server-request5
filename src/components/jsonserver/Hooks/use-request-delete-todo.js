import { useState } from 'react'
import { ref, remove } from 'firebase/database'
import { db } from '../../../firebase'

export const useRequestDeleteTodo = () => {
	const [isDeleting, setIsDeleting] = useState(false)

	const requestDeleteTodo = id => {
		setIsDeleting(true)

		const todoDbRef = ref(db, `todos/${id}`)
		console.log(todoDbRef)
		remove(todoDbRef)
			// fetch(`http://localhost:3004/todos/${id}`, {
			// 	method: 'DELETE'
			// })
			// 	.then(rawResponse => rawResponse.json())
			.then(response => {
				console.log('Задача удалена, ответ сервера:', response)
			})
			.finally(() => setIsDeleting(false))
	}

	return {
		isDeleting,
		requestDeleteTodo
	}
}
