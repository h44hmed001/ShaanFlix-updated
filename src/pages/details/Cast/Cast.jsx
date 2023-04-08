import React from "react";
import { useSelector } from "react-redux";

import "./Cast.scss";
import LazyLoad from "../../../components/LazyLoad/LazyLoad"
import Avatar from "../../../assets/avatar1.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);


    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <div className="contentMid">
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((cast)=>{
                            const image=cast.profile_path? url.profile+cast?.profile_path:Avatar
                            return(
                            <div key={cast.id} className="listItem">
                                <div className="profileImg">
                                    <LazyLoad src={image}/>
                                </div>
                                <div className="name">{cast?.name}</div>
                                <div className="character">{cast?.character}</div>
                            </div>)
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
                </div>
            
        </div>
    );
};
export default Cast;