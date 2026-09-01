import type { CreateCoursesType, ICoursesServices } from '@/features/courses'
import { compressImage } from '@/shared/lib/compress-image'
import { videoToBase64 } from '@/shared/lib/videoToBase64'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

const DEFAULT_AVATAR = '/assets/courses.webp'
export const useChangeForm = (
	userId: string,
	CoursesServices: ICoursesServices
) => {
	const [preview, setPreview] = useState<string | undefined>(DEFAULT_AVATAR)
	const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined)

	const form = useForm<CreateCoursesType>({
		defaultValues: {
			name: '',
			description: '',
			video: {
				description: '',
				url: undefined
			}
		}
	})

	const onSubmit: SubmitHandler<CreateCoursesType> = async (values) => {
		const response = await CoursesServices.createCoursesTeacher(
			userId,
			values
		)

		if (response.success) {
			console.log('suc')
		}
	}
	const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const image = e.target.files?.[0]
		if (image) {
			const compress = await compressImage(image, 800, 0.7)
			setPreview(compress)
			form.setValue('img', compress)
		}
	}

	const handleChangeVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const video = e.target.files?.[0]
		console.log(video)
		if (video) {
			const video64 = await videoToBase64(video)
			setVideoUrl(video64)
			form.setValue('video.url', video64)
		}
	}

	return {
		handleChangeImage,
		handleChangeVideo,
		onSubmit,
		preview,
		videoUrl,
		form
	}
}
