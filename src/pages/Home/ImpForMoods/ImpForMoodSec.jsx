import React, { useState } from 'react'
import TabSwitching from '../../../components/TabSwitching/TabSwitching'
import useFetch from "../../../hooks/useFetch"
import Carousel from '../../../components/Carousel/Carousel'

const Horror = () => {
  const [endpoint,setEndpoint]=useState("movie")
  const {data,loading}=useFetch(`/search/${endpoint}?query=comedy&page=1&include_adult=false`)
  const onTabChange = (tab) => {
    setEndpoint(tab==="Movie"?"movie":"tv")
  }

  return (
    <div className='trending'>
        <div className='centerer'>
          <span className='trending__title'>Horror</span>
          <TabSwitching onTabChange={onTabChange} tabs={["Movies","Shows"]} />
        </div>
        <Carousel biggestRow={false} data={data?.results} loading={loading} />
    </div>
  )
}

export default Horror