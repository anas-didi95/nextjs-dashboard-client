const useLocalStorage = () => {
  const set = (key: TKey, value: string) =>
    window.localStorage.setItem(key, value)
  const get = (key: TKey) => window.localStorage.getItem(key) ?? ""
  const clear = () => window.localStorage.clear()
  return { set, get, clear }
}

export default useLocalStorage

type TKey = "refreshToken"
