import React, { memo, Fragment, useContext } from "react";
import "../css/about.css";
import { ThemeContext } from "../contexts/themeContext";
import HeaderScreen from "../common/header/aboutheader";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

const AboutScreen = memo(() => {
  const headertextValue = "about";
  const [{ theme }] = useContext(ThemeContext);
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
                          Passionate about web design and development who works
                          as a techie in a professional service-oriented firm
                          with a few years of experience.
                        </p>
                        <div className="abt-social-icon-cont">
                          <div className="socialicon-cont">
                            <a
                              href="http://www.gmail.com"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i
                                className="fa fa-google-plus socialicon-abt"
                                style={{ color: theme.footerSocialIconcolor }}
                              ></i>
                            </a>
                          </div>
                          <div className="socialicon-cont">
                            <a
                              href="https://www.facebook.com/sanaths.karanth/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i
                                className="fa fa-facebook socialicon-abt"
                                style={{ color: theme.footerSocialIconcolor }}
                              ></i>
                            </a>
                          </div>
                          <div className="socialicon-cont">
                            <a
                              href="https://www.linkedin.com/in/sanath-s-karanth-758bbb176"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i
                                className="fa fa-linkedin-square socialicon-abt"
                                style={{ color: theme.footerSocialIconcolor }}
                              ></i>
                            </a>
                          </div>
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
});

export default memo(AboutScreen);
