import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Tooltip,
	XAxis,
	YAxis,
	type TooltipContentProps
} from 'recharts'
import type { PanelDataType } from './type'

export const BarPanel = ({ data }: { data: PanelDataType[] }) => {
	return (
		<BarChart
			style={{
				width: '100%',
				maxWidth: '4000px',
				maxHeight: '70vh',
				aspectRatio: 1.618
			}}
			responsive
			data={data}
		>
			<CartesianGrid />
			<XAxis
				dataKey="month"
				niceTicks="snap125"
			/>
			<YAxis
				niceTicks="snap125"
				dataKey="value"
			/>
			<Tooltip content={CustomTooltip} />
			<Legend />
			<Bar
				dataKey="value"
				fill="blue"
			/>
		</BarChart>
	)
}

const CustomTooltip = ({ active, payload, label }: TooltipContentProps) => {
	const firstPayload = payload?.[0]
	const isVisible = active && firstPayload != null
	return (
		<div
			className="custom-tooltip"
			style={{
				visibility: isVisible ? 'visible' : 'hidden'
			}}
		>
			{isVisible && (
				<>
					<p className="label">{`${label} : ${firstPayload.value}`}</p>
					<p className="desc">Anything you want can be displayed here.</p>
				</>
			)}
		</div>
	)
}
