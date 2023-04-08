import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineSearch } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import Search from '../Search/Search';
import logo from "./shaanflix.png"
import ContentCenterer from '../ContentCenterer/ContentCenterer';

const Navbar = () => {
  const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const [movieSelected,setMovieSelected]=useState(false)
    const [showSelected,setShowSelected]=useState(false)
    const handleNavigation=(type)=>{
      if(type=="movie"){
        navigate("/explore/movie")
        setMovieSelected(true)
        setShowSelected(false)
      }
      else if(type=="shows"){
        navigate("/explore/tv")
        setShowSelected(true)
        setMovieSelected(false)
      }
    }
    const queryHandler=(event)=>{
      if(event.key=="Enter"){
        navigate(`/search/${query}`)
        setTimeout(setShowSearch(false),2000)
      }
    }
    const logoNavigation=()=>{
      navigate("/")
      setMovieSelected(false)
      setShowSelected(false)
    }
  return (
    <>
    <div className={`navBar `}>
      <img className='navBar__logo' onClick={logoNavigation} src={logo} alt=""/>
      <div className='navBar__buttons'>
        <p className={`navBar__widgets ${movieSelected && "navBar__widgetsSelected" }`} onClick={()=>handleNavigation("movie")} >Movies</p>
        <p className={`navBar__widgets ${showSelected && "navBar__widgetsSelected" }`} onClick={()=>handleNavigation("shows")} >TV Shows</p>
        <p className={`navBar__widgets ${showSearch && "navBar__searchHidden" } `} onClick={()=>setShowSearch(true)} ><HiOutlineSearch/></p>
        {showSearch && <p className='navBar__widgetsClosing' style={{"color":"white"}} onClick={()=>setShowSearch(false)} ><HiOutlineSearch/></p>}
      </div>
    </div>
    {showSearch && <Search setShowSearch={setShowSearch} queryHandler={queryHandler} setQuery={setQuery} />}
    </>
  )
}

export default Navbar
