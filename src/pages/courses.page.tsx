import { useAuth } from '@/features/auth/model/use-auth'
import {
	CardCourses,
	CoursesList,
	CoursesSearchForm,
	useInfinityScroll
} from '@/features/courses'
import { AddCourseButton } from '@/features/user'
import { Container } from '@mui/material'
import { useForm } from 'react-hook-form'

export type SearchType = {
	title?: string
	sort?: '-rating' | 'rating'
	per_page?: string
}

export function CoursesPage() {
	const { user } = useAuth()

	const form = useForm<SearchType>({
		mode: 'onChange',
		defaultValues: {
			title: '',
			per_page: '10',
			sort: '-rating'
		}
	})

	const { courses, handleSearchForm, observerRef, isLoading } =
		useInfinityScroll(form.getValues())

	return (
		<PageLayout
			form={
				<CoursesSearchForm
					onChange={handleSearchForm}
					form={form}
				/>
			}
			list={
				<CoursesList
					courses={courses}
					onLoading={isLoading}
					ref={observerRef}
					render={(item) => (
						<CardCourses
							key={item.id}
							course={item}
							actions={
								user && (
									<AddCourseButton
										courseId={item.id}
										userId={user.id}
									/>
								)
							}
						/>
					)}
				/>
			}
		/>
	)
}

const PageLayout = ({
	form,
	list
}: {
	form: React.ReactNode
	list: React.ReactNode
}) => {
	return (
		<section className="pt-10">
			<Container>
				<div className="flex flex-col gap-4">
					{form}
					{list}
				</div>
			</Container>
		</section>
	)
}
