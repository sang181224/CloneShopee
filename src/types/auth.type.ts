import type { User } from './user.type'
import type { SuccsessResponse } from './utils.type'

export type AuthResponse = SuccsessResponse<{
  access_token: string
  expires: number
  user: User
}>
