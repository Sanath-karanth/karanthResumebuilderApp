import React, { memo, Fragment } from "react";
import "../css/about.css";
import HeaderScreen from "../common/header";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

const AboutScreen = () => {
  const headertextValue = "about";
  return (
    <Fragment>
      <div className="MainContainer-about">
        <div className="SubContainer-about">
          <div
            className="HeadContainer-about"
            style={{
              background: "linear-gradient(#757F9A, #D7DDE8)",
            }}
          >
            <HeaderScreen headerData={headertextValue} />
            <div className="about-cont">
              <Row className="gx-0">
                <Col
                  xs={12}
                  sm={12}
                  md={2}
                  lg={2}
                  xl={2}
                  className="abt-blank-col"
                ></Col>
                <Col
                  xs={12}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  className="abt-profile-col"
                >
                  <div className="abt-card-cont">
                    <div className="abt-card-left">
                      <div className="abt-img-cont">
                        <div className="abt-img-round">
                          <img
                            src="./images/Sanath8.jpg"
                            alt="my profile"
                            className="abt-profile"
                          ></img>
                        </div>
                      </div>
                      <div className="abt-text-cont">
                        <h3>Sanath S Karanth</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the
                        </p>
                        <div className="abt-social-icon-cont">
                          <span className="socialicon-cont">
                            <div className="icon-cont">
                              <a
                                href="http://www.gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="fa fa-google-plus socialicon"></i>
                              </a>
                            </div>
                          </span>
                          <span className="socialicon-cont">
                            <div className="icon-cont">
                              <a
                                href="https://www.facebook.com/sanaths.karanth/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="fa fa-facebook socialicon"></i>
                              </a>
                            </div>
                          </span>
                          <span className="socialicon-cont">
                            <div className="icon-cont">
                              <a
                                href="https://www.linkedin.com/in/sanath-s-karanth-758bbb176"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="fa fa-linkedin-square socialicon"></i>
                              </a>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="abt-card-right">
                      <div className="abt-curvecard">
                        <div className="abt-info">
                          <FontAwesomeIcon
                            icon={faBriefcase}
                            className="infoicon"
                          />
                          <h4>Software Engineer</h4>
                        </div>
                        <div className="abt-info">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="infoicon"
                          />
                          <h4>sanathsk97@gmail.com</h4>
                        </div>
                        <div className="abt-info">
                          <FontAwesomeIcon
                            icon={faPhone}
                            className="infoicon"
                          />
                          <h4>+91 9449685219</h4>
                        </div>
                        <div className="abt-info">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="infoicon"
                          />
                          <h4>Shivamogga</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={2}
                  lg={2}
                  xl={2}
                  className="abt-blank-col"
                ></Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(AboutScreen);
