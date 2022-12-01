import React, { memo, useState, useContext, Fragment } from "react";
import "../../css/header.css";
import { ThemeContext } from "../../contexts/themeContext";
// import ToggleButton from "../toggle";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChevronLeft,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const HeaderScreen = memo(({ headerData }) => {
  const [{ theme }] = useContext(ThemeContext);
  const navigate = useNavigate();
  const [instructionmodalShow, setInstructionmodalShow] = useState(false);

  const homeClick = () => {
    navigate("/dashboard");
  };

  const backClick = (event) => {
    navigate(-1);
  };

  const instructionClick = () => {
    setInstructionmodalShow(true);
  };

  function InstructionsModal(props) {
    return (
      <Modal
        scrollable
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            className="modal-title"
            id="contained-modal-title-vcenter"
          >
            <p>Instructions</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="m-3" border="secondary">
            <Card.Header className="modal-header">
              <span>* Important Instructions</span>
            </Card.Header>
            <Card.Body>
              <Card.Text className="modal-desp">
                <ol>
                  <li>
                    Please fill all the details in the form to get the complete
                    resume.
                  </li>
                  <li>
                    After filling all the details in the form, Go to the end of
                    the form and click on{" "}
                    <b style={{ color: "#df4759" }}>PREVIEW</b> button to get
                    the <b style={{ color: "#df4759" }}>GENERATE PDF</b> button.
                  </li>
                  <li>
                    <b>
                      <u>Note:</u>
                    </b>{" "}
                    Resume will be restricted to only one page of PDF. So, Fill
                    the details with short descriptions.
                  </li>
                  <li>
                    Kindly use <b style={{ color: "#df4759" }}>Laptop</b>,{" "}
                    <b style={{ color: "#df4759" }}>Desktop</b> or{" "}
                    <b style={{ color: "#df4759" }}>Mobile Desktop Site's</b>{" "}
                    Chrome for generating resume with proper PDF layout.
                  </li>
                  <li>
                    Kindly Request you to please share your valuable{" "}
                    <b style={{ color: "#df4759" }}>feedback</b> at the end.
                  </li>
                </ol>
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modal-button" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Fragment>
      <InstructionsModal
        show={instructionmodalShow}
        onHide={() => setInstructionmodalShow(false)}
      />
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
            {headerData === "feedback" ? (
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
                        <div
                          className="headertabsDesktoptext"
                          onClick={instructionClick}
                        >
                          <FontAwesomeIcon
                            icon={faQuestionCircle}
                            className="headerIconsDesktop"
                          />
                          <h4>Instructions</h4>
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
                      {/* <div className="headertoggle-cont">
                        <ToggleButton onChange={toggleTheme}></ToggleButton>
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
                          onClick={instructionClick}
                        >
                          <FontAwesomeIcon
                            icon={faQuestionCircle}
                            style={{ color: theme.tabIcons }}
                            className="headerIconsMobile"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xs={4} sm={4} className="headerthemeCol">
                      {/* <div className="headertoggle-cont">
                        <ToggleButton onChange={toggleTheme}></ToggleButton>
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
