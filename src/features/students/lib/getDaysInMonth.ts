export const getDaysInMonth = (years?: number, month?: number) => {
	const now = new Date()
	const y = years ?? now.getFullYear()
	const m = month ?? now.getMonth()

	return new Date(y, m + 1, 0).getDate()
}
