import React, { ReactNode } from "react"

interface IForm {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  children: ReactNode
  title?: string
}

const Form: React.FC<IForm> = ({ children, title, onSubmit }) => (
  <form onSubmit={onSubmit}>
    {!!title && (
      <>
        <p className="has-text-weight-bold is-size-4">{title}</p>
        <br />
      </>
    )}
    {children}
  </form>
)

export default Form
