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
  lastModifiedBy: {
    id: ""
    username: ""
  }
  lastModifiedDate: string
  version: number
  telegramId: string
  permissions: string[]
}

export const initialUser: TUser = {
  id: "",
  username: "",
  fullName: "",
  email: "",
  lastModifiedBy: {
    id: "",
    username: "",
  },
  lastModifiedDate: "",
  version: -1,
  telegramId: "",
  permissions: [],
}

export type TPermission = {
  id: string
}

export const initalPermission: TPermission = {
  id: "",
}
