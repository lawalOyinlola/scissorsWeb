// import React, { useState } from "react";
import Triangle from "../images/triangle-vector.svg";
import "../css/modal.css";
// import { Triangle } from "@phosphor-icons/react";

interface DetailsProps {
  isOpen: boolean;
  closeUrl: () => void;
  url: string;
  shortUrl: string;
}

const UrlDetails: React.FC<DetailsProps> = ({
  isOpen,
  closeUrl,
  url,
  shortUrl,
}) => {
  return (
    <div className={isOpen ? "overlay" : "overlay hidden"}>
      <div className="modal">
        <img src={Triangle} alt="" />
        <p>{url}</p>
        <p className="short-url">{shortUrl}</p>
        <a onClick={closeUrl}>Close</a>
      </div>
    </div>
  );
};

export default UrlDetails;
