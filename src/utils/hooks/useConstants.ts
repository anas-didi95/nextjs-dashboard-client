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
    apiSecurity: process.env.NEXT_PUBLIC_API_SECURITY ?? "",
    refreshIntervalInMinute:
      process.env.NEXT_PUBLIC_REFRESH_INTERVAL_MINUTE ?? 20,
  }

  const header = {
    signInForm: "Sign In Form",
    confirmSignOut: "Confirm Sign Out?",
    credits: "Credits",
    welcome: "Welcome",
    securityServerStatus: "Security Server Status",
    userListing: "User Listing",
    userForm: "User Form",
    userSummary: "User Summary",
    confirmDelete: "Confirm Delete",
    userEdit: "User Edit",
    changePassword: "Change Password"
  }

  const label = {
    username: "Username",
    password: "Password",
    currentTime: "Current Time",
    url: "URL",
    status: "Status",
    responseBody: "Response Body",
    number: "No.",
    fullName: "Full Name",
    email: "Email",
    confirmPassword: "Confirm Password",
    telegramId: "Telegram Id",
    lastModifiedDate: "Last Modified Date",
    version: "Version",
    lastModifiedBy: "Last Modified By",
    permissions: "Permissions",
    oldPassword: "Old Password",
    newPassword: "New Password"
  }

  const button = {
    clear: "Clear",
    signIn: "Sign In",
    signOut: "Sign Out",
    close: "Close",
    create: "Create",
    back: "Back",
    update: "Update",
    cancel: "Cancel",
    ok: "Ok",
    delete: "Delete",
    edit: "Edit",
    changePassword: "Change Password"
  }

  const error = {
    mandatoryField: (field: string) => `${field} is a mandatory field!`,
    passwordNotMatched: "Password not matched!",
    referConsoleLogDetails: "Kindly refer console log for details.",
  }

  return { metadata, env, label, button, header, error }
}

export default useConstants
