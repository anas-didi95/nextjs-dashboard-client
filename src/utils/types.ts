export type TResponseError = {
  code: string
  message: string
  traceId: string
  errors: string[]
}

export const initialResponseError: TResponseError = {
  code: "",
  message: "",
  traceId: "",
  errors: [],
}

export type TClaim = {
  userId: string
  username: string
  fullName: string
  permissions: string[]
}

export const initialClaim: TClaim = {
  userId: "",
  username: "",
  fullName: "",
  permissions: [],
}

export type TUser = {
  id: string
  username: string
  fullName: string
  email: string
  lastModifiedBy: TUser
  lastModifiedDate: string
  version: number
  telegram: string
  permission: string[]
}
