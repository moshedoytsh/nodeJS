import { useContext, useState } from "react";
import { useUser } from "./UserContext"
import { ThemeContext } from "./ThemeContext";

const Main = () => {
  const {user} = useUser();
  const contextTheme = useContext(ThemeContext)
  const [viewMore, setViewMore] = useState(false);

  if (!user) return (
    <p>Cannot get user information</p>
  )

  return (
    <div className={`${contextTheme?.theme} card`}>
      <h3>{user.name}</h3>
      {viewMore ? <p>
        username: {user.username} <br />
        Email: {user.email} <br />
        Phone: {user.phone} <br />
        Website: {user.website} <br />
      </p>: null}
      <button onClick={() => setViewMore(prev => !prev)}>{viewMore ? 'Hide' : 'View'} More Properties</button>
    </div>
  )
}

export default Main;