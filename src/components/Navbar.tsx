import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import useConstants from "../utils/hooks/useConstants"

const Navbar = () => {
  const [isActive, setActive] = useState(false)
  const constants = useConstants()

  const toggleActive = () => setActive((prev) => !prev)

  return (
    <nav
      className="navbar is-spaced is-info"
      role="navigation"
      aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/dashboard">
          <a className="navbar-item" href="#">
            <Image src="/images/dashboard.png" width={64} height={64} />
            <p className="title is-4 ml-2 has-text-white">
              {constants.metadata.title}
            </p>
          </a>
        </Link>
        <a
          role="button"
          className={`navbar-burger burger ${isActive && "is-active"}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={toggleActive}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive && "is-active"}`}>
        <div className="navbar-start">
          <a className="navbar-item">Home</a>
          <a className="navbar-item">Documentation</a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>
            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
