import type { User } from '@/features/auth/api/type'

export type ProfileUser = Omit<User, 'password' | 'id' | 'role'>
