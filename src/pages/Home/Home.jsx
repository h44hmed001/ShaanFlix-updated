import React from 'react'
import "./Home.css"
import ContentCenterer from '../../components/ContentCenterer/ContentCenterer';
import Trending from './Trending/Trending';
import Popular from './Popular/Popular';
import TopRated from './TopRated/TopRated';
import UpComing from './UpComing/UpComing';


const Home = () => {
  return (
    
    <div className='home'>
      <Trending/>
      <Popular/>
      <TopRated/>
      <UpComing/>
      
      
    </div>

  )
}

export default Home
