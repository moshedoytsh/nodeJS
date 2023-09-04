import { useUser } from "./UserContext"
import ThemeSwitcher from "./ThemeSwitcher";
import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";
import './Header.css'

const Header = () => {
  const userContext = useUser();
  const context = useContext(ThemeContext)
  return (
    <div className={`${context?.theme}-header header`}>
      <span>
      {userContext.user?.username}
      </span>
      <ThemeSwitcher/>
    </div>
  )
}

export default Header;