import React from 'react'
const Filter =({_filter,setFilter})=>{
    return(
        <div>find countries<input
      value={_filter}
      onChange={(event)=>setFilter(event.target.value)}
      />
      </div>
    )
}
export default Filter