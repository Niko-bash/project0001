type ApiErrorResponse = {
	success: false
	error: {
		status: number
		message: string
		code: string
	}
}
type ApiSuccessResponse<T> = {
	status: number
	success: true
	data: T
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export class ApiError extends Error {
	public readonly code: string
	public readonly status: number

	constructor(code: string, message: string, status: number = 500) {
		super(message)
		this.code = code
		this.status = status
		this.name = this.constructor.name
	}

	toResponse(): ApiErrorResponse {
		return {
			success: false,
			error: {
				code: this.code,
				message: this.message,
				status: this.status
			}
		}
	}
}

export class UnauthorizedError extends ApiError {
	constructor(message: string = 'Not authorized') {
		super('UNAUTHORIZEDl', message, 401)
	}
}

export class RegistrationError extends ApiError {
	constructor(message: string = 'Registration failed') {
		super('REGISTRATION_FAILED', message, 400)
	}
}
