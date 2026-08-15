const TITLE = {
	Student: 'You really unsubscribe this courses ???',
	Teacher:
		'You really want to delete this courses ??? All your student lost this courses and them money'
}

const CONTENT = {
	Student:
		'Warning !!! If you delete this courses, all your students lost them money',
	Teacher:
		'Warning !!! If you unsubscribe this courses your money will be lost'
}

export const MyCoursesModalTitle = ({
	mode
}: {
	mode: 'Teacher' | 'Student'
}) => {
	return <div>{TITLE[mode]}</div>
}

export const MyCoursesModelContent = ({
	mode
}: {
	mode: 'Teacher' | 'Student'
}) => {
	return <div>{CONTENT[mode]}</div>
}
