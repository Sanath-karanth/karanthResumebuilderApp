import React, { memo, useState, useContext, Fragment, useEffect } from "react";
import "../../css/header.css";
import { ThemeContext } from "../../contexts/themeContext";
// import ToggleButton from "../toggle";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChevronLeft,
  faCommentDots,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const HeaderScreen = memo(({ headerData }) => {
  const [{ theme }] = useContext(ThemeContext);
  const navigate = useNavigate();

  const [reviewshow, setReviewshow] = useState(false);

  const homeClick = () => {
    navigate("/dashboard");
  };

  const reviewClick = () => {
    navigate("/review");
  };

  const feedbackClick = () => {
    navigate("/feedback");
  };

  const backClick = () => {
    navigate(-1);
  };

  const reviewstoreCheck = async () => {
    let userstorevalue = localStorage.getItem("UserName");
    if (userstorevalue === "sanathorthotech") {
      setReviewshow(true);
    } else {
      setReviewshow(false);
    }
  };

  useEffect(() => {
    reviewstoreCheck();
  }, []);

  return (
    <Fragment>
      <div className="MainContainer-header">
        <div className="SubContainer-header">
          <div
            className="HeadContainer-header"
            style={{
              backgroundColor: theme.headerBgColor,
              color: theme.color,
              boxShadow: theme.shadowBottomColor,
            }}
          >
            {headerData === "about" ? (
              <Container fluid className="container-guttersforheader">
                <div className="header-Desktop">
                  <Row className="gx-0">
                    <Col
                      xs={12}
                      sm={12}
                      md={8}
                      lg={8}
                      xl={8}
                      xxl={8}
                      className="headertabsCol"
                    >
                      <div className="headertabsDesktop">
                        <div
                          className="headertabsDesktoptext"
                          onClick={backClick}
                        >
                          <FontAwesomeIcon
                            icon={faChevronLeft}
                            className="headerIconsDesktopBack"
                          />
                          <h4>Back</h4>
                        </div>
                        <div
                          className="headertabsDesktoptext"
                          onClick={homeClick}
                        >
                          <FontAwesomeIcon
                            icon={faHome}
                            className="headerIconsDesktop"
                          />
                          <h4>Home</h4>
                        </div>
                        {reviewshow && (
                          <div
                            className="headertabsDesktoptext"
                            onClick={reviewClick}
                          >
                            <FontAwesomeIcon
                              icon={faStar}
                              className="headerIconsDesktop"
                            />
                            <h4>Reviews</h4>
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={4}
                      lg={4}
                      xl={4}
                      xxl={4}
                      className="headerthemeCol"
                    >
                      <div
                        className="headertabsDesktoptext"
                        onClick={feedbackClick}
                      >
                        <FontAwesomeIcon
                          icon={faCommentDots}
                          className="headerIconsDesktop"
                        />
                        <h4>Feedback</h4>
                      </div>
                      {/* <div className="headertoggle-cont">
                        <ToggleButton
                          onChange={toggleTheme}
                          defaultChecked={isDark}
                        ></ToggleButton>
                      </div> */}
                    </Col>
                  </Row>
                </div>
                {/* -------------------  Mobile header view   ----------------- */}
                <div className="header-Mobile">
                  <Row className="gx-0">
                    <Col xs={8} sm={8} className="headerBackCol">
                      <div
                        className="headertabsMobile"
                        style={{ backgroundColor: theme.tabIconsBgColor }}
                      >
                        <div
                          className="headertabsMobileIcons"
                          onClick={backClick}
                        >
                          <FontAwesomeIcon
                            icon={faChevronLeft}
                            style={{ color: theme.tabIcons }}
                            className="headerIconsMobile"
                          />
                        </div>
                      </div>
                      <div
                        className="headertabsMobile"
                        style={{ backgroundColor: theme.tabIconsBgColor }}
                      >
                        <div
                          className="headertabsMobileIcons"
                          onClick={homeClick}
                        >
                          <FontAwesomeIcon
                            icon={faHome}
                            style={{ color: theme.tabIcons }}
                            className="headerIconsMobile"
                          />
                        </div>
                      </div>

                      <div
                        className="headertabsMobile"
                        style={{ backgroundColor: theme.tabIconsBgColor }}
                      >
                        <div
                          className="headertabsMobileIcons"
                          onClick={feedbackClick}
                        >
                          <FontAwesomeIcon
                            icon={faCommentDots}
                            style={{ color: theme.tabIcons }}
                            className="headerIconsMobile"
                          />
                        </div>
                      </div>
                      {reviewshow && (
                        <div
                          className="headertabsMobile"
                          style={{ backgroundColor: theme.tabIconsBgColor }}
                        >
                          <div
                            className="headertabsMobileIcons"
                            onClick={reviewClick}
                          >
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: theme.tabIcons }}
                              className="headerIconsMobile"
                            />
                          </div>
                        </div>
                      )}
                    </Col>
                    <Col xs={4} sm={4} className="headerthemeCol">
                      {/* <div className="headertoggle-cont">
                        <ToggleButton
                          onChange={toggleTheme}
                          defaultChecked={isDark}
                        ></ToggleButton>
                      </div> */}
                    </Col>
                  </Row>
                </div>
              </Container>
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default HeaderScreen;
