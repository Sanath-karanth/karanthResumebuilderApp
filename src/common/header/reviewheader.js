import React, { memo, useContext, Fragment } from "react";
import "../../css/header.css";
import { ThemeContext } from "../../contexts/themeContext";
import ToggleButton from "../toggle";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const HeaderScreen = memo(({ headerData }) => {
  const [{ theme }, toggleTheme] = useContext(ThemeContext);
  const navigate = useNavigate();

  const homeClick = () => {
    navigate("/dashboard");
  };

  const backClick = (event) => {
    navigate(-1);
  };

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
            {headerData === "review" ? (
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
                      <div className="headertoggle-cont">
                        <ToggleButton onChange={toggleTheme}></ToggleButton>
                      </div>
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
                    </Col>
                    <Col xs={4} sm={4} className="headerthemeCol">
                      <div className="headertoggle-cont">
                        <ToggleButton onChange={toggleTheme}></ToggleButton>
                      </div>
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
