import React, { useState } from 'react'
import TabSwitching from '../../../components/TabSwitching/TabSwitching'
import useFetch from "../../../hooks/useFetch"
import Carousel from '../../../components/Carousel/Carousel'

const UpComing = () => {
  const [endpoint,setEndpoint]=useState("movie")
  const {data,loading}=useFetch(`/${endpoint}/upcoming`)

  
  const onTabChange = (tab) => {
    setEndpoint(tab==="Movie"?"movie":"tv")
  }
  return (
    <div className='trending'>
        <div className='centerer'>
          <span className='trending__title'>Up Coming</span>
        </div>
        <Carousel endpoint={endpoint} biggestRow={false} data={data?.results} loading={loading} />
    </div>
  )
}

export default UpComing