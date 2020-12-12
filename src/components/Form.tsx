import React, { ReactNode } from "react"

interface IForm {
  children: ReactNode
  title?: string
}

const Form: React.FC<IForm> = ({ children, title }) => (
  <form>
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
