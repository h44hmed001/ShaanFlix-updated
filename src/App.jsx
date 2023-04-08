import Home from "./pages/Home/Home"
import Navbar from "./components/Navbar/Navbar"
import { fetchDataFromApi } from "./utils/api"
import {useEffect} from "react"
import {useSelector,useDispatch} from 'react-redux'
import { getApiConfiguration } from "./store/homeSlice"
import { BrowserRouter,Routes, Route } from "react-router-dom"
import SearchResult from "./pages/searchResult/SearchResult"
import Explore from "./pages/explore/Explore"
import Details from "./pages/details/Details"
import PageNotFound from "./pages/404/PageNotFound"
import Footer from "./components/Footer/Footer"
function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    apiTesting()
  },[])
  const apiTesting=()=>{
    fetchDataFromApi("/configuration").then((res)=>{
     
      const imageUrls={
        backdrop:res.images.secure_base_url+"original",
        poster:res.images.secure_base_url+"original",
        profile:res.images.secure_base_url+"original",
      }
      dispatch(getApiConfiguration(imageUrls)) })
  }
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<><Navbar/><Home/></>} />
      <Route path="/search/:query" element={<><Navbar/><SearchResult/></>} />
      <Route path="/explore/:mediaType" element={<><Navbar/><Explore/></>} />
      <Route path="/:mediaType/:id" element={<><Navbar/><Details/></>} />
      <Route path="*" element={<><Navbar/><PageNotFound/></>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
