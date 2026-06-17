import { useEffect, useState } from 'react'

export const useDebounce = <T,>(value: T, delay: number) => {
	const [debounceState, setDebounceState] = useState<T>(value)

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebounceState(value)
		}, delay)

		return () => clearTimeout(timerId)
	}, [value, delay])

	return debounceState
}
