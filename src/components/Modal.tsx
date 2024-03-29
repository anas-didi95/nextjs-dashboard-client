import React, { ReactNode } from "react"

interface IModal {
  children: ReactNode
  isActive: boolean
  toggleActive: () => void
  title: string
  testId?: string
}
const Modal: React.FC<IModal> = ({
  children,
  isActive,
  toggleActive,
  title,
  testId,
}) => (
  <div
    className={`modal ${isActive ? "is-active" : ""} px-4`}
    data-testid={testId}>
    <div className="modal-background" onClick={toggleActive}></div>
    <div
      className={`modal-card ${
        isActive ? "animate__animated animate__zoomIn animate__faster" : ""
      }`}>
      <header className="modal-card-head">
        <p className="modal-card-title">{title}</p>
        <button
          className="delete"
          aria-label="close"
          onClick={toggleActive}
          data-testid={`${testId}-close`}
        />
      </header>
      <section className="modal-card-body">{children}</section>
    </div>
  </div>
)

export default Modal
