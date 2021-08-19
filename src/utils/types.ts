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
