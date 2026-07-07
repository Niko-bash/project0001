import type { MapCardType } from './type'

export const MyCoursesList = ({
	items,
	render,
	isLoading
}: {
	items: MapCardType[]
	render: (item: MapCardType) => React.ReactNode
	isLoading: boolean
}) => {
	if (isLoading) {
		return <div>Loading...</div>
	}
	return (
		<ul className="flex flex-col gap-5 mt-10">
			{items.length ? (
				items.map((item) => render(item))
			) : (
				<div>Sorry, you not adding courses</div>
			)}
		</ul>
	)
}
