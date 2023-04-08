import React from "react";
import CircleRating from "../CircleRating/CircleRating";
import FallbackPic from "../../assets/no-poster1.png"
import "./MovieCard.scss"
import { useSelector } from "react-redux";
import LazyLoad from "../LazyLoad/LazyLoad"
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const MovieCard = ({fromSearch,data,mediaType}) => {
    const { url } = useSelector((state) => state.home);
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : FallbackPic;
    const navigate=useNavigate()
    
  return (
    <div
      key={data?.id}
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
      className="movieCard "
    >
      <div className="posterBlock">
        <LazyLoad
          className="posterImg"
          src={posterUrl}
        />
        {!fromSearch&&<CircleRating rating={data?.vote_average.toFixed(1)} />}
        
          
        
      </div>
      <div className="textBlock">
        <div>
          <h3 className="title">{data?.title || data?.name}</h3>
          <p className="date">
            {dayjs(data.release_date).format("DD MMMM, YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
