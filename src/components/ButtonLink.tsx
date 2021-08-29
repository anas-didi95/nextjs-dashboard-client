import Link from "next/link"
import React from "react"
import { useLoadingContext } from "../utils/contexts/LoadingContext"

interface IButtonLink {
  href: string
  label: string
  color?: "is-success" | "is-primary" | "is-danger"
}
const ButtonLink: React.FC<IButtonLink> = ({ href, label, color }) => {
  const loadingContext = useLoadingContext()

  return (
    <Link href={href}>
      <a
        className={`button ${!!color ? color : ""} ${
          loadingContext.isLoading() ? "is-loading" : ""
        }`}>
        {label}
      </a>
    </Link>
  )
}

export default ButtonLink
