import React from 'react'
import { VscChromeClose } from "react-icons/vsc";

const Search = ({setShowSearch, queryHandler,setQuery}) => {
  return (
    <div className='navBar__searchContainer'>
      <input onChange={(e)=>setQuery(e.target.value)} onKeyUp={queryHandler} className='navBar__search' type='text' placeholder='Search'/>
      <VscChromeClose onClick={()=>setShowSearch(false)} className='navBar__inputButton' />
    </div>
  )
}

export default Search
