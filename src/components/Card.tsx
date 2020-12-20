import React, { ReactNode } from "react"

interface ICard {
  title: string
  children: ReactNode
}
const Card: React.FC<ICard> = ({ title, children }) => (
  <div className="card">
    <header className="card-header has-background-link">
      <p className="card-header-title has-text-white">{title}</p>
    </header>
    <div className="card-content">{children}</div>
  </div>
)

export default Card
