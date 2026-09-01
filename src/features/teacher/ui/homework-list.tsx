import type { Homework } from '../api/type'
import { HomeWorkItem } from './homework-item'

export const HomeworkList = ({
	title,
	items
}: {
	title: React.ReactNode
	items: Homework[]
}) => {
	return (
		<div>
			<h2>{title}</h2>
			<ol className="flex flex-col gap-4">
				{items &&
					items.map((quest) => (
						<HomeWorkItem
							item={quest}
							key={quest.id}
						/>
					))}
			</ol>
		</div>
	)
}
