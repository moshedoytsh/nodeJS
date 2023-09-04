import { useContext, useRef } from "react"
import { StringContext } from './TextContext'
import Child from "./Child";

const Father = () => {
  const context = useContext(StringContext);
  if(!context) throw new Error("khffewspfk")
  
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
    <div style={{padding: '2px', margin: '4px'}}>
      <input type="text" ref={inputRef} />
      <button onClick={() => context?.setStr(inputRef.current?.value || '')}>Update</button>
    </div>
    <div style={{padding: '2px', margin: '4px'}}>
      <Child/>
    </div>
    </>
  )
}

export default Father;