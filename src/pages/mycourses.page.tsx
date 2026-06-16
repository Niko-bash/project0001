import type { ProfileUser } from '@/features/user/api/type'
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Container,
	Typography
} from '@mui/material'
import { Link, useLoaderData } from 'react-router'

const MyCoursesPage = () => {
	const data: ProfileUser = useLoaderData()

	return (
		<Container>
			<ul className="flex flex-col gap-5 mt-10">
				{data.course.length ? (
					data.course.map((item) => (
						<li key={item.id}>
							<Card className="h-72">
								<CardHeader title={item.name} />
								<Box
									sx={{
										position: 'relative',
										width: '100%',
										paddingBottom: '10.25%',
										overflow: 'hidden',
										bgcolor: '#f5f5f5'
									}}
								>
									<CardMedia
										component="img"
										image={item.img}
										alt={item.name}
										sx={{
											position: 'absolute',
											top: 0,
											left: 0,
											bottom: 0,
											right: 0,
											width: '100%',
											height: '100%',
											objectFit: 'contain',
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
										{item.description}
									</Typography>
								</CardContent>
								<CardActions>
									<Button
										component={Link}
										to="/"
										variant="outlined"
									>
										Learn
									</Button>
									<Button>Deleted</Button>
								</CardActions>
							</Card>
						</li>
					))
				) : (
					<div>Sorry, you not adding courses</div>
				)}
			</ul>
		</Container>
	)
}

export default MyCoursesPage
