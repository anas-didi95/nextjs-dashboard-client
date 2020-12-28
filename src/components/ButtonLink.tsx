import Link from "next/link"
import React, { useContext } from "react"
import LoadingContext from "../utils/contexts/LoadingContext"

interface IButtonLink {
  href: string
  label: string
  color?: "is-success" | "is-primary"
}
const ButtonLink: React.FC<IButtonLink> = ({ href, label, color }) => {
  const loadingContext = useContext(LoadingContext)

  return (
    <Link href={href}>
      <a
        href={href}
        className={`button ${!!color ? color : ""} ${loadingContext.isLoading() ? "is-loading" : ""
          }`}>
        {label}
      </a>
    </Link>
  )
}

export default ButtonLink
