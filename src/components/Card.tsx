import React, { ReactNode } from "react"

interface ICard {
  title: string
  children: ReactNode
  testId?: string
}
const Card: React.FC<ICard> = ({ title, children, testId }) => (
  <div className="card" data-testid={testId}>
    <header className="card-header has-background-link">
      <p
        className="card-header-title has-text-white"
        data-testid={`${testId}-title`}>
        {title}
      </p>
    </header>
    <div className="card-content">{children}</div>
  </div>
)

export default Card
