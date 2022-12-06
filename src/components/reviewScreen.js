import React, { memo, useState, useEffect, useContext, Fragment } from "react";
import "../css/review.css";
import HeaderScreen from "../common/header/reviewheader";
import { ThemeContext } from "../contexts/themeContext";
import { useAuth } from "../contexts/AuthContext";
import { Row, Col, Button, Card, Modal } from "react-bootstrap";
import ReactStars from "react-stars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "@mui/material/Avatar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ReviewScreen = memo(() => {
  const [{ theme }] = useContext(ThemeContext);
  const headertextValue = "review";
  const { getAlldata, deletedata } = useAuth();
  
  const [carddatavalues, setCarddatavalues] = useState([]);
  const [deletemodalShow, setDeletemodalShow] = useState(false);
  const [tablenull, setTablenull] = useState(false);
  const [pathvalue, setPathvalue] = useState("");
  const [idvalue, setIdvalue] = useState("");
  const [usernamevalue, setUsernamevalue] = useState("");

  function randomColor() {
    let hex = Math.floor(Math.random() * 0xffffff);
    let color = "#" + hex.toString(16);

    return color;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reviewData = async () => {
    try {
      getAlldata("feedbackdata").on("value", (snapshot) => {
        if (snapshot.val() != null) {
          setTablenull(false);
          let mainarr = [];
          snapshot.forEach((item) => {
            let dbkey = item.key;
            let data = item.val();
            mainarr.push({
              dbkey: dbkey,
              uniqueID: data.uniqueID,
              username: data.usernameval,
              rating: data.rate,
              feedback: data.feedbackval,
              feedbackdate: data.feedbackdate,
            });
          });

          setCarddatavalues(mainarr);
          console.log("Review array data  ", mainarr);
        } else {
          setTablenull(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deletepopup = (pathval, idval, usernameval) => {
    setDeletemodalShow(true);
    setPathvalue(pathval);
    setIdvalue(idval);
    setUsernamevalue(usernameval);
  };

  const deleteData = async () => {
    setDeletemodalShow(false);
    setCarddatavalues([]);
    deletedata(pathvalue, idvalue)
      .then(() => {
        console.log("Data deleted successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    reviewData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function DeleteModal(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="deletemodalheader">
              <h4>{usernamevalue}</h4>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="deletemodalquestion">
            <h2>Are you Sure?</h2>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Cancel</Button>
          <Button variant="success" onClick={deleteData}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Fragment>
      <div className="MainContainer-review">
        <div className="SubContainer-review">
          <div
            className="HeadContainer-review"
            style={{
              backgroundColor: theme.backgroundColor,
              color: theme.color,
            }}
          >
            <HeaderScreen headerData={headertextValue} />
            <div className="review-cont">
              <DeleteModal
                show={deletemodalShow}
                onHide={() => setDeletemodalShow(false)}
              />
              {tablenull ? (
                <div className="emptydataerr">
                  <p>There is no Data!!</p>
                </div>
              ) : null}
              {carddatavalues.map((item, key) => {
                return (
                  <Fragment key={key}>
                    <Row className="gx-0">
                      <Col xs={0} sm={2} md={2} lg={2} xl={3}></Col>
                      <Col xs={12} sm={8} md={8} lg={8} xl={6}>
                        <div className="reviewMain-cont">
                          <Card
                            className="mt-3 mb-2 p-2 shadow-lg"
                            style={{
                              backgroundColor: theme.cardColor,
                              color: theme.color,
                            }}
                          >
                            <Card.Body>
                              <Row>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                  <Avatar
                                    id="avatarContent"
                                    style={{
                                      backgroundColor: randomColor(),
                                    }}
                                  >
                                    <p>{item?.username?.charAt(0) || "UN"}</p>
                                  </Avatar>
                                </Col>
                                <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                                  <div className="reviewcard-header-cont">
                                    <div className="reviewcard-title">
                                      <h3>{item.username}</h3>
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                      }}
                                      className="reviewcard-star-cont"
                                    >
                                      <ReactStars
                                        count={5}
                                        value={item.rating}
                                        size={25}
                                        edit={false}
                                        color={"#ffd700"}
                                      ></ReactStars>
                                      <p>{item.rating}</p>
                                    </div>

                                    <div className="reviewcard-date-cont">
                                      <p>{item.feedbackdate}</p>
                                    </div>
                                  </div>
                                </Col>
                                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                  <div
                                    onClick={() =>
                                      deletepopup(
                                        "feedbackdata",
                                        item.dbkey,
                                        item.username
                                      )
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      size="lg"
                                      color="red"
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col>
                                  <div className="reviewcard-feedback-decription">
                                    <p style={{ paddingTop: "20px" }}>
                                      {item.feedback}
                                    </p>
                                  </div>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        </div>
                      </Col>
                      <Col xs={0} sm={2} md={2} lg={2} xl={3}></Col>
                    </Row>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default memo(ReviewScreen);
