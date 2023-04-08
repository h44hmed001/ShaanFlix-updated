import React from "react";
import "./ContentCenterer.css"
const ContentCenterer = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};
export default ContentCenterer;