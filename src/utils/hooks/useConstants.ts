const useConstants = () => {
  const metadata = {
    title: "Dashboard",
    description:
      "Dashboard client application developed using Next.js and TypeScript.",
  }

  const header = {
    signInForm: "Sign In Form",
  }

  const label = {
    username: "Username",
    password: "Password",
  }

  const button = {
    clear: "Clear",
    signIn: "Sign In",
    signOut: "Sign Out",
  }

  const error = {
    mandatoryField: (field: string) => `${field} is a mandatory field!`,
  }

  return { metadata, label, button, header, error }
}

export default useConstants