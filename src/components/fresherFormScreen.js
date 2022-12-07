import React, {
  memo,
  useState,
  useEffect,
  useContext,
  createRef,
  Fragment,
} from "react";
import "../css/fresherForm.css";
import { ThemeContext } from "../contexts/themeContext";
import {
  langOptions,
  educationOptions,
  monthNames,
  yearData,
  yearfromData,
  yeartoData,
  summarysuggestOptions,
} from "../json/json";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Container,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
  Card,
  Modal,
  Accordion,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import Select from "react-select";
import Pdf from "react-to-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faSuitcase,
  faInfoCircle,
  faLightbulb,
  faGraduationCap,
  faAward,
  faCalendar,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const steps = ["Step 1", "Step 2", "Step 3"];
const roleOptionsFresher = [{ value: "Fresher", label: "Fresher" }];

const FresherFormScreen = memo(({ resumeIDInfo }) => {
  const [{ theme }] = useContext(ThemeContext);
  const navigate = useNavigate();
  const pdffileref = createRef();

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [preview, setPreview] = useState(false);
  const [eyeicon, setEyeicon] = useState(false);
  const [suggestmodalShow, setSuggestmodalShow] = useState(false);
  const [isselectLoading, setIsselectLoading] = useState(true);
  const [progSelectval, setProgSelectval] = useState("");
  const [skillnullfresher, setSkillnullfresher] = useState(false);
  const pdfSizeoptionsResume1 = {
    orientation: "portrait",
    unit: "in",
    format: [12, 12],
    // format: resumeIDInfo == "Resume11" ? [10, 14] : [8, 16],
  };
  const pdfSizeoptionsResume2 = {
    orientation: "portrait",
    unit: "in",
    format: [13.5, 16.5],
  };

  ////////    Form 1 Variables
  const [fnameval, setFnameVal] = useState("");
  const [froleSelectval, setFroleSelectVal] = useState(roleOptionsFresher[0]);
  const [femailval, setFemailVal] = useState("");
  const [fphoneval, setFphoneVal] = useState("");
  const [fsummaryval, setFsummaryVal] = useState("");

  ///////    Form 2 Variables
  const [projectonefresher, setProjectonefresher] = useState("");
  const [projectonerolefresher, setProjectonerolefresher] = useState("");
  const [projectonetech1fresher, setProjectonetech1fresher] = useState("");
  const [projectonetech2fresher, setProjectonetech2fresher] = useState("");
  const [projectonetech3fresher, setProjectonetech3fresher] = useState("");
  const [projectonetech4fresher, setProjectonetech4fresher] = useState("");
  const [projectonepoint1fresher, setProjectonepoint1fresher] = useState("");
  const [projectonepoint2fresher, setProjectonepoint2fresher] = useState("");
  const [projectonepoint3fresher, setProjectonepoint3fresher] = useState("");
  const [isCheckedProject, setIsCheckedProject] = useState(false);

  const [projecttwofresher, setProjecttwofresher] = useState("");
  const [projecttworolefresher, setProjecttworolefresher] = useState("");
  const [projecttwotech1fresher, setProjecttwotech1fresher] = useState("");
  const [projecttwotech2fresher, setProjecttwotech2fresher] = useState("");
  const [projecttwotech3fresher, setProjecttwotech3fresher] = useState("");
  const [projecttwotech4fresher, setProjecttwotech4fresher] = useState("");
  const [projecttwopoint1fresher, setProjecttwopoint1fresher] = useState("");
  const [projecttwopoint2fresher, setProjecttwopoint2fresher] = useState("");
  const [projecttwopoint3fresher, setProjecttwopoint3fresher] = useState("");

  ///////    Form 3 Variables
  const [eduSelectval, setEduSelectVal] = useState("B.E");
  const [fstreamval, setFstreamVal] = useState("");
  const [funiversitynameval, setFuniversitynameVal] = useState("");
  const [fmonthfromval, setFmonthfromVal] = useState("January");
  const [fyearfromval, setFfromyearVal] = useState("2015");
  const [fyeartoval, setFtoyearVal] = useState("2019");
  const [fcoursenameval, setFcoursenameVal] = useState("");
  const [fplatnameval, setFplatnameVal] = useState("");
  const [fcertificatemonthval, setFcertificatemonthVal] = useState("January");
  const [fcertificateyearval, setFcertificateyearVal] = useState("2020");

  const initialValues = {
    fusername: fnameval,
    femail: femailval,
    fphoneno: fphoneval,
    fsummary: fsummaryval,
    fprojectonename: projectonefresher,
    fprojectonerole: projectonerolefresher,
    fprojectonetech1: projectonetech1fresher,
    fprojectonetech2: projectonetech2fresher,
    fprojectonetech3: projectonetech3fresher,
    fprojectonetech4: projectonetech4fresher,
    fprojectonepoint1: projectonepoint1fresher,
    fprojectonepoint2: projectonepoint2fresher,
    fprojectonepoint3: projectonepoint3fresher,
    fprojecttwoname: projecttwofresher,
    fprojecttworole: projecttworolefresher,
    fprojecttwotech1: projecttwotech1fresher,
    fprojecttwotech2: projecttwotech2fresher,
    fprojecttwotech3: projecttwotech3fresher,
    fprojecttwotech4: projecttwotech4fresher,
    fprojecttwopoint1: projecttwopoint1fresher,
    fprojecttwopoint2: projecttwopoint2fresher,
    fprojecttwopoint3: projecttwopoint3fresher,
    fstream: fstreamval,
    funiversity: funiversitynameval,
    fcoursename: fcoursenameval,
    fplatform: fplatnameval,
  };

  const fRoleColourStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: theme.inputFieldColor,
      color: theme.inputTextColor,
      border: "1px solid #ced4da",
      boxShadow: theme.inputfieldShadow,
    }),
    menuList: (styles) => ({
      ...styles,
      color: theme.inputTextColor,
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      color: theme.inputTextColor,
    }),
    menu: (base) => ({
      ...base,
      color: theme.inputTextColor,
    }),
  };

  const fSkillColourStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: theme.inputFieldColor,
      color: theme.inputTextColor,
      border: "1px solid #ced4da",
      boxShadow: theme.inputfieldShadow,
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      color: isFocused ? "navy" : "black",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "black",
    }),
  };

  // const isStepOptional = (step) => {
  //   return step === 1;
  // };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const InfoClick = () => {
    setSuggestmodalShow(true);
  };

  const project2checkClick = () => {
    setIsCheckedProject(!isCheckedProject);
  };

  const previewClick = () => {
    setPreview(true);
    setEyeicon(true);
  };

  const exitClick = () => {
    navigate("/dashboard");
  };

  const scrollToTopNextStep = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleBack = () => {
    scrollToTopNextStep();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const handleNext = () => {
    scrollToTopNextStep();
    setSkillnullfresher(true);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleSubmitForm = async () => {
    handleNext();
  };

  const programSelectFresher = (newValue) => {
    if (newValue === null || newValue === "") {
      newValue = [0];
      setSkillnullfresher(true);
      setIsselectLoading(true);
    } else {
      setSkillnullfresher(false);
    }
    const array = [];
    // eslint-disable-next-line array-callback-return
    newValue.map((obj) => {
      array.push(obj.value);
      setProgSelectval(array);
      console.log("array-->", array);
    });
    setIsselectLoading(false);
  };

  const educationSelect = (e) => {
    setEduSelectVal(e.target.value);
  };

  const monthfromSelect = (e) => {
    setFmonthfromVal(e.target.value);
  };

  const yearfromdropdownSelect = (e) => {
    setFfromyearVal(e.target.value);
  };

  const yeartodropdownSelect = (e) => {
    setFtoyearVal(e.target.value);
  };

  const certificatemonthSelect = (e) => {
    setFcertificatemonthVal(e.target.value);
  };

  const certificateyearSelect = (e) => {
    setFcertificateyearVal(e.target.value);
  };

  const copySummaryText = (copytxtVal, sIdVal) => {
    console.log(copytxtVal);
    var copyText = copytxtVal;
    var copyDataDiv;
    navigator.clipboard.writeText(copyText);
    copyDataDiv = document.querySelectorAll(`.copyContent #${sIdVal}`);

    for (let i = 0; i < copyDataDiv.length; i++) {
      copyDataDiv[i].style.display = "block";
      setTimeout(() => {
        copyDataDiv[i].style.display = "none";
      }, 2500);
    }
  };

  const freshervalidateStep1 = (values) => {
    const errors = {};

    if (!values.fusername) {
      errors.fusername = "Username is required!";
    } else if (!/^[A-Za-z\b ]+$/.test(values.fusername)) {
      errors.fusername = "Please enter a Valid username.";
    }

    if (!values.femail) {
      errors.femail = "Email ID is required!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.femail)
    ) {
      errors.femail = "Please enter a Valid Email ID.";
    }

    if (!values.fphoneno) {
      errors.fphoneno = "Phone no is required!";
    } else if (!/[6-9]\d{9}$/i.test(values.fphoneno)) {
      errors.fphoneno = "Please enter a Valid 10-digit phone number.";
    }

    if (!values.fsummary) {
      errors.fsummary = "Career Objective / Summary is required!";
    } else if (!/^[a-zA-Z0-9&)(+/.,:;'"\-\b\s ]+$/g.test(values.fsummary)) {
      errors.fsummary = "Please enter the valid characters only.";
    }

    return errors;
  };

  const freshervalidateStep2 = (values) => {
    const errors = {};

    if (!values.fprojectonename) {
      errors.fprojectonename = "Project name is required!";
    } else if (!/^[A-Za-z0-9&,\-_\b ]+$/.test(values.fprojectonename)) {
      errors.fprojectonename =
        "Please enter a Valid Alphanumerical Characters only.";
    }

    if (!values.fprojectonerole) {
      errors.fprojectonerole = "Project Role is required!";
    } else if (!/^[A-Za-z\-\b ]+$/.test(values.fprojectonerole)) {
      errors.fprojectonerole =
        "Please enter a Valid Alphanumerical Characters only.";
    }

    if (
      !values.fprojectonetech1 ||
      !values.fprojectonetech2 ||
      !values.fprojectonetech3
    ) {
      errors.fprojectonetech1 = "Please enter Atleast 3-4 Technologies.";
    }

    if (!values.fprojectonepoint1 || !values.fprojectonepoint2) {
      errors.fprojectonepoint1 = "Please enter Atleast 2-3 Points.";
    }

    if (isCheckedProject === true) {
      if (!values.fprojecttwoname) {
        errors.fprojecttwoname = "Project name is required!";
      } else if (!/^[A-Za-z0-9&,\-_\b ]+$/.test(values.fprojecttwoname)) {
        errors.fprojecttwoname =
          "Please enter a Valid Alphanumerical Characters only.";
      }

      if (!values.fprojecttworole) {
        errors.fprojecttworole = "Project Role is required!";
      } else if (!/^[A-Za-z\-\b ]+$/.test(values.fprojecttworole)) {
        errors.fprojecttworole =
          "Please enter a Valid Alphanumerical Characters only.";
      }
      if (
        !values.fprojecttwotech1 ||
        !values.fprojecttwotech2 ||
        !values.fprojecttwotech3
      ) {
        errors.fprojecttwotech1 = "Please enter Atleast 3-4 Technologies.";
      }
      if (!values.fprojecttwopoint1 || !values.fprojecttwopoint2) {
        errors.fprojecttwopoint1 = "Please enter Atleast 2-3 Points.";
      }
    }

    return errors;
  };

  const freshervalidateStep3 = (values) => {
    const errors = {};

    if (!values.fstream) {
      errors.fstream = "Education stream is required!";
    } else if (!/^[A-Za-z\b ]+$/.test(values.fstream)) {
      errors.fstream = "Please enter the valid characters only.";
    }

    if (!values.funiversity) {
      errors.funiversity = "University name is required!";
    } else if (!/^[A-Za-z\b ]+$/.test(values.funiversity)) {
      errors.funiversity = "Please enter the valid characters only.";
    }

    if (!values.fcoursename) {
      errors.fcoursename = "Course name is required!";
    } else if (!/^[A-Za-z\b ]+$/.test(values.fcoursename)) {
      errors.fcoursename = "Please enter the valid characters only.";
    }

    if (!values.fplatform) {
      errors.fplatform = "Platfrom name is required!";
    } else if (!/^[A-Za-z\b ]+$/.test(values.fplatform)) {
      errors.fplatform = "Please enter the valid characters only.";
    }

    return errors;
  };

  useEffect(() => {
    setFroleSelectVal(roleOptionsFresher[0]);
  }, [froleSelectval]);

  function SuggesionModal(props) {
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
            <h3 className="modal-title">Suggessions for You</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="modal-subtitle">Copy your choice</h4>
          {summarysuggestOptions.map((item, key) => {
            return (
              <Card key={key} className="m-3" border="secondary">
                <Card.Header className="modal-roletxt">{item.role}</Card.Header>
                <Card.Body>
                  <Card.Text className="modal-summarydesp">
                    {item.summary}
                  </Card.Text>
                  <div className="copyContent">
                    <Button
                      variant="outlined"
                      color="info"
                      className="modal-btn"
                      onClick={() => copySummaryText(item.summary, item.sid)}
                    >
                      Copy
                    </Button>
                    <div className="alertBoxCont" id={item.sid}>
                      <p>{item.ctext}</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const ResumeDesign1 = () => {
    return (
      <Fragment>
        <div className="pt-0">
          <Pdf
            targetRef={pdffileref}
            x={0}
            y={0}
            scale={1.15}
            options={pdfSizeoptionsResume1}
            filename="FresherResume.pdf"
          >
            {({ toPdf }) => (
              <>
                <hr></hr>
                <div className="generatepdfBtn">
                  <Button
                    variant="outlined"
                    endIcon={
                      <FontAwesomeIcon
                        icon={faFileArrowDown}
                        color={theme.color}
                      />
                    }
                    onClick={toPdf}
                    sx={{ color: theme.color, borderColor: theme.color }}
                  >
                    Generate PDF
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ color: theme.color, borderColor: theme.color }}
                    startIcon={<CancelIcon sx={{ color: "red" }} />}
                    onClick={exitClick}
                  >
                    EXIT
                  </Button>
                </div>
                <div className="generatepdfBtn finalStep pt-3">
                  <p>
                    Kindly request you to please give your valuable{" "}
                    <mark>
                      <b>Feedback!</b>
                    </mark>
                    . Go to home and you can find feedback there.
                  </p>
                </div>
              </>
            )}
          </Pdf>
        </div>

        <div className="ResumeFormdisplay-cont" ref={pdffileref}>
          <Container>
            <Row className="gx-0">
              <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-2">
                <div className="resume1Username">
                  <h3 style={{ color: "#000000" }}>{fnameval}</h3>
                </div>
                <div className="resume1Role">
                  <h4 style={{ color: "#000000" }}>Fresher</h4>
                </div>
                <div className="resume1Mail">
                  <h5 style={{ color: "#000000" }}>{femailval}</h5>
                </div>
                <div className="resume1Phone">
                  <h5 style={{ color: "#000000" }}>{fphoneval}</h5>
                </div>
              </Col>
            </Row>
            <Row className="gx-0 mb-2">
              <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-2">
                <div className="resume1Heading">
                  <h4 className="text-info">Professional Summary</h4>
                  <p>{fsummaryval}</p>
                </div>
              </Col>
              <Row className="gx-0 mb-2">
                <Col xs={12} sm={12} md={8} lg={8} xl={8} className="p-2">
                  <div className="resume1Heading">
                    <h4 className="text-info">PROJECTS</h4>
                  </div>
                  <div className="resume1Project-cont">
                    <h4>{projectonefresher}</h4>
                    <h5>{projectonerolefresher}</h5>
                    {projectonetech1fresher === "" ? null : (
                      <p>
                        Technologies used: {projectonetech1fresher},
                        {projectonetech2fresher},{projectonetech3fresher}
                      </p>
                    )}
                    <ul>
                      {projectonepoint1fresher === "" ? null : (
                        <li>{projectonepoint1fresher}</li>
                      )}
                      {projectonepoint2fresher === "" ? null : (
                        <li>{projectonepoint2fresher}</li>
                      )}
                      {projectonepoint3fresher === "" ? null : (
                        <li>{projectonepoint3fresher}</li>
                      )}
                    </ul>
                  </div>

                  {isCheckedProject ? (
                    <div className="resume1Project-cont">
                      <h4>{projecttwofresher}</h4>
                      <h5>{projecttworolefresher}</h5>
                      {projecttwotech1fresher === "" ? null : (
                        <p>
                          Technologies used: {projecttwotech1fresher},
                          {projecttwotech2fresher},{projecttwotech3fresher}
                        </p>
                      )}
                      <ul>
                        {projecttwopoint1fresher === "" ? null : (
                          <li>{projecttwopoint1fresher}</li>
                        )}
                        {projecttwopoint2fresher === "" ? null : (
                          <li>{projecttwopoint2fresher}</li>
                        )}
                        {projecttwopoint3fresher === "" ? null : (
                          <li>{projecttwopoint3fresher}</li>
                        )}
                      </ul>
                    </div>
                  ) : null}
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4} className="p-2">
                  <div className="resume1Heading">
                    <h4 className="text-info">Skills</h4>
                  </div>
                  <div className="resume1Skills">
                    {progSelectval === ""
                      ? null
                      : progSelectval.map((item, key) => {
                          return <p key={key}>{item}</p>;
                        })}
                  </div>
                  <div className="resume1Heading mt-2">
                    <h4 className="text-info">Education</h4>
                  </div>
                  <div className="resume1Education">
                    <h4>
                      {eduSelectval} ({fstreamval})
                    </h4>
                    <h5>{funiversitynameval}</h5>
                    <p>
                      {fmonthfromval} {fyearfromval}-{fyeartoval}
                    </p>
                  </div>

                  <div className="resume1Heading mt-2">
                    <h4 className="text-info">Certificates</h4>
                  </div>
                  <div className="resume1Certification">
                    <h4>{fcoursenameval}</h4>
                    <h5>{fplatnameval}</h5>
                    <p>
                      {fcertificatemonthval} {fcertificateyearval}
                    </p>
                  </div>
                </Col>
              </Row>
            </Row>
          </Container>
        </div>
      </Fragment>
    );
  };

  const ResumeDesign2 = () => {
    return (
      <Fragment>
        <div className="pt-0">
          <Pdf
            targetRef={pdffileref}
            x={0}
            y={0}
            scale={1.15}
            options={pdfSizeoptionsResume2}
            filename="FresherResume.pdf"
          >
            {({ toPdf }) => (
              <>
                <hr></hr>
                <div className="generatepdfBtn">
                  <Button
                    variant="outlined"
                    endIcon={
                      <FontAwesomeIcon
                        icon={faFileArrowDown}
                        color={theme.color}
                      />
                    }
                    onClick={toPdf}
                    sx={{ color: theme.color, borderColor: theme.color }}
                  >
                    Generate PDF
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ color: theme.color, borderColor: theme.color }}
                    startIcon={<CancelIcon sx={{ color: "red" }} />}
                    onClick={exitClick}
                  >
                    EXIT
                  </Button>
                </div>
                <div className="generatepdfBtn finalStep pt-3">
                  <p>
                    Kindly request you to please give your valuable{" "}
                    <mark>
                      <b>Feedback!</b>
                    </mark>
                    . Go to home and you can find feedback there.
                  </p>
                </div>
              </>
            )}
          </Pdf>
        </div>

        <div className="ResumeFormdisplay-cont" ref={pdffileref}>
          <Container style={{ border: "1px solid #DDDDDD", height: "190vh" }}>
            <Row className="gx-0">
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <div style={{ backgroundColor: "#16365D", padding: "16px" }}>
                  <div className="resume1Username">
                    <h3 style={{ color: "#FFFFFF" }}>{fnameval}</h3>
                  </div>
                  <div className="resume1Role">
                    <h4 style={{ color: "#FFFFFF" }}>Fresher</h4>
                  </div>
                  <div className="resume1Mail">
                    <h5 style={{ color: "#FFFFFF" }}>{femailval}</h5>
                  </div>
                  <div className="resume1Phone">
                    <h5 style={{ color: "#FFFFFF" }}>{fphoneval}</h5>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="gx-0 mb-2 p-4">
              <Col xs={9} sm={9} md={9} lg={9} xl={9} className="p-2">
                <div className="resume2Heading pb-3">
                  <h4 style={{ color: "#D13C39" }}>Professional Summary</h4>
                  <p>{fsummaryval}</p>
                </div>

                <div className="resume1Heading">
                  <h4 style={{ color: "#D13C39" }}>PROJECTS</h4>
                </div>
                <div className="resume2Project-cont pb-2">
                  <h4>{projectonefresher}</h4>
                  <h5>{projectonerolefresher}</h5>
                  {projectonetech1fresher === "" ? null : (
                    <p>
                      Technologies used: {projectonetech1fresher},
                      {projectonetech2fresher},{projectonetech3fresher}
                    </p>
                  )}
                  <ul>
                    {projectonepoint1fresher === "" ? null : (
                      <li>{projectonepoint1fresher}</li>
                    )}
                    {projectonepoint2fresher === "" ? null : (
                      <li>{projectonepoint2fresher}</li>
                    )}
                    {projectonepoint3fresher === "" ? null : (
                      <li>{projectonepoint3fresher}</li>
                    )}
                  </ul>
                </div>

                {isCheckedProject ? (
                  <div className="resume2Project-cont">
                    <h4>{projecttwofresher}</h4>
                    <h5>{projecttworolefresher}</h5>
                    {projecttwotech1fresher === "" ? null : (
                      <p>
                        Technologies used: {projecttwotech1fresher},
                        {projecttwotech2fresher},{projecttwotech3fresher}
                      </p>
                    )}
                    <ul>
                      {projecttwopoint1fresher === "" ? null : (
                        <li>{projecttwopoint1fresher}</li>
                      )}
                      {projecttwopoint2fresher === "" ? null : (
                        <li>{projecttwopoint2fresher}</li>
                      )}
                      {projecttwopoint3fresher === "" ? null : (
                        <li>{projecttwopoint3fresher}</li>
                      )}
                    </ul>
                  </div>
                ) : null}
              </Col>
              <Col xs={3} sm={3} md={3} lg={3} xl={3} className="p-2">
                <div className="resume1Heading">
                  <h4 style={{ color: "#D13C39" }}>Skills</h4>
                </div>
                <div className="resume1Skills">
                  {progSelectval === ""
                    ? null
                    : progSelectval.map((item, key) => {
                        return <p key={key}>{item}</p>;
                      })}
                </div>
                <div className="resume1Heading mt-2">
                  <h4 style={{ color: "#D13C39" }}>Education</h4>
                </div>
                <div className="resume1Education">
                  <h4>
                    {eduSelectval} ({fstreamval})
                  </h4>
                  <h5>{funiversitynameval}</h5>
                  <p>
                    {fmonthfromval} {fyearfromval}-{fyeartoval}
                  </p>
                </div>

                <div className="resume1Heading mt-2">
                  <h4 style={{ color: "#D13C39" }}>Certificates</h4>
                </div>
                <div className="resume1Certification">
                  <h4>{fcoursenameval}</h4>
                  <h5>{fplatnameval}</h5>
                  <p>
                    {fcertificatemonthval} {fcertificateyearval}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <SuggesionModal
        show={suggestmodalShow}
        onHide={() => setSuggestmodalShow(false)}
      />
      <div className="fresher-form">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>
                    <div
                      className="stepTxtFresher"
                      style={{
                        color: theme.color,
                      }}
                    >
                      <h4>{label}</h4>
                    </div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <Fragment>
              <div className="finalStep pt-3">
                <p>
                  Well done{" "}
                  <mark>
                    <b>Buddy!</b>
                  </mark>{" "}
                  You have completed all the <b>Steps</b> - Now click on{" "}
                  <b style={{ color: "red" }}>Preview</b> to get generate PDF
                  button.
                </p>
              </div>
              <div className="previewbutton pt-2">
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ color: theme.color, borderColor: theme.color }}
                  startIcon={
                    eyeicon === true ? (
                      <RemoveRedEyeIcon sx={{ color: "green" }} />
                    ) : (
                      <VisibilityOffIcon sx={{ color: "red" }} />
                    )
                  }
                  onClick={previewClick}
                >
                  PREVIEW
                </Button>
              </div>
              {preview === true ? (
                resumeIDInfo === "Resume11" ? (
                  <ResumeDesign1 />
                ) : resumeIDInfo === "Resume12" ? (
                  <ResumeDesign2 />
                ) : resumeIDInfo === "Resume13" ? (
                  <ResumeDesign1 />
                ) : null
              ) : null}
            </Fragment>
          ) : (
            <Fragment>
              <div className="mandatoryinfotext pt-4 pb-4">
                <p>
                  <span className="asteriskkey">*</span> Please complete all the{" "}
                  <b>Steps</b> to get the complete resume.
                </p>
              </div>
              <div className="fresher-formContent">
                {activeStep === 0 ? ( //////////////// Step 1 form begins  //////////////////////////
                  <Fragment>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handleSubmitForm}
                      validate={freshervalidateStep1}
                    >
                      {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        touched,
                        values,
                        errors,
                      }) => (
                        <>
                          <Form onSubmit={handleSubmit} autoComplete="off">
                            <div
                              className="fresher-forms-cont"
                              style={{
                                backgroundColor: theme.cardColor,
                                boxShadow: theme.cardShadow,
                              }}
                            >
                              <Row className="gx-0 mb-4">
                                <div className="fresher-title">
                                  <h3 style={{ color: "#61DBFB" }}>
                                    Fresher Form
                                  </h3>
                                </div>
                                <Col ///////////////////////Username
                                  xs={12}
                                  sm={12}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="firstname"
                                    className="pb-2 labelTextFresher"
                                  >
                                    Full Name{"\n"}
                                    <span className="asteriskkey">*</span>
                                  </label>
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <div
                                        className="input-group-text h-100"
                                        style={{
                                          backgroundColor:
                                            theme.inputPrependColor,
                                          color: theme.inputIcon,
                                          boxShadow: theme.inputfieldShadow,
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faUser} />
                                      </div>
                                    </div>
                                    <input
                                      type="text"
                                      style={{
                                        backgroundColor: theme.inputFieldColor,
                                        color: theme.inputTextColor,
                                        boxShadow: theme.inputfieldShadow,
                                      }}
                                      className="form-control inputTxt"
                                      placeholder="Enter Full name"
                                      onChange={(e) => {
                                        handleChange(e);
                                        setFnameVal(e.target.value);
                                      }}
                                      value={values.fusername}
                                      name="fusername"
                                    ></input>
                                  </div>
                                  {errors.fusername && (
                                    <div className="errortext pt-2">
                                      {errors.fusername}
                                    </div>
                                  )}
                                </Col>
                                <Col ///////////////////////RoleSelect
                                  xs={12}
                                  sm={12}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="role"
                                    className="pb-2 labelTextFresher"
                                  >
                                    Role:
                                  </label>
                                  <div>
                                    <Select
                                      styles={fRoleColourStyles}
                                      className="selectContent"
                                      options={roleOptionsFresher}
                                      defaultValue={froleSelectval}
                                      isDisabled={true}
                                      isSearchable={false}
                                    />
                                  </div>
                                </Col>
                                <Col ///////////////////////Email
                                  xs={12}
                                  sm={12}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="emailID"
                                    className="pb-2 labelTextFresher"
                                  >
                                    Email ID{"\n"}
                                    <span className="asteriskkey">*</span>
                                  </label>
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <div
                                        className="input-group-text h-100"
                                        style={{
                                          backgroundColor:
                                            theme.inputPrependColor,
                                          color: theme.inputIcon,
                                          boxShadow: theme.inputfieldShadow,
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faEnvelope} />
                                      </div>
                                    </div>
                                    <input
                                      type="email"
                                      style={{
                                        backgroundColor: theme.inputFieldColor,
                                        color: theme.inputTextColor,
                                        boxShadow: theme.inputfieldShadow,
                                      }}
                                      className="form-control inputTxt"
                                      placeholder="Email address"
                                      onChange={(e) => {
                                        handleChange(e);
                                        setFemailVal(e.target.value);
                                      }}
                                      value={values.femail}
                                      name="femail"
                                    ></input>
                                  </div>
                                  {errors.femail && (
                                    <div className="errortext pt-2">
                                      {errors.femail}
                                    </div>
                                  )}
                                </Col>
                                <Col ///////////////////////Phonenumber
                                  xs={12}
                                  sm={12}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="phoneno"
                                    className="pb-2 labelTextFresher"
                                  >
                                    Phone No{"\n"}
                                    <span className="asteriskkey">*</span>
                                  </label>
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <div
                                        className="input-group-text h-100"
                                        style={{
                                          backgroundColor:
                                            theme.inputPrependColor,
                                          color: theme.inputIcon,
                                          boxShadow: theme.inputfieldShadow,
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faPhone} />
                                      </div>
                                    </div>
                                    <input
                                      type="text"
                                      style={{
                                        backgroundColor: theme.inputFieldColor,
                                        color: theme.inputTextColor,
                                        boxShadow: theme.inputfieldShadow,
                                      }}
                                      className="form-control inputTxt"
                                      placeholder="Enter 10-digit number"
                                      maxLength="10"
                                      onChange={(e) => {
                                        handleChange(e);
                                        setFphoneVal(e.target.value);
                                      }}
                                      value={values.fphoneno}
                                      name="fphoneno"
                                    ></input>
                                  </div>
                                  {errors.fphoneno && (
                                    <div className="errortext pt-2">
                                      {errors.fphoneno}
                                    </div>
                                  )}
                                </Col>
                                <Col ///////////////////////Summary
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                  className="p-2 mb-2"
                                >
                                  <div className="labelFlex">
                                    <label
                                      htmlFor="summary"
                                      className="pb-2 labelTextFresher"
                                    >
                                      Career Objective / Summary{"\n"}
                                      <span className="asteriskkey">*</span>
                                    </label>
                                    <OverlayTrigger
                                      overlay={
                                        <Tooltip id="tooltip-disabled">
                                          {"\n"}Suggessions
                                        </Tooltip>
                                      }
                                    >
                                      <span
                                        className="infoIconCont d-inline-block"
                                        onClick={InfoClick}
                                      >
                                        <FontAwesomeIcon
                                          size="lg"
                                          className="infoIcon"
                                          color="green"
                                          icon={faInfoCircle}
                                        />{" "}
                                        Click me
                                      </span>
                                    </OverlayTrigger>
                                  </div>

                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <div
                                        className="input-group-text h-100"
                                        style={{
                                          backgroundColor:
                                            theme.inputPrependColor,
                                          color: theme.inputIcon,
                                          boxShadow: theme.inputfieldShadow,
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faSuitcase} />
                                      </div>
                                    </div>
                                    <textarea
                                      className="form-control inputTxt"
                                      style={{
                                        backgroundColor: theme.inputFieldColor,
                                        color: theme.inputTextColor,
                                        boxShadow: theme.inputfieldShadow,
                                      }}
                                      placeholder="Enter Career Objective / Summary"
                                      rows="3"
                                      onChange={(e) => {
                                        handleChange(e);
                                        setFsummaryVal(e.target.value);
                                      }}
                                      value={values.fsummary}
                                      name="fsummary"
                                    ></textarea>
                                  </div>
                                  {errors.fsummary && (
                                    <div className="errortext pt-2">
                                      {errors.fsummary}
                                    </div>
                                  )}
                                </Col>
                              </Row>
                            </div>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                pt: 4,
                              }}
                            >
                              <Button
                                color="inherit"
                                variant="outlined"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                              >
                                Back
                              </Button>
                              <Box sx={{ flex: "1 1 auto" }} />
                              <Button
                                type="submit"
                                onClick={handleSubmit}
                                variant="outlined"
                              >
                                {activeStep === steps.length - 1
                                  ? "Finish"
                                  : "Next"}
                              </Button>
                            </Box>
                          </Form>
                        </>
                      )}
                    </Formik>
                  </Fragment>
                ) : null}
                {activeStep === 1 ? ( //////////////// Step 2 form begins  ////////////////////////////
                  <Fragment>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handleSubmitForm}
                      validate={freshervalidateStep2}
                    >
                      {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        touched,
                        values,
                        errors,
                      }) => (
                        <>
                          <Form onSubmit={handleSubmit} autoComplete="off">
                            <div
                              className="fresher-forms-cont"
                              style={{
                                backgroundColor: theme.cardColor,
                                boxShadow: theme.cardShadow,
                              }}
                            >
                              <Row className="gx-0 mb-4">
                                <Col ///////////////////////SkillSelect
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Skills"
                                    className="pb-2 labelTitleTextFresher"
                                  >
                                    Select your Skills{"\n"}
                                    <span className="asteriskkey">*</span>
                                  </label>
                                  <Select
                                    className="selectContent"
                                    isMulti
                                    closeMenuOnSelect={true}
                                    isClearable={true}
                                    isSearchable={false}
                                    styles={fSkillColourStyles}
                                    isLoading={isselectLoading}
                                    onChange={programSelectFresher}
                                    options={langOptions}
                                  />
                                  {skillnullfresher === true && (
                                    <div className="errortext pt-3">
                                      Please select Atleast 3-4 Skills.
                                    </div>
                                  )}
                                </Col>
                                <Col ///////////////////////Projects
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Projects"
                                    className="pb-2 labelTitleTextFresher"
                                  >
                                    Projects{"\n"}
                                    <span className="asteriskkey">*</span>
                                  </label>
                                  <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                      {" "}
                                      {/* Accordian 1  */}
                                      <Accordion.Header>
                                        <label
                                          htmlFor="projectAccordian1"
                                          className="labelTextFresher"
                                        >
                                          Project 1{"\n"}
                                          <span className="asteriskkey">*</span>
                                        </label>
                                      </Accordion.Header>
                                      <Accordion.Body
                                        style={{
                                          backgroundColor: theme.cardColor,
                                          boxShadow: theme.cardShadow,
                                        }}
                                      >
                                        <Row className="gx-0 mb-0">
                                          <Col ///////////////////////Project Name
                                            xs={12}
                                            sm={12}
                                            md={7}
                                            lg={7}
                                            xl={7}
                                            className="p-2 mb-2"
                                          >
                                            <div className="input-group">
                                              <div className="input-group-prepend">
                                                <div
                                                  className="input-group-text h-100"
                                                  style={{
                                                    backgroundColor:
                                                      theme.inputPrependColor,
                                                    color: theme.inputIcon,
                                                    boxShadow:
                                                      theme.inputfieldShadow,
                                                  }}
                                                >
                                                  <FontAwesomeIcon
                                                    icon={faLightbulb}
                                                  />
                                                </div>
                                              </div>
                                              <input
                                                type="text"
                                                style={{
                                                  backgroundColor:
                                                    theme.inputFieldColor,
                                                  color: theme.inputTextColor,
                                                  boxShadow:
                                                    theme.inputfieldShadow,
                                                }}
                                                className="form-control inputTxt"
                                                placeholder="Project Name"
                                                onChange={(e) => {
                                                  handleChange(e);
                                                  setProjectonefresher(
                                                    e.target.value
                                                  );
                                                }}
                                                value={values.fprojectonename}
                                                name="fprojectonename"
                                              ></input>
                                            </div>
                                            {errors.fprojectonename && (
                                              <div className="errortext pt-2">
                                                {errors.fprojectonename}
                                              </div>
                                            )}
                                          </Col>
                                          <Col ///////////////////////Project Role
                                            xs={12}
                                            sm={12}
                                            md={5}
                                            lg={5}
                                            xl={5}
                                            className="p-2 mb-2"
                                          >
                                            <div className="input-group">
                                              <input
                                                type="text"
                                                style={{
                                                  backgroundColor:
                                                    theme.inputFieldColor,
                                                  color: theme.inputTextColor,
                                                  boxShadow:
                                                    theme.inputfieldShadow,
                                                }}
                                                className="form-control inputTxt"
                                                placeholder="Role (Ex:Developer/Tester)"
                                                onChange={(e) => {
                                                  handleChange(e);
                                                  setProjectonerolefresher(
                                                    e.target.value
                                                  );
                                                }}
                                                value={values.fprojectonerole}
                                                name="fprojectonerole"
                                              ></input>
                                            </div>
                                            {errors.fprojectonerole && (
                                              <div className="errortext pt-2">
                                                {errors.fprojectonerole}
                                              </div>
                                            )}
                                          </Col>
                                          <Col ///////////////////////Technology Names
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                            className="p-2 mb-0"
                                          >
                                            <label
                                              htmlFor="firstname"
                                              className="pb-2 labelTextFresher"
                                            >
                                              Technologies used (Example: Java):
                                              {"\n"}
                                              <span className="asteriskkey">
                                                *
                                              </span>
                                            </label>
                                            <Row className="gx-0 mb-0">
                                              <Col
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={4}
                                                xl={4}
                                                className="p-2 mb-2"
                                              >
                                                <div className="input-group">
                                                  <input
                                                    type="text"
                                                    style={{
                                                      backgroundColor:
                                                        theme.inputFieldColor,
                                                      color:
                                                        theme.inputTextColor,
                                                      boxShadow:
                                                        theme.inputfieldShadow,
                                                    }}
                                                    className="form-control inputTxt"
                                                    placeholder="Technology 1"
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setProjectonetech1fresher(
                                                        e.target.value
                                                      );
                                                    }}
                                                    value={
                                                      values.fprojectonetech1
                                                    }
                                                    name="fprojectonetech1"
                                                  ></input>
                                                </div>
                                              </Col>
                                              <Col
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={4}
                                                xl={4}
                                                className="p-2 mb-2"
                                              >
                                                <div className="input-group">
                                                  <input
                                                    type="text"
                                                    style={{
                                                      backgroundColor:
                                                        theme.inputFieldColor,
                                                      color:
                                                        theme.inputTextColor,
                                                      boxShadow:
                                                        theme.inputfieldShadow,
                                                    }}
                                                    className="form-control inputTxt"
                                                    placeholder="Technology 2"
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setProjectonetech2fresher(
                                                        e.target.value
                                                      );
                                                    }}
                                                    value={
                                                      values.fprojectonetech2
                                                    }
                                                    name="fprojectonetech2"
                                                  ></input>
                                                </div>
                                              </Col>
                                              <Col
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={4}
                                                xl={4}
                                                className="p-2 mb-2"
                                              >
                                                <div className="input-group">
                                                  <input
                                                    type="text"
                                                    style={{
                                                      backgroundColor:
                                                        theme.inputFieldColor,
                                                      color:
                                                        theme.inputTextColor,
                                                      boxShadow:
                                                        theme.inputfieldShadow,
                                                    }}
                                                    className="form-control inputTxt"
                                                    placeholder="Technology 3"
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setProjectonetech3fresher(
                                                        e.target.value
                                                      );
                                                    }}
                                                    value={
                                                      values.fprojectonetech3
                                                    }
                                                    name="fprojectonetech3"
                                                  ></input>
                                                </div>
                                              </Col>
                                              <Col
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={4}
                                                xl={4}
                                                className="p-2 mb-0"
                                              >
                                                <div className="input-group">
                                                  <input
                                                    type="text"
                                                    style={{
                                                      backgroundColor:
                                                        theme.inputFieldColor,
                                                      color:
                                                        theme.inputTextColor,
                                                      boxShadow:
                                                        theme.inputfieldShadow,
                                                    }}
                                                    className="form-control inputTxt"
                                                    placeholder="Technology 4"
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setProjectonetech4fresher(
                                                        e.target.value
                                                      );
                                                    }}
                                                    value={
                                                      values.fprojectonetech4
                                                    }
                                                    name="fprojectonetech4"
                                                  ></input>
                                                </div>
                                              </Col>
                                            </Row>
                                            {errors.fprojectonetech1 && (
                                              <div className="errortext p-2">
                                                {errors.fprojectonetech1}
                                              </div>
                                            )}
                                            <Col ///////////////////////Project Point 1
                                              xs={12}
                                              sm={12}
                                              md={12}
                                              lg={12}
                                              xl={12}
                                              className="p-2 mt-1"
                                            >
                                              <div className="input-group">
                                                <textarea
                                                  style={{
                                                    backgroundColor:
                                                      theme.inputFieldColor,
                                                    color: theme.inputTextColor,
                                                    boxShadow:
                                                      theme.inputfieldShadow,
                                                  }}
                                                  className="form-control inputTxt"
                                                  placeholder="Enter point 1"
                                                  rows="2"
                                                  onChange={(e) => {
                                                    handleChange(e);
                                                    setProjectonepoint1fresher(
                                                      e.target.value
                                                    );
                                                  }}
                                                  value={
                                                    values.fprojectonepoint1
                                                  }
                                                  name="fprojectonepoint1"
                                                ></textarea>
                                              </div>
                                            </Col>
                                            <Col ///////////////////////Project Point 2
                                              xs={12}
                                              sm={12}
                                              md={12}
                                              lg={12}
                                              xl={12}
                                              className="p-2 mt-1"
                                            >
                                              <div className="input-group">
                                                <textarea
                                                  style={{
                                                    backgroundColor:
                                                      theme.inputFieldColor,
                                                    color: theme.inputTextColor,
                                                    boxShadow:
                                                      theme.inputfieldShadow,
                                                  }}
                                                  className="form-control inputTxt"
                                                  placeholder="Enter point 2"
                                                  rows="2"
                                                  onChange={(e) => {
                                                    handleChange(e);
                                                    setProjectonepoint2fresher(
                                                      e.target.value
                                                    );
                                                  }}
                                                  value={
                                                    values.fprojectonepoint2
                                                  }
                                                  name="fprojectonepoint2"
                                                ></textarea>
                                              </div>
                                            </Col>
                                            <Col ///////////////////////Project Point 3
                                              xs={12}
                                              sm={12}
                                              md={12}
                                              lg={12}
                                              xl={12}
                                              className="p-2 mt-1"
                                            >
                                              <div className="input-group">
                                                <textarea
                                                  style={{
                                                    backgroundColor:
                                                      theme.inputFieldColor,
                                                    color: theme.inputTextColor,
                                                    boxShadow:
                                                      theme.inputfieldShadow,
                                                  }}
                                                  className="form-control inputTxt"
                                                  placeholder="Enter point 3"
                                                  rows="2"
                                                  onChange={(e) => {
                                                    handleChange(e);
                                                    setProjectonepoint3fresher(
                                                      e.target.value
                                                    );
                                                  }}
                                                  value={
                                                    values.fprojectonepoint3
                                                  }
                                                  name="fprojectonepoint3"
                                                ></textarea>
                                              </div>
                                              {errors.fprojectonepoint1 && (
                                                <div className="errortext pt-3">
                                                  {errors.fprojectonepoint1}
                                                </div>
                                              )}
                                            </Col>
                                          </Col>
                                        </Row>
                                      </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="1">
                                      {" "}
                                      {/* Accordian 2 pending */}
                                      <Accordion.Header>
                                        <label
                                          htmlFor="projectAccordian1"
                                          className="labelTextFresher"
                                        >
                                          Project 2 (Optional)
                                        </label>
                                      </Accordion.Header>
                                      <Accordion.Body
                                        style={{
                                          backgroundColor: theme.cardColor,
                                          boxShadow: theme.cardShadow,
                                        }}
                                      >
                                        <div className="p-2">
                                          <input
                                            type="checkbox"
                                            style={{
                                              height: "15px",
                                              width: "15px",
                                            }}
                                            checked={isCheckedProject}
                                            onChange={project2checkClick}
                                          />
                                          <span className="checkboxtextFresher">
                                            &nbsp;&nbsp;Please Checkmark this
                                            only if&nbsp;
                                            <b>Project 2</b> is required.
                                          </span>
                                        </div>
                                        <Row className="gx-0 mb-0">
                                          <Col ///////////////////////Project Name
                                            xs={12}
                                            sm={12}
                                            md={7}
                                            lg={7}
                                            xl={7}
                                            className="p-2 mb-2"
                                          >
                                            <div className="input-group">
                                              <div className="input-group-prepend">
                                                <div
                                                  className="input-group-text h-100"
                                                  style={{
                                                    backgroundColor:
                                                      theme.inputPrependColor,
                                                    color: theme.inputIcon,
                                                    boxShadow:
                                                      theme.inputfieldShadow,
                                                  }}
                                                >
                                                  <FontAwesomeIcon
                                                    icon={faLightbulb}
                                                  />
                                                </div>
                                              </div>
                                              <input
                                                type="text"
                                                style={{
                                                  backgroundColor:
                                                    theme.inputFieldColor,
                                                  color: theme.inputTextColor,
                                                  boxShadow:
                                                    theme.inputfieldShadow,
                                                }}
                                                className="form-control inputTxt"
                                                placeholder="Project Name"
                                                onChange={(e) => {
                                                  handleChange(e);
                                                  setProjecttwofresher(
                                                    e.target.value
                                                  );
                                                }}
                                                value={values.fprojecttwoname}
                                                name="fprojecttwoname"
                                              ></input>
                                            </div>
                                            {errors.fprojecttwoname && (
                                              <div className="errortext pt-2">
                                                {errors.fprojecttwoname}
                                              </div>
                                            )}
                                          </Col>
                                          <Col ///////////////////////Project Role
                                            xs={12}
                                            sm={12}
                                            md={5}
                                            lg={5}
                                            xl={5}
                                            className="p-2 mb-2"
                                          >
                                            <div className="input-group">
                                              <input
                                                type="text"
                                                style={{
                                                  backgroundColor:
                                                    theme.inputFieldColor,
                                                  color: theme.inputTextColor,
                                                  boxShadow:
                                                    theme.inputfieldShadow,
                                                }}
                                                className="form-control inputTxt"
                                                placeholder="Role (Ex:Developer)"
                                                onChange={(e) => {
                                                  handleChange(e);
                                                  setProjecttworolefresher(
                                                    e.target.value
                                                  );
                                                }}
                                                value={values.fprojecttworole}
                                                name="fprojecttworole"
                                              ></input>
                                            </div>
                                            {errors.fprojecttworole && (
                                              <div className="errortext pt-2">
                                                {errors.fprojecttworole}
                                              </div>
                                            )}
                                          </Col>
                                          <Col ///////////////////////Technology Names
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                            className="p-2 mb-0"
                                          >
                                            <label
                                              htmlFor="firstname"
                                              className="pb-2 labelTextFresher"
                                            >
                                              Technologies used (Example: Java):
                                              {"\n"}
                                              <span className="asteriskkey">
                                                *
                                              </span>
                                            </label>
                                            <Row className="gx-0 mb-0">
                                              <Col
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={4}
                                                xl={4}
                                                className="p-2 mb-2"
                                              >
                                                <div className="input-group">
                                                  <input
                                                    type="text"
                                                    style={{
                                                      backgroundColor:
                                                        theme.inputFieldColor,
                                                      color:
                                                        theme.inputTextColor,
                                                      boxShadow:
                                                        theme.inputfieldShadow,
                                                    }}
                                                    className="form-control inputTxt"
                                                    placeholder="Technology 1"
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setProjecttwotech1fresher(
                                                        e.target.value
                                                      );
                                                    }}
                                                    value={
                                                      values.fprojecttwotech1
                                                    }
                                                    name="fprojecttwotech1"
                                                  ></input>
                                                </div>
                                              </Col>
                                              <Col
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={4}
                                                xl={4}
                                                className="p-2 mb-2"
                                              >
                                                <div className="input-group">
                                                  <input
                                                    type="text"
                                                    style={{
                                                      backgroundColor:
                                                        theme.inputFieldColor,
                                                      color:
                                                        theme.inputTextColor,
                                                      boxShadow:
                                                        theme.inputfieldShadow,
                                                    }}
                                                    className="form-control inputTxt"
                                                    placeholder="Technology 2"
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setProjecttwotech2fresher(
                                                        e.target.value
                                                      );
                                                    }}
                                                    value={
                                                      values.fprojecttwotech2
                                                    }
                                                    name="fprojecttwotech2"
                                                  ></input>
                                                </div>
                                              </Col>
                                              <Col
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={4}
                                                xl={4}
                                                className="p-2 mb-2"
                                              >
                                                <div className="input-group">
                                                  <input
                                                    type="text"
                                                    style={{
                                                      backgroundColor:
                                                        theme.inputFieldColor,
                                                      color:
                                                        theme.inputTextColor,
                                                      boxShadow:
                                                        theme.inputfieldShadow,
                                                    }}
                                                    className="form-control inputTxt"
                                                    placeholder="Technology 3"
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setProjecttwotech3fresher(
                                                        e.target.value
                                                      );
                                                    }}
                                                    value={
                                                      values.fprojecttwotech3
                                                    }
                                                    name="fprojecttwotech3"
                                                  ></input>
                                                </div>
                                              </Col>
                                              <Col
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={4}
                                                xl={4}
                                                className="p-2 mb-0"
                                              >
                                                <div className="input-group">
                                                  <input
                                                    type="text"
                                                    style={{
                                                      backgroundColor:
                                                        theme.inputFieldColor,
                                                      color:
                                                        theme.inputTextColor,
                                                      boxShadow:
                                                        theme.inputfieldShadow,
                                                    }}
                                                    className="form-control inputTxt"
                                                    placeholder="Technology 4"
                                                    onChange={(e) => {
                                                      handleChange(e);
                                                      setProjecttwotech4fresher(
                                                        e.target.value
                                                      );
                                                    }}
                                                    value={
                                                      values.fprojecttwotech4
                                                    }
                                                    name="fprojecttwotech4"
                                                  ></input>
                                                </div>
                                              </Col>
                                            </Row>
                                            {errors.fprojecttwotech1 && (
                                              <div className="errortext p-2">
                                                {errors.fprojecttwotech1}
                                              </div>
                                            )}
                                            <Col ///////////////////////Project Point 1
                                              xs={12}
                                              sm={12}
                                              md={12}
                                              lg={12}
                                              xl={12}
                                              className="p-2 mt-1"
                                            >
                                              <div className="input-group">
                                                <textarea
                                                  style={{
                                                    backgroundColor:
                                                      theme.inputFieldColor,
                                                    color: theme.inputTextColor,
                                                    boxShadow:
                                                      theme.inputfieldShadow,
                                                  }}
                                                  className="form-control inputTxt"
                                                  placeholder="Enter point 1"
                                                  rows="2"
                                                  onChange={(e) => {
                                                    handleChange(e);
                                                    setProjecttwopoint1fresher(
                                                      e.target.value
                                                    );
                                                  }}
                                                  value={
                                                    values.fprojecttwopoint1
                                                  }
                                                  name="fprojecttwopoint1"
                                                ></textarea>
                                              </div>
                                            </Col>
                                            <Col ///////////////////////Project Point 2
                                              xs={12}
                                              sm={12}
                                              md={12}
                                              lg={12}
                                              xl={12}
                                              className="p-2 mt-1"
                                            >
                                              <div className="input-group">
                                                <textarea
                                                  style={{
                                                    backgroundColor:
                                                      theme.inputFieldColor,
                                                    color: theme.inputTextColor,
                                                    boxShadow:
                                                      theme.inputfieldShadow,
                                                  }}
                                                  className="form-control inputTxt"
                                                  placeholder="Enter point 2"
                                                  rows="2"
                                                  onChange={(e) => {
                                                    handleChange(e);
                                                    setProjecttwopoint2fresher(
                                                      e.target.value
                                                    );
                                                  }}
                                                  value={
                                                    values.fprojecttwopoint2
                                                  }
                                                  name="fprojecttwopoint2"
                                                ></textarea>
                                              </div>
                                            </Col>
                                            <Col ///////////////////////Project Point 3
                                              xs={12}
                                              sm={12}
                                              md={12}
                                              lg={12}
                                              xl={12}
                                              className="p-2 mt-1"
                                            >
                                              <div className="input-group">
                                                <textarea
                                                  style={{
                                                    backgroundColor:
                                                      theme.inputFieldColor,
                                                    color: theme.inputTextColor,
                                                    boxShadow:
                                                      theme.inputfieldShadow,
                                                  }}
                                                  className="form-control inputTxt"
                                                  placeholder="Enter point 3"
                                                  rows="2"
                                                  onChange={(e) => {
                                                    handleChange(e);
                                                    setProjecttwopoint3fresher(
                                                      e.target.value
                                                    );
                                                  }}
                                                  value={
                                                    values.fprojecttwopoint3
                                                  }
                                                  name="fprojecttwopoint3"
                                                ></textarea>
                                              </div>
                                              {errors.fprojecttwopoint1 && (
                                                <div className="errortext pt-3">
                                                  {errors.fprojecttwopoint1}
                                                </div>
                                              )}
                                            </Col>
                                          </Col>
                                        </Row>
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  </Accordion>
                                </Col>
                              </Row>
                            </div>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                pt: 4,
                              }}
                            >
                              <Button
                                color="inherit"
                                variant="outlined"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                              >
                                Back
                              </Button>
                              <Box sx={{ flex: "1 1 auto" }} />
                              <Button
                                type="submit"
                                variant="outlined"
                                onClick={handleNext}
                              >
                                {activeStep === steps.length - 1
                                  ? "Finish"
                                  : "Next"}
                              </Button>
                            </Box>
                          </Form>
                        </>
                      )}
                    </Formik>
                  </Fragment>
                ) : null}
                {activeStep === 2 ? ( //////////////// Step 3 form begins
                  <Fragment>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handleSubmitForm}
                      validate={freshervalidateStep3}
                    >
                      {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        touched,
                        values,
                        errors,
                      }) => (
                        <>
                          <Form onSubmit={handleSubmit} autoComplete="off">
                            <div
                              className="fresher-forms-cont"
                              style={{
                                backgroundColor: theme.cardColor,
                                boxShadow: theme.cardShadow,
                              }}
                            >
                              <Row className="gx-0 mb-4">
                                <label
                                  htmlFor="Skills"
                                  className="pb-2 labelTitleTextFresher"
                                >
                                  Education Details{"\n"}
                                  <span className="asteriskkey">*</span>
                                </label>

                                <Col ///////////////////////Degree Select
                                  xs={12}
                                  sm={12}
                                  md={4}
                                  lg={2}
                                  xl={2}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Degree"
                                    className="pb-2 labelTextFresher"
                                  >
                                    Select Degree
                                  </label>
                                  <select
                                    style={{
                                      backgroundColor: theme.inputFieldColor,
                                      color: theme.inputTextColor,
                                      boxShadow: theme.inputfieldShadow,
                                    }}
                                    className="form-control form-select"
                                    onChange={educationSelect}
                                    value={eduSelectval}
                                  >
                                    {educationOptions.map((item, keyindex) => {
                                      return (
                                        <option
                                          key={keyindex}
                                          value={item.eduname}
                                        >
                                          {item.label}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </Col>
                                <Col ///////////////////////Stream
                                  xs={12}
                                  sm={12}
                                  md={8}
                                  lg={4}
                                  xl={4}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Stream"
                                    className="pb-2 labelTextFresher"
                                  >
                                    Enter Stream{"\n"}
                                    <span className="asteriskkey">*</span>
                                  </label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      style={{
                                        backgroundColor: theme.inputFieldColor,
                                        color: theme.inputTextColor,
                                        boxShadow: theme.inputfieldShadow,
                                      }}
                                      className="form-control inputTxt"
                                      placeholder="Computer Science"
                                      onChange={(e) => {
                                        handleChange(e);
                                        setFstreamVal(e.target.value);
                                      }}
                                      value={values.fstream}
                                      name="fstream"
                                    ></input>
                                  </div>
                                  {errors.fstream && (
                                    <div className="errortext pt-2">
                                      {errors.fstream}
                                    </div>
                                  )}
                                </Col>

                                <Col //////////////////////  University Name
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={6}
                                  xl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="University"
                                    className="pb-2 labelTextFresher"
                                  >
                                    Enter University Name{"\n"}
                                    <span className="asteriskkey">*</span>
                                  </label>
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <div
                                        className="input-group-text h-100"
                                        style={{
                                          backgroundColor:
                                            theme.inputPrependColor,
                                          color: theme.inputIcon,
                                          boxShadow: theme.inputfieldShadow,
                                        }}
                                      >
                                        <FontAwesomeIcon
                                          icon={faGraduationCap}
                                        />
                                      </div>
                                    </div>
                                    <input
                                      type="text"
                                      style={{
                                        backgroundColor: theme.inputFieldColor,
                                        color: theme.inputTextColor,
                                        boxShadow: theme.inputfieldShadow,
                                      }}
                                      className="form-control inputTxt"
                                      placeholder="Ex: Visveswaraya Technological University"
                                      onChange={(e) => {
                                        handleChange(e);
                                        setFuniversitynameVal(e.target.value);
                                      }}
                                      value={values.funiversity}
                                      name="funiversity"
                                    ></input>
                                  </div>
                                  {errors.funiversity && (
                                    <div className="errortext pt-2">
                                      {errors.funiversity}
                                    </div>
                                  )}
                                </Col>
                                <Col ///////////////////////Degree Month
                                  xs={12}
                                  sm={12}
                                  md={4}
                                  lg={6}
                                  xl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Months"
                                    className="pb-2 labelTextFresher"
                                  >
                                    Select Month
                                  </label>
                                  <select
                                    style={{
                                      backgroundColor: theme.inputFieldColor,
                                      color: theme.inputTextColor,
                                      boxShadow: theme.inputfieldShadow,
                                    }}
                                    className="form-control form-select"
                                    onChange={monthfromSelect}
                                    value={fmonthfromval}
                                  >
                                    {monthNames.map((item, keyindex) => {
                                      return (
                                        <option
                                          key={keyindex}
                                          value={item.eduname}
                                        >
                                          {item.label}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </Col>
                                <Col ///////////////////////Year From
                                  xs={12}
                                  sm={12}
                                  md={4}
                                  lg={3}
                                  xl={3}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Years"
                                    className="pb-2 labelTextFresher"
                                  >
                                    Year From
                                  </label>
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <div
                                        className="input-group-text h-100"
                                        style={{
                                          backgroundColor:
                                            theme.inputPrependColor,
                                          color: theme.inputIcon,
                                          boxShadow: theme.inputfieldShadow,
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faCalendar} />
                                      </div>
                                    </div>
                                    <select
                                      style={{
                                        backgroundColor: theme.inputFieldColor,
                                        color: theme.inputTextColor,
                                        boxShadow: theme.inputfieldShadow,
                                      }}
                                      className="form-control form-select"
                                      onChange={yearfromdropdownSelect}
                                      value={fyearfromval}
                                    >
                                      {yearfromData.map((item, keyindex) => {
                                        return (
                                          <option
                                            key={keyindex}
                                            value={item.eduname}
                                          >
                                            {item.label}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </Col>
                                <Col ///////////////////////Year To
                                  xs={12}
                                  sm={12}
                                  md={4}
                                  lg={3}
                                  xl={3}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Years"
                                    className="pb-2 labelTextFresher"
                                  >
                                    Year To
                                  </label>
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <div
                                        className="input-group-text h-100"
                                        style={{
                                          backgroundColor:
                                            theme.inputPrependColor,
                                          color: theme.inputIcon,
                                          boxShadow: theme.inputfieldShadow,
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faCalendar} />
                                      </div>
                                    </div>
                                    <select
                                      style={{
                                        backgroundColor: theme.inputFieldColor,
                                        color: theme.inputTextColor,
                                        boxShadow: theme.inputfieldShadow,
                                      }}
                                      className="form-control form-select"
                                      onChange={yeartodropdownSelect}
                                      value={fyeartoval}
                                    >
                                      {yeartoData.map((item, keyindex) => {
                                        return (
                                          <option
                                            key={keyindex}
                                            value={item.eduname}
                                          >
                                            {item.label}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </Col>
                              </Row>

                              <Row className="gx-0 mb-4">
                                <label
                                  htmlFor="Certificate Details"
                                  className="pb-2 labelTitleTextFresher"
                                >
                                  Certificate Details{"\n"}
                                  <span className="asteriskkey">*</span>
                                </label>

                                <Col ///////////////////////Course Name
                                  xs={12}
                                  sm={12}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="CourseName"
                                    className="pb-2 labelTextFresher"
                                  >
                                    Enter Course Name{"\n"}
                                    <span className="asteriskkey">*</span>
                                  </label>
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <div
                                        className="input-group-text h-100"
                                        style={{
                                          backgroundColor:
                                            theme.inputPrependColor,
                                          color: theme.inputIcon,
                                          boxShadow: theme.inputfieldShadow,
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faAward} />
                                      </div>
                                    </div>
                                    <input
                                      type="text"
                                      style={{
                                        backgroundColor: theme.inputFieldColor,
                                        color: theme.inputTextColor,
                                        boxShadow: theme.inputfieldShadow,
                                      }}
                                      className="form-control inputTxt"
                                      placeholder="Ex: AWS Cloud"
                                      onChange={(e) => {
                                        handleChange(e);
                                        setFcoursenameVal(e.target.value);
                                      }}
                                      value={values.fcoursename}
                                      name="fcoursename"
                                    ></input>
                                  </div>
                                  {errors.fcoursename && (
                                    <div className="errortext pt-2">
                                      {errors.fcoursename}
                                    </div>
                                  )}
                                </Col>
                                <Col ///////////////////////Platform Name
                                  xs={12}
                                  sm={12}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Platform Name"
                                    className="pb-2 labelTextFresher"
                                  >
                                    Platform Name{"\n"}
                                    <span className="asteriskkey">*</span>
                                  </label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      style={{
                                        backgroundColor: theme.inputFieldColor,
                                        color: theme.inputTextColor,
                                        boxShadow: theme.inputfieldShadow,
                                      }}
                                      className="form-control inputTxt"
                                      placeholder="Ex: Udemy"
                                      onChange={(e) => {
                                        handleChange(e);
                                        setFplatnameVal(e.target.value);
                                      }}
                                      value={values.fplatform}
                                      name="fplatform"
                                    ></input>
                                  </div>
                                  {errors.fplatform && (
                                    <div className="errortext pt-2">
                                      {errors.fplatform}
                                    </div>
                                  )}
                                </Col>

                                <Col ///////////////////////Issued Month
                                  xs={12}
                                  sm={12}
                                  md={4}
                                  lg={4}
                                  xl={4}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Month"
                                    className="pb-2 labelTextFresher"
                                  >
                                    Issued Month
                                  </label>
                                  <div className="input-group">
                                    <select
                                      style={{
                                        backgroundColor: theme.inputFieldColor,
                                        color: theme.inputTextColor,
                                        boxShadow: theme.inputfieldShadow,
                                      }}
                                      className="form-control form-select"
                                      onChange={certificatemonthSelect}
                                      value={fcertificatemonthval}
                                    >
                                      {monthNames.map((item, keyindex) => {
                                        return (
                                          <option
                                            key={keyindex}
                                            value={item.eduname}
                                          >
                                            {item.label}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </Col>
                                <Col ///////////////////////Issued Year
                                  xs={12}
                                  sm={12}
                                  md={4}
                                  lg={3}
                                  xl={3}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Year"
                                    className="pb-2 labelTextFresher"
                                  >
                                    Issued Year
                                  </label>
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <div
                                        className="input-group-text h-100"
                                        style={{
                                          backgroundColor:
                                            theme.inputPrependColor,
                                          color: theme.inputIcon,
                                          boxShadow: theme.inputfieldShadow,
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faCalendar} />
                                      </div>
                                    </div>
                                    <select
                                      style={{
                                        backgroundColor: theme.inputFieldColor,
                                        color: theme.inputTextColor,
                                        boxShadow: theme.inputfieldShadow,
                                      }}
                                      className="form-control form-select"
                                      onChange={certificateyearSelect}
                                      value={fcertificateyearval}
                                    >
                                      {yearData.map((item, keyindex) => {
                                        return (
                                          <option
                                            key={keyindex}
                                            value={item.eduname}
                                          >
                                            {item.label}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                pt: 4,
                              }}
                            >
                              <Button
                                color="inherit"
                                variant="outlined"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                              >
                                Back
                              </Button>
                              <Box sx={{ flex: "1 1 auto" }} />
                              <Button
                                type="submit"
                                variant="outlined"
                                onClick={handleNext}
                              >
                                {activeStep === steps.length - 1
                                  ? "Finish"
                                  : "Next"}
                              </Button>
                            </Box>
                          </Form>
                        </>
                      )}
                    </Formik>
                  </Fragment>
                ) : null}
              </div>
            </Fragment>
          )}
        </Box>
      </div>
    </Fragment>
  );
});

export default memo(FresherFormScreen);
