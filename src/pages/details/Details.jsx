import React from 'react'
import DetailsBanner from './DetailsBanner/DetailsBanner'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Cast from "./Cast/Cast"
import Videos from './Videos/Videos'
import Similar from './Carousels/Similar'
import Recommended from './Carousels/Recommeded'

const Details = () => {
  const {mediaType,id}=useParams()
  const {data,loading}=useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits,loading:creditsLoading}=useFetch(`/${mediaType}/${id}/credits`)
  return (
    <div>
        <DetailsBanner crew={credits?.crew} video={data?.results?.[0]}  />
        <Cast data={credits?.cast} loading={creditsLoading} />
        <Videos videos={data} loading={loading}/>
        <Similar mediaType={mediaType} id={id} />
        <Recommended mediaType={mediaType} id={id}/>
      
    </div>
  )
}

export default Details
