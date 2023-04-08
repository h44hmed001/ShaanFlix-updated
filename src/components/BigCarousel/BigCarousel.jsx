import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./BigCarousel.css";
import LazyLoad from "../LazyLoad/LazyLoad";
import CircleRating from "../CircleRating/CircleRating";
import { useLocation } from "react-router-dom";
import FallbackPic from "../../assets/bigPoster.png"

const Carousel = ({ biggestRow, data, loading, endpoint, title }) => {
  const { url } = useSelector((state) => state.home);
  const navigate=useNavigate()
  const location=useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
}, [location]);
  
  return (
    <div className="carousel">
      <div className="contentCenterer">
        {title&&<div className="title">{title}</div>}
        {!loading ? (
          <div
            className={`${
              biggestRow ? "carousel__backdrops" : "carousel__posters"
            }`}
          >
            {data?.map((movie) => {
              const posterUrl = movie.backdrop_path?
                url.backdrop + movie.backdrop_path:  FallbackPic
              return (
                <div
                  key={movie?.id}
                  onClick={()=>
                    navigate(`/${movie.media_type || endpoint }/${movie.id}`)
                  
                  }
                  className={`${
                    biggestRow ? "carouselBackdrop" : "carouselPoster"
                  }`}
                >
                  <div className="posterBlock">
                    <LazyLoad
                    
                      className={`${
                        biggestRow ? "carousel__backdrop" : "carousel__poster"
                      }`}
                      src={posterUrl }
                    />
                    {!biggestRow&&<CircleRating rating={movie?.vote_average.toFixed(1)}/>}
                  </div>
                  <div className="carousel__movieDetails">
                    <div>
                      <h3 className="title">{movie?.title || movie?.name}</h3>
                      <p className="date">
                        {dayjs(movie.release_date).format("DD MMMM, YYYY")}
                      </p>
                    </div>
                    <div className="carousel__ratingBlock">
                      {biggestRow&&<img
                        className="carousel__imdb"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                      />}
                      {biggestRow&&<span className="carousel__rating">
                        {movie.vote_average.toFixed(1)}
                      </span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loading">
            ...Loading
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;