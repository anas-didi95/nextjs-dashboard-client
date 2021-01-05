import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import useConstants from "../utils/hooks/useConstants"
import ButtonGroup from "./ButtonGroup"
import Button from "./Button"
import { useRouter } from "next/router"
import Modal from "./Modal"
import { GrPersonalComputer, GrGithub, GrLinkedin } from "react-icons/gr"
import { useAuthContext } from "../utils/contexts/AuthContext"
import useAuth from "../utils/hooks/useAuth"
import { useLoadingContext } from "../utils/contexts/LoadingContext"

const Navbar = () => {
  const [isActive, setActive] = useState(false)
  const [isSignOut, setSignOut] = useState(false)
  const [isCredits, setCredits] = useState(false)

  const toggleActive = () => setActive((prev) => !prev)
  const toggleSignOut = () => setSignOut((prev) => !prev)
  const toggleCredits = () => setCredits((prev) => !prev)

  return (
    <>
      <nav
        className="navbar is-spaced is-info"
        role="navigation"
        aria-label="main navigation">
        <NavbarBrand isActive={isActive} toggleActive={toggleActive} />
        <NavbarMenu
          isActive={isActive}
          toggleSignOut={toggleSignOut}
          toggleCredits={toggleCredits}
        />
      </nav>
      <ModalCredits isActive={isCredits} toggleActive={toggleCredits} />
      <ModalSignOut isActive={isSignOut} toggleActive={toggleSignOut} />
    </>
  )
}

const NavbarBrand: React.FC<{
  isActive: boolean
  toggleActive: () => void
}> = ({ isActive, toggleActive }) => {
  const constants = useConstants()

  return (
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
        className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
        aria-label="menu"
        aria-expanded="false"
        onClick={toggleActive}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  )
}

const NavbarMenu: React.FC<{
  isActive: boolean
  toggleSignOut: () => void
  toggleCredits: () => void
}> = ({ isActive, toggleSignOut, toggleCredits }) => {
  const constants = useConstants()
  const authContext = useAuthContext()

  return (
    <div
      className={`navbar-menu ${isActive
          ? "is-active animate__animated animate__slideInDown animate__faster"
          : ""
        }`}>
      {authContext.isAuth() && (
        <div className="navbar-start">
          <Link href="/dashboard">
            <a className="navbar-item" href="/dashboard">
              Home
            </a>
          </Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Security</a>
            <div className="navbar-dropdown">
              <Link href="/dashboard/security/user/list">
                <a className="navbar-item" href="/dashboard/security/user/list">
                  User
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="navbar-end">
        <div className="navbar-item">
          <ButtonGroup>
            <Button
              label="Credits"
              onClick={toggleCredits}
              type="button"
              color="is-light"
              isOutlined
            />
            {authContext.isAuth() && (
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
  )
}

const ModalCredits: React.FC<{
  isActive: boolean
  toggleActive: () => void
}> = ({ isActive, toggleActive }) => {
  const constants = useConstants()

  return (
    <Modal
      isActive={isActive}
      title={constants.header.credits}
      toggleActive={toggleActive}>
      <div className="content">
        <h3>Resources</h3>
        <ul>
          <li>
            Icons made by{" "}
            <a
              href="https://www.flaticon.com/authors/prosymbols"
              title="Prosymbols">
              Prosymbols
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com{" "}
            </a>
          </li>
          <li>
            Icons made by{" "}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </li>
        </ul>
      </div>
      <hr />
      <div className="columns is-centered has-text-centered is-mobile">
        <div className="column is-size-3">
          <a
            href={constants.metadata.social.website}
            className="has-text-black">
            <GrPersonalComputer />
          </a>
        </div>
        <div className="column is-size-3">
          <a href={constants.metadata.social.github} className="has-text-black">
            <GrGithub />
          </a>
        </div>
        <div className="column is-size-3">
          <a
            href={constants.metadata.social.linkedin}
            className="has-text-black">
            <GrLinkedin />
          </a>
        </div>
      </div>{" "}
    </Modal>
  )
}

const ModalSignOut: React.FC<{
  isActive: boolean
  toggleActive: () => void
}> = ({ isActive, toggleActive }) => {
  const constants = useConstants()
  const authContext = useAuthContext()
  const router = useRouter()
  const auth = useAuth()

  const signOut = async () => {
    const responseBody = await auth.signOut(authContext.getAccessToken())

    if (responseBody.status.isSuccess) {
      authContext.clearAuth()
      router.replace("/")
    }
  }

  return (
    <Modal
      isActive={isActive}
      toggleActive={toggleActive}
      title={constants.header.confirmSignOut}>
      <p className="content">
        Click "Sign Out" below to sign out from dashboard.
      </p>
      <br />
      <ButtonGroup align="is-right">
        <Button
          label={constants.button.close}
          onClick={toggleActive}
          type="button"
          color="is-light"
          isInverted
          isOutlined
        />
        <Button
          label={constants.button.signOut}
          onClick={signOut}
          type="button"
          color="is-danger"
        />
      </ButtonGroup>
    </Modal>
  )
}

export default Navbar
