import React from "react"

const HomePage: React.FC<{}> = () => {
  return (
    <section className="section">
      <h1 className="title" data-testid="header">
        Welcome to Next.js!
      </h1>
      <h2 className="subtitle">
        A simple container to divide your page into <strong>sections</strong>,
        like the one you&apos;re currently reading.
      </h2>
    </section>
  )
}

export default HomePage
