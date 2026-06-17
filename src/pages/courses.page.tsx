import { useAuth } from '@/features/auth/model/use-auth'
import { useInfinityScroll } from '@/features/courses/model/infinity-scroll'
import { CardCourses } from '@/features/courses/ui/card'
import { CoursesList } from '@/features/courses/ui/card-list'
import { CoursesSearchForm } from '@/features/courses/ui/search-form'
import { AddCourseButton } from '@/features/user/ui/add-course'
import { Container } from '@mui/material'
import { useForm } from 'react-hook-form'

export type SearchType = {
	title?: string
	sort?: '-rating' | 'rating'
	per_page?: string
}

const CoursesPage = () => {
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

export default CoursesPage

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
