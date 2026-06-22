import { AuthServices } from '@/features/auth/api/auth.services'
import type { SessionUser } from '@/features/auth/api/type'

export type RootLoaderData = {
	session: SessionUser | null
}

export async function rootLoader(): Promise<RootLoaderData> {
	try {
		const session = await AuthServices.getSession()
		return { session: session ?? null }
	} catch (error) {
		console.error('Failed to load session:', error)
		return { session: null }
	}
}
