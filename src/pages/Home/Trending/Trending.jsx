import React, { useState } from 'react'
import TabSwitching from '../../../components/TabSwitching/TabSwitching'
import useFetch from "../../../hooks/useFetch"
import BigCarousel from "../../../components/BigCarousel/BigCarousel"

const Trending = () => {
  const [endpoint,setEndpoint]=useState("day")
  const {data,loading}=useFetch(`/trending/all/${endpoint}`)

  const onTabChange = (tab) => {
    setEndpoint(tab==="Day"?"day":"week")
  }
  return (
    <div className='trending'>
        <div className='centerer'>
          <span className='trending__title'>What's Trending</span>
        <TabSwitching tabs={["Day","Week"]} onTabChange={onTabChange} />
        </div>
        <BigCarousel endpoint={"movie"} biggestRow={true} data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending
