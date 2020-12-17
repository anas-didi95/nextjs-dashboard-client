import React, { ReactNode } from "react"

interface IModal {
  children: ReactNode
  isActive: boolean
  toggleActive: () => void
  title: string
}
const Modal: React.FC<IModal> = ({
  children,
  isActive,
  toggleActive,
  title,
}) => (
  <div className={`modal ${isActive ? "is-active" : ""} px-4`}>
    <div className="modal-background" onClick={toggleActive}></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{title}</p>
        <button
          className="delete"
          aria-label="close"
          onClick={toggleActive}></button>
      </header>
      <section className="modal-card-body">{children}</section>
    </div>
  </div>
)

export default Modal
