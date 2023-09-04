import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"


const ThemeSwitcher = () => {
  const context = useContext(ThemeContext)
  return (
    <button onClick={() => context?.setTheme(context.theme === 'dark' ? "light" : "dark")}>
      {context?.theme === "dark" ? "Light" : "Dark"} Theme
    </button>
  )
}

export default ThemeSwitcher;