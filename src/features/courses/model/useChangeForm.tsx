import type { CreateCoursesType, ICoursesServices } from '@/features/courses'
import { compressImage } from '@/shared/lib/compress-image'
import { videoToBase64 } from '@/shared/lib/videoToBase64'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from '@zod/mini'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

const DEFAULT_AVATAR = '/assets/courses.webp'

const MAX_IMAGE_SIZE = 6 * 1024 * 1024 // 5MB

const VideoSchema = z.object({
	description: z.string().check(z.minLength(3)),
	url: z.string().check(z.minLength(1))
})

const CreateCoursesTypeSchema = z.object({
	name: z.string().check(z.minLength(3)),
	description: z.string().check(z.minLength(3)),
	img: z.string().check(z.minLength(1)),
	video: VideoSchema
}) satisfies z.ZodMiniType<CreateCoursesType>

export const useChangeForm = (
	userId: string,
	CoursesServices: ICoursesServices
) => {
	const [preview, setPreview] = useState<string | undefined>(DEFAULT_AVATAR)
	const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined)

	const form = useForm<CreateCoursesType>({
		resolver: zodResolver(CreateCoursesTypeSchema),
		mode: 'onChange',
		shouldUnregister: false,
		defaultValues: {
			name: '',
			description: '',
			video: {
				description: ''
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
		if (image && image.size < MAX_IMAGE_SIZE) {
			const compress = await compressImage(image, 800, 0.7)
			setPreview(compress)
			form.setValue('img', compress)
		} else {
			form.setError('img', { message: 'File > 5mb' })
		}
	}

	const handleChangeVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const video = e.target.files?.[0]
		if (video && video.size < MAX_IMAGE_SIZE) {
			const video64 = await videoToBase64(video)
			setVideoUrl(video64)
			form.setValue('video.url', video64)
		} else {
			form.setError('video.url', { message: 'File > 5mb' })
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
