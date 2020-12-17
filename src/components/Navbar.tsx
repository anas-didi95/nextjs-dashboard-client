import React, { useContext, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import useConstants from "../utils/hooks/useConstants"
import AuthContext from "../utils/contexts/AuthContext"
import ButtonGroup from "./ButtonGroup"
import Button from "./Button"
import { useRouter } from "next/router"

const Navbar = () => {
  const [isActive, setActive] = useState(false)
  const constants = useConstants()
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const [isSignOut, setSignOut] = useState(false)

  const toggleActive = () => setActive((prev) => !prev)
  const signOut = () => {
    authContext.clearAuth()
    router.replace("/")
  }
  const toggleSignOut = () => setSignOut(prev => !prev)

  return (
    <>
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
            onClick={toggleActive}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={`navbar-menu ${isActive && "is-active"}`}>
          {authContext.isAuth() && (
            <div className="navbar-start">
              <Link href="/dashboard">
                <a className="navbar-item" href="/dashboard">
                  Home
              </a>
              </Link>
            </div>
          )}
          <div className="navbar-end">
            <div className="navbar-item">
              <ButtonGroup>
                {authContext.isAuth() || true && (
                  <Button
                    label={constants.button.signOut}
                    onClick={toggleSignOut}
                    type="button"
                    color="is-danger"
                  />
                )}
              </ButtonGroup>
            </div>
          </div>
        </div>
      </nav>
      <div className={`modal ${isSignOut ? "is-active" : ""} px-4`}>
        <div className="modal-background" onClick={toggleSignOut}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Confirm Sign Out?</p>
            <button className="delete" aria-label="close" onClick={toggleSignOut}></button>
          </header>
          <section className="modal-card-body">
            <p className="content">
              Click "Sign Out" below to sign out from dashboard.
</p>
            <br />
            <ButtonGroup align="is-right">
              <Button label="Close" onClick={toggleSignOut} type="button" color="is-light" isInverted isOutlined />
              <Button label="Sign Out" onClick={() => { }} type="button" color="is-danger" />
            </ButtonGroup>
          </section>
        </div>
      </div>
    </>
  )
}

export default Navbar
