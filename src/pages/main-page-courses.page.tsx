import { useLoaderData } from 'react-router'

export function MainPageCoursesPage() {
	const data = useLoaderData()
	console.log(data)

	return <div>Hello this courses </div>
}
