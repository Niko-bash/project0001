import clsx from 'clsx'
import type { StatusHomeWork } from '../api/type'

const statusRec: Record<StatusHomeWork, string> = {
	completed: 'bg-green-500',
	overdue: 'bg-red-500',
	progress: 'bg-gray-500',
	review: 'bg-yellow-500'
}

export const DotStatus = ({ status }: { status: StatusHomeWork }) => {
	return <div className={clsx('w-4 h-4 rounded-2xl', statusRec[status])} />
}
