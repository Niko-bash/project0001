import type { SessionUser } from '@/features/auth'
import { CreateCoursesForm } from '@/features/courses'
import { CoursesServices } from '@/features/courses/api/courses.services'
import { useChangeForm } from '@/features/courses/model/useChangeForm'
import { useLoaderData } from 'react-router'

export function CreateCoursesPage() {
	const data = useLoaderData<SessionUser>()

	const {
		handleChangeImage,
		handleChangeVideo,
		onSubmit,
		preview,
		videoUrl,
		form
	} = useChangeForm(data.id, CoursesServices)

	return (
		<CreateCoursesForm
			form={form}
			onChangeImage={handleChangeImage}
			onChangeVideo={handleChangeVideo}
			onSubmit={onSubmit}
			preview={preview}
			videoUrl={videoUrl}
		/>
	)
}
