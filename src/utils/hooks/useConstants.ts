const useConstants = () => {
  const metadata = {
    title: "Dashboard",
    description:
      "Dashboard client application developed using Next.js and TypeScript.",
    social: {
      website: "https://anasdidi.dev",
      github: "https://github.com/anas-didi95/nextjs-dashboard-client",
      linkedin: "https://www.linkedin.com/in/anas-juwaidi-mohd-jeffry",
    },
  }

  const env = {
    apiSecurity: process.env.NEXT_PUBLIC_API_SECURITY,
  }

  const header = {
    signInForm: "Sign In Form",
    confirmSignOut: "Confirm Sign Out?",
    credits: "Credits",
    welcome: "Welcome",
    securityServerStatus: "Security Server Status",
  }

  const label = {
    username: "Username",
    password: "Password",
    currentTime: "Current Time",
    url: "URL",
    status: "Status",
    responseBody: "Response Body",
  }

  const button = {
    clear: "Clear",
    signIn: "Sign In",
    signOut: "Sign Out",
    close: "Close",
  }

  const error = {
    mandatoryField: (field: string) => `${field} is a mandatory field!`,
  }

  return { metadata, env, label, button, header, error }
}

export default useConstants
