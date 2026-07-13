import { useLoaderData } from 'react-router'

export function CreateCoursesPage() {
	const data = useLoaderData()
	console.log(data)
	return <div>Created Courses Page</div>
}
