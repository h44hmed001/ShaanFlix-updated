import React, { useEffect, useState } from 'react'
import "./SearchResult.css"
import useFetch from "../../hooks/useFetch"
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../utils/api'
import { Triangle } from  'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieCard from '../../components/MovieCard/MovieCard'



const SearchResult = () => {
  const [data,setData]=useState(null)
  const [pageNum,setPageNum]=useState(1)
  const [loading,setLoading]=useState(false)
  const {query}=useParams()
  const fetchInitialData=()=>{
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
      setData(res)
      setLoading(false)
    })
  }
  

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
        (res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        }
    );
};
  useEffect(()=>{
    fetchInitialData()
    setPageNum(1)
  },[query])
  
  return (
    <div className='searchResult'>
        {loading&&<div className='loader'>
        <Triangle
    height = "300"
    width = "120"
    radius = "9"
    color = 'red'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
  /></div>
  }
  {!loading&&
  <div className='inTheMid'>

    {data?.results?.length>0?
    <>
    <div className='pageTitle'>

      {`Search ${data?.total_results>1?"Results":"Result"} for '${query[0].toUpperCase()+query.slice(1,query.length)}'`}

    </div>
    <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<div className='triangle'><Triangle color='red' /></div>}
                            >
                                {data?.results.map((item, index) => {
                                    
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
    </>

    :<span className='resultNotFound'>Sorry, No Results Found</span>
    
  }

  </div>
  }
    </div>
  )
}

export default SearchResult
