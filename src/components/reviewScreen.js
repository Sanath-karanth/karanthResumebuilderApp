import React, { memo, Fragment } from "react";
import "../css/review.css";
import HeaderScreen from "../common/header/reviewheader";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

const ReviewScreen = () => {
  const headertextValue = "review";
  return (
    <Fragment>
      <div className="MainContainer-review">
        <div className="SubContainer-review">
          <div
            className="HeadContainer-review"
            style={{
              background: "linear-gradient(#757F9A, #D7DDE8)",
            }}
          >
            <HeaderScreen headerData={headertextValue} />
            <div className="review-cont">
              <h2>Reviews</h2>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(ReviewScreen);
