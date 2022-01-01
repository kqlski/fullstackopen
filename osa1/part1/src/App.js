import React, { useState } from 'react'
const App = (props) => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={()=>setCounter(counter+1)}>
        hello team
      </button>
    </div>
  )
}
export default App