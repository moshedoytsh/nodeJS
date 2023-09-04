import { useContext } from "react"
import { StringContext } from './TextContext'

const Child = () => {
  const context = useContext(StringContext);
  return (
    <>{context?.str}</>
  )
}

export default Child;