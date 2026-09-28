import {
	CardCourses,
	CoursesList,
	CoursesSearchForm,
	useInfinityScroll,
	useUserData,
	type SearchType
} from '@/features/courses'
import { CoursesServices } from '@/features/courses/api/courses.services'
import { AddCourseButton } from '@/features/user'
import { useDebounce } from '@/shared/hook/useDebounce'
import { MyErrorFallback } from '@/shared/ui/error'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm, useWatch } from 'react-hook-form'

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

	const value = useWatch({ control: form.control })

	const values = useDebounce(value, 500)

	const { courses, error, hasData, loadMore, retry, status } =
		useInfinityScroll(values, CoursesServices)

	return (
		<PageLayout
			form={
				<ErrorBoundary FallbackComponent={MyErrorFallback}>
					<CoursesSearchForm form={form} />
				</ErrorBoundary>
			}
			list={
				<CoursesList
					hasData={hasData}
					onLoadMore={loadMore}
					onRetry={retry}
					status={status}
					courses={courses}
					error={error}
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
