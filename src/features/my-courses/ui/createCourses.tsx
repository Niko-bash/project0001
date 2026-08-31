import { ROUTES } from '@/shared/lib/router-config'
import { Button } from '@mui/material'
import { Link } from 'react-router'

export const CreateCourses = ({ title }: { title: React.ReactNode }) => {
	return (
		<Button
			className="w-full h-32"
			variant="contained"
			component={Link}
			to={ROUTES.CREATE_COURSES.pattern}
		>
			{title}
		</Button>
	)
}
