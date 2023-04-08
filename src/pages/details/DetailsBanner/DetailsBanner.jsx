import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./DetailsBanner.scss";
import useFetch from "../../../hooks/useFetch";

import CircleRating from "../../../components/circleRating/CircleRating";
import LazyLoad from "../../../components/LazyLoad/LazyLoad";
import PosterFallback from "../../../assets/no-poster.png";
import { fetchDataFromApi } from "../../../utils/api";
import { PlayIcon } from "../PlayIcon";
import VideoPopup from "../../../components/VideoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const director=crew?.filter((dir)=>dir.job==="Director")
  const writer=crew?.filter((wri)=>wri.job==="Writer"||wri.job==="Screenplay"||wri.job==="Story")
  
  
  const [show, setShow]=useState(false)

  const[videoId, setVideoId]=useState(null)
  
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {data && (
            <>
              <div className="contentMiddler">
                <div className="banner__content">
                  <div className="banner__contentLeft">
                    {data.poster_path ? (
                      <LazyLoad
                        className="posterImg"
                        src={url.poster + data.poster_path}
                      />
                    ) : (
                      <LazyLoad className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="banner__contentRight">
                    <div className="banner__contentRightTitle">
                      <h4>{`${data.title || data.name} (${dayjs(
                        data.release_date
                      ).format("YYYY")})`}</h4>
                    </div>
                    <div className="genres">
                      {data.genres.map((genre)=>
                      <div key={genre.id} className="genre">{genre.name}</div>
                      )}
                    </div>
                    <div className="banner__contentRightSubtitle">
                      {data.tagline}
                    </div>
                    <div className="banner__contentRightRow">
                      <div className="ratingSection">
                        <img
                          className="detailsBanner__imdb"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                        />
                        <span className="rating">
                          {data.vote_average.toFixed(1)}
                        </span>
                      </div>
                      <div onClick={()=>{
                        setShow(true)
                        setVideoId(video.key)
                      }} className="banner__contentRightPlay">
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data.status&&(
                        <div className="infoItem">
                          <span className="text bold">
                            Status:{" "}
                            
                          </span>
                          <span className="text">
                            {data.status}

                          </span>
                        </div>
                      )}
                      {data.release_date&&(
                        <div className="infoItem">
                          <span className="text bold">
                            Release Date:{" "}
                            
                          </span>
                          <span className="text">
                            {dayjs(data.release_date).format("DD MMMM, YYYY")}

                          </span>
                        </div>
                      )}
                      {data.runtime&&(
                        <div className="infoItem">
                          <span className="text bold">
                            Runtime:{" "}
                            
                          </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}

                          </span>
                        </div>
                      )}
                    </div>
                    {mediaType=="movie"&&
                      director?.length>0&&
                      (
                        <div className="info">
                          <span className="text bold">Directors:{" "}</span>
                          {director.map((dir,ind)=>(
                            <span className="text" key={ind}>
                              {dir.name}
                              {director?.length-1===ind?"":", "}


                            </span>
                          ))
                          }
                          
                        </div>
                      )
                      }
                    {mediaType=="movie"&&
                      writer?.length>0&&
                      (
                        <div className="info">
                          <span className="text bold">Writers:{" "}</span>
                          {director?.map((wri,ind)=>(
                            <span className="text" key={ind}>
                              {wri.name}
                              {director?.length-1===ind?"":", "}


                            </span>
                          ))
                          }
                          
                        </div>
                      )
                      }
                    {mediaType==="tv"&&
                      data?.created_by?.length>0&&
                      (
                        <div className="info">
                          <span className="text bold">Created By:{" "}</span>
                          {data?.created_by?.map((wri,ind)=>(
                            <span className="text" key={ind}>
                              {wri.name}
                              {data?.created_by?.length-1===ind?"":", "}

                            </span>
                          ))
                          }
                          
                        </div>
                      )
                      }
                    
                  </div>
                </div>
                <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>

              </div>

            </>
          )}
        </>
      ) : (
        <p>Loading.....</p>
      )}
    </div>
  );
};

export default DetailsBanner;
