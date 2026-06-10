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

type CommentCoursesType = {
	username: string
	rating: number
	comment: string
}
export type CoursesType = {
	id: string
	name: string
	description: string
	img: string
	rating: string
	reviews: CommentCoursesType[]
}

export const CardCourses = ({ course }: { course: CoursesType }) => {
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
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>
					{/* <ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore> */}
				</CardActions>
				{/* <Collapse
					in={expanded}
					timeout="auto"
					unmountOnExit
				>
					<CardContent>
						<Typography sx={{ marginBottom: 2 }}>Method:</Typography>
						<Typography sx={{ marginBottom: 2 }}>
							Heat 1/2 cup of the broth in a pot until simmering, add
							saffron and set aside for 10 minutes.
						</Typography>
						<Typography sx={{ marginBottom: 2 }}>
							Heat oil in a (14- to 16-inch) paella pan or a large, deep
							skillet over medium-high heat. Add chicken, shrimp and
							chorizo, and cook, stirring occasionally until lightly
							browned, 6 to 8 minutes. Transfer shrimp to a large plate
							and set aside, leaving chicken and chorizo in the pan. Add
							pimentón, bay leaves, garlic, tomatoes, onion, salt and
							pepper, and cook, stirring often until thickened and
							fragrant, about 10 minutes. Add saffron broth and remaining
							4 1/2 cups chicken broth; bring to a boil.
						</Typography>
						<Typography sx={{ marginBottom: 2 }}>
							Add rice and stir very gently to distribute. Top with
							artichokes and peppers, and cook without stirring, until
							most of the liquid is absorbed, 15 to 18 minutes. Reduce
							heat to medium-low, add reserved shrimp and mussels,
							tucking them down into the rice, and cook again without
							stirring, until mussels have opened and rice is just
							tender, 5 to 7 minutes more. (Discard any mussels that
							don&apos;t open.)
						</Typography>
						<Typography>
							Set aside off of the heat to let rest for 10 minutes, and
							then serve.
						</Typography>
					</CardContent>
				</Collapse> */}
			</Card>
		</li>
	)
}
