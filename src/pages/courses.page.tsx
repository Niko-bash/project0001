import {
	CardCourses,
	CoursesList,
	CoursesSearchForm,
	useInfinityScroll
} from '@/features/courses'
import { useUserData } from '@/features/courses/model/user-data'
import { AddCourseButton } from '@/features/user'
import { MyErrorFallback } from '@/shared/ui/error'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm } from 'react-hook-form'

export type SearchType = {
	title?: string
	sort?: '-rating' | 'rating'
	per_page?: string
}

export function CoursesPage() {
	const { user, adding } = useUserData()

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
				<ErrorBoundary FallbackComponent={MyErrorFallback}>
					<CoursesSearchForm
						onChange={handleSearchForm}
						form={form}
					/>
				</ErrorBoundary>
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
								user && !adding.has(item.id) ? (
									<AddCourseButton
										courseId={item.id}
										userId={user.id}
									/>
								) : (
									<div>Adding</div>
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
			<div className="flex flex-col gap-4">
				{form}
				{list}
			</div>
		</section>
	)
}
