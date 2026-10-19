import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	type TooltipContentProps
} from 'recharts'
import type { PanelDataType } from './type'

export const BarPanel = ({
	data,
	error
}: {
	data: PanelDataType[]
	error: Error | null
}) => {
	// const [size, setSize] = useState(1)

	return (
		<div className="relative aspect-1.6 border-[1px] rounded-2xl">
			<ResponsiveContainer
				width="100%"
				height="100%"
			>
				<BarChart data={data}>
					<CartesianGrid className="relative" />
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
			</ResponsiveContainer>

			{error && (
				<div className="absolute inset-0 flex justify-center items-center">
					{error.message}
				</div>
			)}
		</div>
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
				</>
			)}
		</div>
	)
}
