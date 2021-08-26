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

export type TUser = {
  userId: string
  username: string
  fullName: string
  permissions: string[]
}

export const initialUser: TUser = {
  userId: "",
  username: "",
  fullName: "",
  permissions: [],
}
