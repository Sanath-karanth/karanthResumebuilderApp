import React, { memo, useContext } from "react";
import "../css/footer.css";
import logo from "../logo.svg";
import { ThemeContext } from "../contexts/themeContext";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBriefcase,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const FooterScreen = memo(() => {
  const [{ theme }] = useContext(ThemeContext);
  const currentyear = moment().format("YYYY");
  return (
    <Container fluid className="container-guttersforfooter">
      <div
        className="footer-sub-container"
        style={{
          backgroundColor: theme.footerBgColor,
          color: theme.color,
          boxShadow: theme.shadowTopColor,
        }}
      >
        <Row className="gx-0 footergutters">
          <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <div className="footer-headleft-text pb-2">
              <h4>About us</h4>
            </div>
            <div className="footer-subleft-textIcon-cont">
              <FontAwesomeIcon
                icon={faUser}
                size="sm"
                className="footericonstyle"
                color={theme.headericoncolor}
              />
              <h6>Sanath S Karanth</h6>
            </div>
            <div className="footer-subleft-textIcon-cont">
              <FontAwesomeIcon
                icon={faBriefcase}
                size="sm"
                className="footericonstyle"
                color={theme.headericoncolor}
              />
              <h6>Software Engineer</h6>
            </div>
            <div className="footer-subleft-textIcon-cont">
              <FontAwesomeIcon
                icon={faEnvelope}
                size="sm"
                className="footericonstyle"
                color={theme.headericoncolor}
              />
              <h6>sanathsk97@gmail.com</h6>
            </div>
            <div className="footer-subleft-textIcon-cont">
              <FontAwesomeIcon
                icon={faPhone}
                size="sm"
                className="footericonstyle"
                color={theme.headericoncolor}
              />
              <h6>+91 9449685219</h6>
            </div>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <div className="footer-headcenter-text pb-2">
              <h4>Services</h4>
            </div>
            <div className="footer-subcenter-text">
              <h6>Web Development</h6>
            </div>
            <div className="footer-subcenter-text">
              <h6>Responsive Web design and development</h6>
            </div>
            <div className="footer-subcenter-text">
              <h6>Web Hosting</h6>
            </div>
            <div className="footer-subcenter-text">
              <h6>React Framework</h6>
              <img src={logo} className="App-footerlogo" alt="logo" />
            </div>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <div className="footer-headright-text pb-2">
              <h4>Resume Builder</h4>
            </div>
            <div className="footer-subright-text">
              <p>
                A good Resume builder is a very most important thing for all the
                job seekers who can get their job easier through the valuable
                document called 'Resume/CV'. And here, I will help you all to do
                it better by creating your own resume with the help of my
                application called as{" "}
                <b style={{ color: "#707070" }}>Resume Builder</b>. Now it's
                your time to create your resume at no cost.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="gx-0">
          <div className="social-icons-container">
            <div className="socialIcon-cont">
              <a
                href="http://www.gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa fa-envelope socialicon"
                  style={{ color: theme.footerSocialIconcolor }}
                ></i>
              </a>
            </div>
            <div className="socialIcon-cont">
              <a
                href="https://www.facebook.com/sanaths.karanth/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa fa-facebook socialicon"
                  style={{ color: theme.footerSocialIconcolor }}
                ></i>
              </a>
            </div>
            <div className="socialIcon-cont">
              <a
                href="https://www.linkedin.com/in/sanath-s-karanth-758bbb176"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa fa-linkedin-square socialicon"
                  style={{ color: theme.footerSocialIconcolor }}
                ></i>
              </a>
            </div>
            <div className="footer-copyright">
              <p style={{ color: theme.footerCopyrighttext }}>
                Copyright &#169; {currentyear}. All Rights Reserved
              </p>
            </div>
          </div>
        </Row>
      </div>
    </Container>
  );
});

export default FooterScreen;
