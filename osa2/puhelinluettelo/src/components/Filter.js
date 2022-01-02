import React from 'react'
const Filter =({_filter,setFilter})=>{
    return(
        <div>filter shown with<input
      value={_filter}
      onChange={(event)=>setFilter(event.target.value)}
      />
      </div>
    )
}
export default Filter