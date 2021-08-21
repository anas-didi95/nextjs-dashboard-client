import React, { useState } from "react"
import { useRouter } from "next/dist/client/router"
import Image from "next/image"
import Link from "next/link"
import { GrGithub, GrLinkedin, GrPersonalComputer } from "react-icons/gr"
import { useAuthContext } from "../utils/contexts/AuthContext"
import { useLoadingContext } from "../utils/contexts/LoadingContext"
import { useNotificationContext } from "../utils/contexts/NotificationContext"
import useConstants from "../utils/hooks/useConstants"
import useSecurityService from "../utils/hooks/useSecurityService"
import Button from "./Button"
import ButtonGroup from "./ButtonGroup"
import Modal from "./Modal"
import { TResponseError } from "../utils/types"

interface INavbar {}
const Navbar: React.FC<INavbar> = () => {
  const [isActive, setActive] = useState<boolean>(false)
  const [isCredits, setCredits] = useState<boolean>(false)
  const [isSignOut, setSignOut] = useState<boolean>(false)

  const toggleActive = () => setActive((prev) => !prev)
  const toggleCredits = () => setCredits((prev) => !prev)
  const toggleSignOut = () => setSignOut((prev) => !prev)

  return (
    <>
      <nav
        className="navbar is-info is-spaced"
        role="navigation"
        aria-label="main navigation">
        <NavbarBrand isActive={isActive} toggleActive={toggleActive} />
        <NavbarMenu
          isActive={isActive}
          toggleCredits={toggleCredits}
          toggleSignOut={toggleSignOut}
        />
      </nav>
      <ModalCredits isActive={isCredits} toggleActive={toggleCredits} />
      <ModalSignOut isActive={isSignOut} toggleActive={toggleSignOut} />
    </>
  )
}

const NavbarBrand: React.FC<{ isActive: boolean; toggleActive: () => void }> =
  ({ isActive, toggleActive }) => {
    const constants = useConstants()

    return (
      <div className="navbar-brand">
        <Link href="/dashboard">
          <a className="navbar-item">
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
  toggleCredits: () => void
  toggleSignOut: () => void
}> = ({ isActive, toggleCredits, toggleSignOut }) => {
  const constants = useConstants()
  const authContext = useAuthContext()

  return (
    <>
      <div
        className={`navbar-menu ${
          isActive
            ? "is-active animate__animated animate__slideInDown animate__faster"
            : ""
        }`}>
        {authContext.isAuth() && (
          <div className="navbar-start">
            <Link href="/dashboard">
              <a className="navbar-item" data-testid="navbar-menu-home">
                Home
              </a>
            </Link>
          </div>
        )}
        <div className="navbar-end">
          <div className="navbar-item">
            <ButtonGroup>
              <Button
                label={constants.button.credits}
                onClick={toggleCredits}
                type="button"
                color="is-light"
                isOutlined
                testId="navbar-button-credits"
              />
              {authContext.isAuth() && (
                <Button
                  label={constants.button.signOut}
                  onClick={toggleSignOut}
                  type="button"
                  color="is-danger"
                  testId="navbar-button-signout"
                />
              )}
            </ButtonGroup>
          </div>
        </div>
      </div>
    </>
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
      toggleActive={toggleActive}
      testId="navbar-modal-credits">
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
              www.flaticon.com
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
  const router = useRouter()
  const authContext = useAuthContext()
  const notificationContext = useNotificationContext()
  const loadingContext = useLoadingContext()
  const securityService = useSecurityService()

  const onSignOut = () => {
    loadingContext.run(async () => {
      const responseBody = await securityService.signOut()
      if ("userId" in responseBody) {
        authContext.clear()
        router.replace("/")
      } else {
        notificationContext.setError(responseBody as TResponseError)
      }
    })
  }

  return (
    <Modal
      isActive={isActive}
      toggleActive={toggleActive}
      title={constants.header.confirmSignOut}>
      <p className="content has-text-black">
        Click &quot;Sign Out&quot; below to sign out from dashboard.
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
          onClick={onSignOut}
          type="button"
          color="is-danger"
        />
      </ButtonGroup>
    </Modal>
  )
}

export default Navbar
