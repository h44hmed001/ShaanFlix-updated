import React, { useState } from 'react'
import TabSwitching from '../../../components/TabSwitching/TabSwitching'
import useFetch from "../../../hooks/useFetch"
import Carousel from '../../../components/Carousel/Carousel'

const TopRated = () => {
  const [endpoint,setEndpoint]=useState("movie")
  const {data,loading}=useFetch(`/${endpoint}/top_rated`)
  
  const onTabChange = (tab) => {
    setEndpoint(tab==="Movie"?"movie":"tv")
  }
  return (
    <div className='trending'>
        <div className='centerer'>
          <span className='trending__title'>Top Rated</span>
        <TabSwitching tabs={["Movie","Shows"]} onTabChange={onTabChange} />
        </div>
        <Carousel endpoint={endpoint} biggestRow={false} data={data?.results} loading={loading} />
    </div>
  )
}

export default TopRated