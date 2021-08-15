import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import useConstants from "../utils/hooks/useConstants"
import Button from "./Button"
import ButtonGroup from "./ButtonGroup"
import Modal from "./Modal"
import { GrPersonalComputer, GrGithub, GrLinkedin } from "react-icons/gr"

interface INavbar {}
const Navbar: React.FC<INavbar> = () => {
  const [isActive, setActive] = useState<boolean>(false)

  const toggleActive = () => setActive((prev) => !prev)

  return (
    <nav
      className="navbar is-info is-spaced"
      role="navigation"
      aria-label="main navigation">
      <NavbarBrand isActive={isActive} toggleActive={toggleActive} />
      <NavbarMenu isActive={isActive} />
    </nav>
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

const NavbarMenu: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const constants = useConstants()
  const [isCredits, setCredits] = useState<boolean>(false)

  const toggleCredits = () => setCredits((prev) => !prev)

  return (
    <>
      <div
        className={`navbar-menu ${
          isActive
            ? "is-active animate__animated animate__slideInDown animate__faster"
            : ""
        }`}>
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
            </ButtonGroup>
          </div>
        </div>
      </div>
      <ModalCredits isActive={isCredits} toggleActive={toggleCredits} />
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

export default Navbar
