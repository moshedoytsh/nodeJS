import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"
import './Card.css'

const Card = () => {
  const context = useContext(ThemeContext);
  return (
    <div className={`${context?.theme} card`}>
    <h3>The Title</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ex
      luctus, pharetra lectus sit amet, cursus ipsum. Etiam volutpat massa vel
      diam rutrum, quis suscipit arcu imperdiet. Sed condimentum commodo massa,
      vel rhoncus velit cursus eget. Nullam tempor ullamcorper rutrum. Sed
      vulputate tempor nulla et placerat. Maecenas ullamcorper pulvinar eros,
      et consequat quam consectetur in.
    </p>
    </div>
  )
}

export default Card;