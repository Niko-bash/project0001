import { useChangeForm } from '..'
import { CoursesServices } from '../api/courses.services'
import { useNavigationForm } from '../model/useNavigationForm'
import { RenderForm } from './form-step'
import { StepNavigation } from './step'

export const CreateCoursesForm = ({ userId }: { userId: string }) => {
	const { handleNext, handlePrev, step, isLast, isFirst } = useNavigationForm()
	const {
		handleChangeImage,
		handleChangeVideo,
		onSubmit,
		preview,
		videoUrl,
		form
	} = useChangeForm(userId, CoursesServices)

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="flex flex-col pt-4 gap-4"
		>
			<div className="flex flex-col justify-between p-5 border rounded-2xl black min-h-[90vh]">
				<RenderForm
					step={step}
					form={form}
					onChangeImage={handleChangeImage}
					onChangeVideo={handleChangeVideo}
					preview={preview}
					videoUrl={videoUrl}
				/>
				<StepNavigation
					onNext={handleNext}
					onPrev={handlePrev}
					isLast={isLast}
					isFirst={isFirst}
					isSubmitting={false}
				/>
			</div>
		</form>
	)
}
