import React, {
  memo,
  useState,
  useEffect,
  useContext,
  useCallback,
  Fragment,
} from "react";
import "../css/dashboard.css";
import HeaderScreen from "../common/header";
import FooterScreen from "../common/footer";
import { ThemeContext } from "../contexts/themeContext";
import { resumeData } from "../json/json";
import { useNavigate } from "react-router-dom";
import { Loader } from "rsuite";
import { Container, Row, Col, Button } from "react-bootstrap";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faQuestionCircle,
  faCommentDots,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const DashboardScreen = memo(() => {
  const [{ theme, isDark }] = useContext(ThemeContext);
  const [SelectedVal, setSelectedVal] = useState("");
  const [idVal, setIdVal] = useState("");
  const navigate = useNavigate();
  let currentyear = moment().format("YYYY");
  const [spin, setSpin] = useState(true);
  const headertextValue = "dashboard";

  const homeClick = () => {
    navigate("/home");
  };

  const proceedClick = () => {
    navigate("../resumeform", {
      replace: false,
      state: { resumeid: idVal, resumename: SelectedVal },
    });
  };

  function resumeTabClick(evt, resumeID, resumeName) {
    setIdVal(resumeID);
    setSelectedVal(resumeName);
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("Dashboardtabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("Dashboardtablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" activetab", "");
    }
    document.getElementById(resumeID).style.display = "block";
    evt.currentTarget.className += " activetab";
    checkactive();
  }

  const checkactive = useCallback(() => {
    const cardActive = document.querySelectorAll(".Dashboardtablinks");
    for (let i = 0; i < cardActive.length; i++) {
      if (cardActive[i].classList.contains("activetab")) {
        if (isDark === false) {
          cardActive[i].style.backgroundColor = "black";
        } else {
          cardActive[i].style.backgroundColor = "white";
        }
      } else {
        cardActive[i].style.backgroundColor = "transparent";
      }
    }
  }, [isDark]);

  useEffect(() => {
    document.getElementById("defaultTabOpen").click();
    if (spin) {
      setTimeout(() => setSpin(false), 2000);
    }
  }, [spin, checkactive]);

  useEffect(() => {
    if (spin) {
      setTimeout(() => setSpin(false), 2000);
    }
  }, [spin]);

  useEffect(() => {
    var scrolltotopCont = document.querySelector(".scrolltotop");
    // scrolltotopCont.scrollIntoView({
    //   behavior: "smooth",
    // });
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  }, []);

  return (
    <Fragment>
      <div className="MainContainer-dashboard">
        <div className="SubContainer-dashboard">
          <div
            className="HeadContainer-dashboard"
            style={{
              backgroundColor: theme.backgroundColor,
              color: theme.color,
            }}
          >
            {spin ? (
              <div className="loadercont">
                <Loader
                  size="md"
                  speed="slow"
                  inverse
                  center
                  vertical={true}
                  backdrop={true}
                  content="loading..."
                />
              </div>
            ) : null}
            <HeaderScreen headerData={headertextValue} />
            <div className="scrolltotop"></div>
            <div className="MainCont-dashboard">
              <Container fluid className="container-guttersforDashboard">
                <div className="mandatoryinfotext">
                  <p>
                    <span className="asteriskkey">*</span> Please read all the{" "}
                    <b>Instructions</b> present within the Header before
                    proceed!
                  </p>
                </div>
                <Row className="gx-0">
                  <Col xs={12} sm={4} md={4} lg={3} xl={3} xxl={3}>
                    <div className="m-3">
                      <section
                        className="dashboard-card"
                        style={{ background: theme.cardLeftBorderColor }}
                      >
                        <div className="selecttext pb-3">
                          <h5>Select the Resume:</h5>
                        </div>
                        <div className="dashboard-lefttCard">
                          {resumeData.map((item, key) => {
                            return (
                              <div
                                key={key}
                                className="Dashboardtablinks mb-3"
                                id="defaultTabOpen"
                                onClick={(e) =>
                                  resumeTabClick(
                                    e,
                                    item.resumeID,
                                    item.resumeName
                                  )
                                }
                              >
                                <div
                                  className="leftCardBorder"
                                  style={{
                                    background: theme.cardLeftBorderColor,
                                  }}
                                >
                                  <img
                                    src={item.resumeImg}
                                    alt={item.resumeName}
                                  ></img>
                                  <div className="resumecardNameText">
                                    <p>{item.resumeName}</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="db-Proceedbutton d-grid pt-1">
                          <Button
                            variant={theme.buttonColor}
                            size="md"
                            onClick={proceedClick}
                          >
                            PROCEED
                          </Button>
                        </div>
                      </section>
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={8} lg={9} xl={9} xxl={9}>
                    <div className="m-3">
                      <section
                        className="dashboard-card"
                        style={{ background: theme.cardColor }}
                      >
                        <div className="dashboard-rightCard">
                          {resumeData.map((item, key) => {
                            return (
                              <div
                                key={key}
                                id={item.resumeID}
                                className="Dashboardtabcontent"
                              >
                                <img
                                  src={item.resumeImg}
                                  alt={item.resumeName}
                                  width="100%"
                                  height="auto"
                                ></img>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            <FooterScreen />
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default DashboardScreen;
