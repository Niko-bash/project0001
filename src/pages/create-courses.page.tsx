import type { SessionUser } from '@/features/auth'
import { CreateCoursesForm } from '@/features/courses'
import { useLoaderData } from 'react-router'

export function CreateCoursesPage() {
	const data = useLoaderData<SessionUser>()

	return <CreateCoursesForm userId={data.id} />
}
