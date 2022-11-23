import React, {
  memo,
  useState,
  useEffect,
  useContext,
  useCallback,
  Fragment,
} from "react";
import "../css/resumeform.scss";
import { Loader } from "rsuite";
import HeaderScreen from "../common/header/resumeheader";
import FooterScreen from "../common/footer";
import { ThemeContext } from "../contexts/themeContext";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import FresherFormScreen from "./fresherFormScreen";
import ExperienceFormScreen from "./experienceFormScreen";

const ResumeFormScreen = memo(() => {
  const [{ theme }] = useContext(ThemeContext);
  const { state } = useLocation();
  const { resumeid, resumename } = state;
  const headertextValue = "resumeform";
  const [spin, setSpin] = useState(true);
  const [fresherVal, setFresherVal] = useState(true);
  const [expVal, setExpVal] = useState(false);

  const fresherClick = () => {
    setFresherVal(true);
    setExpVal(false);
  };

  const experienceClick = () => {
    setFresherVal(false);
    setExpVal(true);
  };

  //  --------------   Custom Tabs function   ------------- //

  const tabsAction = useCallback(() => {
    let getFresherColor = document.querySelector(".rf-freshertxt");
    let getExpColor = document.querySelector(".rf-exptxt");
    var glider = document.querySelector(".tabglider");

    if (fresherVal === true) {
      glider.style.transform = "translateX(0%)";
      getFresherColor.style.color = "#185ee0";
    } else {
      getFresherColor.style.color = "black";
    }

    if (expVal === true) {
      glider.style.transform = "translateX(100%)";
      getExpColor.style.color = "#185ee0";
    } else {
      getExpColor.style.color = "black";
    }
  }, [fresherVal, expVal]);

  useEffect(() => {
    tabsAction();
    // var scrolltotopCont = document.querySelector(".scrolltotopForm");
    // scrolltotopCont.scrollIntoView({
    //   behavior: "smooth",
    // });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [tabsAction]);

  useEffect(() => {
    if (spin) {
      setTimeout(() => setSpin(false), 2000);
    }
  }, [spin]);

  //  ------------------  Closes -------------

  return (
    <Fragment>
      <div className="MainContainer-resumeform">
        <div className="SubContainer-resumeform">
          <div
            className="HeadContainer-resumeform"
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
            <div className="scrolltotopForm"></div>
            <div className="MainCont-resumeform">
              <div className="rf-Tabs">
                <div className="rf-Tabstxt">
                  <span className="rf-freshertxt" onClick={fresherClick}>
                    <h2>Fresher</h2>
                  </span>
                  <span className="rf-exptxt" onClick={experienceClick}>
                    <h2>Experience</h2>
                  </span>
                  <span className="tabglider"></span>
                </div>
              </div>

              <Container className="container-guttersforResumeform">
                {fresherVal === true ? (
                  <FresherFormScreen
                    resumeIDInfo={resumeid}
                    resumenameInfo={resumename}
                  />
                ) : null}
                {expVal === true ? (
                  <ExperienceFormScreen
                    resumeIDInfo={resumeid}
                    resumenameInfo={resumename}
                  />
                ) : null}
              </Container>
            </div>
            <FooterScreen />
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default ResumeFormScreen;
