import { Button } from '@mui/material'
import type { Homework } from '../api/type'
import { DotStatus } from './dots-status'

export const HomeWorkItem = ({ item }: { item: Homework }) => {
	return (
		<li className="list-decimal border rounded-2xl p-3">
			<h3>Name quest: {item.name}</h3>
			<p>Description: {item.description}</p>
			<div>Completed before: {new Date(item.date).toLocaleDateString()}</div>
			<div className="flex items-center gap-2">
				<DotStatus status={item.status} />
				status: {item.status}
			</div>
			<Button>Go to quest</Button>
		</li>
	)
}
