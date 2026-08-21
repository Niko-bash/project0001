import type { CoursesType } from '@/features/courses/api/type'

export const MyCoursesList = ({
	items,
	render,
	isLoading
}: {
	items: CoursesType[] | undefined
	render: (item: CoursesType) => React.ReactNode
	isLoading: boolean
}) => {
	if (isLoading) {
		return <div>Loading...</div>
	}
	return (
		<ul className="flex flex-col gap-5 mt-10">
			{items && items.length > 0 ? (
				items.map((item) => render(item))
			) : (
				<div>Sorry, you not adding courses</div>
			)}
		</ul>
	)
}
