import React from "react"
import Image from "next/image"

interface INavbar {}
const Navbar: React.FC<INavbar> = () => (
  <nav
    className="navbar is-info is-spaced"
    role="navigation"
    aria-label="main navigation">
    <div className="navbar-brand">
      <div className="navbar-item">
        <Image
          src="/images/dashboard.png"
          alt="Dashboard logo"
          width={64}
          height={64}
          data-testid="navbar-image"
        />
        <p
          className="title has-text-white is-3 ml-2"
          data-testid="navbar-title">
          Dashboard
        </p>
      </div>
    </div>
  </nav>
)

export default Navbar
