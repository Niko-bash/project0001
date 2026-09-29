import { useCallback, useRef } from 'react'

export function useIntersectionSentinel(
	onIntersect: () => void,
	enabled: boolean
) {
	const observerRef = useRef<IntersectionObserver | null>(null)

	const setRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (!node || !enabled) return

			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) onIntersect()
				},
				{ threshold: 0.1, rootMargin: '200px' }
			)
			observer.observe(node)
			observerRef.current = observer

			return () => {
				observer.disconnect()
				if (observerRef.current === observer) {
					observerRef.current = null
				}
			}
		},
		[enabled, onIntersect]
	)

	return setRef
}
