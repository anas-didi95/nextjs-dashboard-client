const useConstants = () => {
  const metadata = {
    title: "Dashboard",
    description:
      "Dashboard client application developed using Next.js and TypeScript",
    social: {
      website: "https://anasdidi.dev",
      github: "https://github.com/anas-didi95/nextjs-dashboard-client",
      linkedin: "https://www.linkedin.com/in/anas-juwaidi-mohd-jeffry",
    },
  }

  const env = {
    apiSecurity: process.env.NEXT_PUBLIC_API_SECURITY ?? "",
  }

  const header = {
    signInForm: "Sign In Form",
    confirmSignOut: "Confirm Sign Out?",
    credits: "Credits",
    welcome: "Welcome",
    serverStatus: "Server Status",
    userListing: "User Listing",
    userForm: "User Form",
    userSummary: "User Summary",
    confirmDelete: "Confirm Delete",
    userEdit: "User Edit",
    changePassword: "Change Password",
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
    newPassword: "New Password",
    sessionStartedAt: "Session started at",
    server: "Server",
  }

  const button = {
    credits: "Credits",
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
    changePassword: "Change Password",
  }

  const message = {
    mandatoryField: (field: string) => `${field} is a mandatory field!`,
    passwordNotMatched: "Password not matched!",
    referConsoleLogDetails: "Kindly refer console log for details.",
    passwordCannotSimilar: "New Password cannot similar to Old Password!",
    noRecordFound: "No record found",
  }

  return { metadata, env, label, button, header, message }
}

export default useConstants
