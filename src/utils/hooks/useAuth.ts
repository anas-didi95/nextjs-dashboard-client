const useAuth = () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_SECURITY}/api/jwt`

  const signIn = async (username: string, password: string): Promise<{ status: { isSuccess: boolean }, data: { accessToken: string } }> => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      const responseBody = await response.json()

      return responseBody
    } catch (e) {
      console.error(e)
    }
  }

  return { signIn }
}

export default useAuth
