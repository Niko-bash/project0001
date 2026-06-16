import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ShareIcon from '@mui/icons-material/Share'
import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	IconButton,
	Typography
} from '@mui/material'
import type { CoursesType } from '../api/type'

export type InfinityCoursesType = {
	data: CoursesType[]
	first: number
	prev: number | null
	next: number | null
	last: number
	pages: number
	items: number
}

export const CardCourses = ({
	course,
	actions
}: {
	course: CoursesType
	actions: React.ReactNode
}) => {
	// const [expanded, setExpanded] = useState(false)

	// const handleExpandClick = () => {
	// 	setExpanded(!expanded)
	// }
	return (
		<li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 grow px-2">
			<Card className="flex flex-col justify-between h-full w-full">
				<CardHeader
					action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title={course.name}
					className="text-center"
				/>
				<Box
					sx={{
						position: 'relative',
						width: '100%',
						paddingBottom: '56.25%',
						overflow: 'hidden',
						bgcolor: '#f5f5f5'
					}}
				>
					<CardMedia
						component="img"
						image={course.img}
						alt={course.name}
						sx={{
							position: 'absolute',
							top: 0,
							left: 0,
							bottom: 0,
							right: 0,
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							transition: 'transform 0.3s',
							'&:hover': {
								transform: 'scale(1.05)'
							},
							aspectRatio: '16 / 9'
						}}
					/>
				</Box>
				<CardContent>
					<Typography
						variant="body2"
						sx={{ color: 'text.secondary' }}
					>
						{course.description}
					</Typography>
				</CardContent>
				<CardActions
					sx={{ display: 'flex', justifyContent: 'space-around' }}
					disableSpacing
				>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>
					{actions}
					{/* <ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore> */}
				</CardActions>
			</Card>
		</li>
	)
}
