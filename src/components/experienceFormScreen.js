import React, {
  memo,
  useState,
  useEffect,
  useContext,
  createRef,
  Fragment,
} from "react";
import "../css/experienceForm.css";
import { ThemeContext } from "../contexts/themeContext";
import {
  langOptions,
  educationOptions,
  monthNames,
  yearData,
  yearfromData,
  yeartoData,
  roleOptionsExperience,
  summarysuggestOptions,
} from "../json/json";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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
import { Formik, Form } from "formik";
import Select from "react-select";
import Pdf from "react-to-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faUser,
  faEnvelope,
  faPhone,
  faSuitcase,
  faInfoCircle,
  faLightbulb,
  faGraduationCap,
  faAward,
  faCalendar,
  faDownload,
  faFileArrowDown,
  faCommentDots,
  faQuestionCircle,
  faBriefcase,
  faLocationDot,
  faBuilding,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";

const steps = ["Step 1", "Step 2", "Step 3"];

const ExperienceFormScreen = memo(({ resumeIDInfo, resumenameInfo }) => {
  const [{ theme }] = useContext(ThemeContext);
  const pdffileref = createRef();
  const resumeIDval = resumeIDInfo;
  const resumeNameval = resumenameInfo;
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [preview, setPreview] = useState(false);
  const [eyeicon, setEyeicon] = useState(false);
  const [suggestmodalShow, setSuggestmodalShow] = useState(false);
  const [isselectLoading, setIsselectLoading] = useState(true);
  const [progSelectval, setProgSelectval] = useState("");
  const [skillnullexperience, setSkillnullexperience] = useState(false);
  const pdfSizeoptionsResume1 = {
    orientation: "portrait",
    unit: "in",
    format: [12, 12],
    // format: resumeIDInfo == "Resume11" ? [10, 14] : [8, 16],
  };
  const pdfSizeoptionsResume2 = {
    orientation: "portrait",
    unit: "in",
    format: [13.5, 13.5],
  };

  console.log("resumeidvalue---> ", resumeIDInfo);

  ////////    Form 1 Variables
  const [enameval, setEnameval] = useState("");
  const [eroleSelectval, setEroleSelectval] = useState("Software Engineer");
  const [eemailval, setEemailVal] = useState("");
  const [ephoneval, setEphoneval] = useState("");
  const [esummaryval, setEsummaryVal] = useState("");

  ///////    Form 2 Variables
  ////  Work Experience Variables
  const [eworkCname1val, setEworkCname1Val] = useState("");
  const [eworkLoc1val, setEworkLoc1Val] = useState("");
  const [eworkRole1val, setEworkRole1Val] = useState("");
  const [workonemonthfromval, setWorkonemonthfromval] = useState("January");
  const [workonemonthtoval, setWorkonemonthtoval] = useState("May");
  const [workoneyearfromval, setWorkoneFromyearval] = useState("2015");
  const [workoneyeartoval, setWorkoneToyearval] = useState("2019");
  const [workonepoint1exp, setWorkonepoint1exp] = useState("");
  const [workonepoint2exp, setWorkonepoint2exp] = useState("");

  const [eworkCname2val, setEworkCname2Val] = useState("");
  const [eworkLoc2val, setEworkLoc2Val] = useState("");
  const [eworkRole2val, setEworkRole2Val] = useState("");
  const [worktwomonthfromval, setWorktwomonthfromval] = useState("January");
  const [worktwomonthtoval, setWorktwomonthtoval] = useState("May");
  const [worktwoyearfromval, setWorktwoFromyearval] = useState("2015");
  const [worktwoyeartoval, setWorktwoToyearval] = useState("2019");
  const [worktwopoint1exp, setWorktwopoint1exp] = useState("");
  const [worktwopoint2exp, setWorktwopoint2exp] = useState("");

  const [eworkCname3val, setEworkCname3Val] = useState("");
  const [eworkLoc3val, setEworkLoc3Val] = useState("");
  const [eworkRole3val, setEworkRole3Val] = useState("");
  const [workthreemonthfromval, setWorkthreemonthfromval] = useState("January");
  const [workthreemonthtoval, setWorkthreemonthtoval] = useState("May");
  const [workthreeyearfromval, setWorkthreeFromyearval] = useState("2015");
  const [workthreeyeartoval, setWorkthreeToyearval] = useState("2019");
  const [workthreepoint1exp, setWorkthreepoint1exp] = useState("");
  const [workthreepoint2exp, setWorkthreepoint2exp] = useState("");

  const [isworkChecked2, setIsworkChecked2] = useState(false);
  const [isworkChecked3, setIsworkChecked3] = useState(false);

  const [ispresentChecked1, setIspresentChecked1] = useState(false);
  const [ispresentChecked2, setIspresentChecked2] = useState(false);
  const [ispresentChecked3, setIspresentChecked3] = useState(false);

  const [disablemonthyear1, setDisablemonthyear1] = useState(false);
  const [disablemonthyear2, setDisablemonthyear2] = useState(false);
  const [disablemonthyear3, setDisablemonthyear3] = useState(false);

  ////  Accordian Project Variables
  const [projectoneexp, setprojectoneexp] = useState("");
  const [projectoneroleexp, setprojectoneroleexp] = useState("");
  const [projectonetech1exp, setprojectonetech1exp] = useState("");
  const [projectonetech2exp, setprojectonetech2exp] = useState("");
  const [projectonetech3exp, setprojectonetech3exp] = useState("");
  const [projectonetech4exp, setprojectonetech4exp] = useState("");
  const [projectonepoint1exp, setprojectonepoint1exp] = useState("");
  const [projectonepoint2exp, setprojectonepoint2exp] = useState("");
  const [projectonepoint3exp, setprojectonepoint3exp] = useState("");
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
    eusername: enameval,
    eemail: eemailval,
    ephoneno: ephoneval,
    esummary: esummaryval,
    eworkCname1val: eworkCname1val,
    eworkLoc1val: eworkLoc1val,
    eworkRole1val: eworkRole1val,
    eworkonePoint1val: workonepoint1exp,
    eworkonePoint2val: workonepoint2exp,

    eworkCname2val: eworkCname2val,
    eworkLoc2val: eworkLoc2val,
    eworkRole2val: eworkRole2val,
    eworktwoPoint1val: worktwopoint1exp,
    eworktwoPoint2val: worktwopoint2exp,

    eworkCname3val: eworkCname3val,
    eworkLoc3val: eworkLoc3val,
    eworkRole3val: eworkRole3val,
    eworkthreePoint1val: workthreepoint1exp,
    eworkthreePoint2val: workthreepoint2exp,

    eprojectonename: projectoneexp,
    eprojectonerole: projectoneroleexp,
    eprojectonetech1: projectonetech1exp,
    eprojectonetech2: projectonetech2exp,
    eprojectonetech3: projectonetech3exp,
    eprojectonetech4: projectonetech4exp,
    eprojectonepoint1: projectonepoint1exp,
    eprojectonepoint2: projectonepoint2exp,
    eprojectonepoint3: projectonepoint3exp,

    eprojecttwoname: projecttwofresher,
    eprojecttworole: projecttworolefresher,
    eprojecttwotech1: projecttwotech1fresher,
    eprojecttwotech2: projecttwotech2fresher,
    eprojecttwotech3: projecttwotech3fresher,
    eprojecttwotech4: projecttwotech4fresher,
    eprojecttwopoint1: projecttwopoint1fresher,
    eprojecttwopoint2: projecttwopoint2fresher,
    eprojecttwopoint3: projecttwopoint3fresher,
    estream: fstreamval,
    euniversity: funiversitynameval,
    ecoursename: fcoursenameval,
    eplatform: fplatnameval,
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

  const skillColourStyles = {
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

  const isStepOptional = (step) => {
    return step === 1;
  };

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

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleNext = () => {
    scrollToTopNextStep();
    setSkillnullexperience(true);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleSubmitForm = async (values) => {
    handleNext();
  };

  const programSelectFresher = (newValue) => {
    if (newValue === null || newValue == "") {
      newValue = [0];
      setSkillnullexperience(true);
      setIsselectLoading(true);
    } else {
      setSkillnullexperience(false);
    }
    const array = [];
    newValue.map((obj) => {
      array.push(obj.value);
      setProgSelectval(array);
      console.log("array-->", array);
    });
    setIsselectLoading(false);
  };

  //////   Form 1 Functions
  const workroleSelect = (e) => {
    setEroleSelectval(e.target.value);
  };

  //////   Form 2 Functions
  const workonemonthfromSelect = (e) => {
    setWorkonemonthfromval(e.target.value);
  };
  const workonemonthtoSelect = (e) => {
    setWorkonemonthtoval(e.target.value);
  };
  const workoneyearfromSelect = (e) => {
    setWorkoneFromyearval(e.target.value);
  };
  const workoneyeartoSelect = (e) => {
    setWorkoneToyearval(e.target.value);
  };

  const worktwomonthfromSelect = (e) => {
    setWorktwomonthfromval(e.target.value);
  };
  const worktwomonthtoSelect = (e) => {
    setWorktwomonthtoval(e.target.value);
  };
  const worktwoyearfromSelect = (e) => {
    setWorktwoFromyearval(e.target.value);
  };
  const worktwoyeartoSelect = (e) => {
    setWorktwoToyearval(e.target.value);
  };

  const workthreemonthfromSelect = (e) => {
    setWorkthreemonthfromval(e.target.value);
  };
  const workthreemonthtoSelect = (e) => {
    setWorkthreemonthtoval(e.target.value);
  };
  const workthreeyearfromSelect = (e) => {
    setWorkthreeFromyearval(e.target.value);
  };
  const workthreeyeartoSelect = (e) => {
    setWorkthreeToyearval(e.target.value);
  };

  const work2checkClick = () => {
    setIsworkChecked2(!isworkChecked2);
  };

  const work3checkClick = () => {
    setIsworkChecked3(!isworkChecked3);
  };

  const present1checkClick = () => {
    setIspresentChecked1(!ispresentChecked1);
    setDisablemonthyear1(!disablemonthyear1);
  };

  const present2checkClick = () => {
    setIspresentChecked2(!ispresentChecked2);
    setDisablemonthyear2(!disablemonthyear2);
  };

  const present3checkClick = () => {
    setIspresentChecked3(!ispresentChecked3);
    setDisablemonthyear3(!disablemonthyear3);
  };

  ////  Form 3 Functions
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

    if (!values.eusername) {
      errors.eusername = "Username is required!";
    } else if (!/^[A-Za-z\b ]+$/.test(values.eusername)) {
      errors.eusername = "Please enter a Valid username.";
    }

    if (!values.eemail) {
      errors.eemail = "Email ID is required!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.eemail)
    ) {
      errors.eemail = "Please enter a Valid Email ID.";
    }

    if (!values.ephoneno) {
      errors.ephoneno = "Phone no is required!";
    } else if (!/[6-9]\d{9}$/i.test(values.ephoneno)) {
      errors.ephoneno = "Please enter a Valid 10-digit phone number.";
    }

    if (!values.esummary) {
      errors.esummary = "Career Objective / Summary is required!";
    } else if (
      !/^[a-zA-Z0-9\&\)\(\+\/\.\,\:\;\'\"\-\b\s ]+$/g.test(values.esummary)
    ) {
      errors.esummary = "Please enter the valid characters only.";
    }

    return errors;
  };

  const freshervalidateStep2 = (values) => {
    const errors = {};

    if (!values.eworkCname1val) {
      errors.eworkCname1val = "Company name is required!";
    } else if (!/^[A-Za-z\&\,\-\_\b ]+$/.test(values.eworkCname1val)) {
      errors.eworkCname1val = "Please enter a Valid Company name.";
    }

    if (!values.eworkLoc1val) {
      errors.eworkLoc1val = "Company Location is required!";
    } else if (!/^[A-Za-z\b ]+$/.test(values.eworkLoc1val)) {
      errors.eworkLoc1val = "Please enter a Valid Company Location.";
    }

    if (!values.eworkRole1val) {
      errors.eworkRole1val = "Role is required!";
    } else if (!/^[A-Za-z\b ]+$/.test(values.eworkRole1val)) {
      errors.eworkRole1val = "Please enter the valid characters only.";
    }

    if (!values.eworkCname2val) {
      errors.eworkCname2val = "Company name is required!";
    } else if (!/^[A-Za-z\&\,\-\_\b ]+$/.test(values.eworkCname2val)) {
      errors.eworkCname2val = "Please enter a Valid Company name.";
    }

    if (!values.eworkLoc2val) {
      errors.eworkLoc2val = "Company Location is required!";
    } else if (!/^[A-Za-z\b ]+$/.test(values.eworkLoc2val)) {
      errors.eworkLoc2val = "Please enter a Valid Company Location.";
    }

    if (!values.eworkRole2val) {
      errors.eworkRole2val = "Role is required!";
    } else if (!/^[A-Za-z\b ]+$/.test(values.eworkRole2val)) {
      errors.eworkRole2val = "Please enter the valid characters only.";
    }

    if (!values.eworkCname3val) {
      errors.eworkCname3val = "Company name is required!";
    } else if (!/^[A-Za-z\&\,\-\_\b ]+$/.test(values.eworkCname3val)) {
      errors.eworkCname3val = "Please enter a Valid Company name.";
    }

    if (!values.eworkLoc3val) {
      errors.eworkLoc3val = "Company Location is required!";
    } else if (!/^[A-Za-z\b ]+$/.test(values.eworkLoc3val)) {
      errors.eworkLoc3val = "Please enter a Valid Company Location.";
    }

    if (!values.eworkRole3val) {
      errors.eworkRole3val = "Role is required!";
    } else if (!/^[A-Za-z\b ]+$/.test(values.eworkRole3val)) {
      errors.eworkRole3val = "Please enter the valid characters only.";
    }

    if (!values.eworkonePoint1val) {
      errors.eworkonePoint1val = "Please enter Atleast 1 Work Exp point.";
    }
    if (!values.eworkonePoint1val || !values.eworkonePoint2val) {
      errors.eworkonePointval = "Please enter Atleast 1 Work Exp point.";
    }
    if (values.eworkonePoint1val || values.eworkonePoint2val) {
      errors.eworkonePointval = null;
    }

    if (!values.eworktwoPoint1val) {
      errors.eworktwoPoint1val = "Please enter Atleast 1 Work Exp point.";
    }
    if (!values.eworktwoPoint1val || !values.eworktwoPoint2val) {
      errors.eworktwoPointval = "Please enter Atleast 1 Work Exp point.";
    }
    if (values.eworktwoPoint1val || values.eworktwoPoint2val) {
      errors.eworktwoPointval = null;
    }

    if (!values.eworkthreePoint1val) {
      errors.eworkthreePoint1val = "Please enter Atleast 1 Work Exp point.";
    }
    if (!values.eworkthreePoint1val || !values.eworkthreePoint2val) {
      errors.eworkthreePointval = "Please enter Atleast 1 Work Exp point.";
    }
    if (values.eworkthreePoint1val || values.eworkthreePoint2val) {
      errors.eworkthreePointval = null;
    }

    if (!values.eprojectonename) {
      errors.eprojectonename = "Project name is required!";
    } else if (!/^[A-Za-z0-9\&\,\-\_\b ]+$/.test(values.eprojectonename)) {
      errors.eprojectonename =
        "Please enter a Valid Alphanumerical Characters only.";
    }

    if (!values.eprojectonerole) {
      errors.eprojectonerole = "Project Role is required!";
    } else if (!/^[A-Za-z\-\b ]+$/.test(values.eprojectonerole)) {
      errors.eprojectonerole =
        "Please enter a Valid Alphanumerical Characters only.";
    }
    if (
      !values.eprojectonetech1 ||
      !values.eprojectonetech2 ||
      !values.eprojectonetech3 
    ) {
      errors.eprojectonetech = "Please enter Atleast 3-4 Technologies.";
    }

    if (!values.eprojectonepoint1 || !values.eprojectonepoint2) {
      errors.eprojectonepoint = "Please enter Atleast 2-3 Points.";
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
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="p-2"
              >
                <div className="resume1Username">
                  <h3 style={{ color: "#000000" }}>{enameval}</h3>
                </div>
                <div className="resume1Role">
                  <h4 style={{ color: "#000000" }}>{eroleSelectval}</h4>
                </div>
                <div className="resume1Mail">
                  <h5 style={{ color: "#000000" }}>{eemailval}</h5>
                </div>
                <div className="resume1Phone">
                  <h5 style={{ color: "#000000" }}>{ephoneval}</h5>
                </div>
              </Col>
            </Row>
            <Row className="gx-0 mb-2">
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="p-2"
              >
                <div className="resume1Heading">
                  <h4 className="text-info">Professional Summary</h4>
                  <p>{esummaryval}</p>
                </div>
              </Col>
              <Row className="gx-0 mb-2">
                <Col
                  xs={12}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="p-2"
                >
                  <div className="resume1Heading">
                    <h4 className="text-info">PROJECTS</h4>
                  </div>
                  <div className="resume1Project-cont">
                    <h4>{projectoneexp}</h4>
                    <h5>{projectoneroleexp}</h5>
                    {projectonetech1exp === "" ? null : (
                      <p>
                        Technologies used: {projectonetech1exp},
                        {projectonetech2exp},{projectonetech3exp}
                      </p>
                    )}
                    <ul>
                      {projectonepoint1exp === "" ? null : (
                        <li>{projectonepoint1exp}</li>
                      )}
                      {projectonepoint2exp === "" ? null : (
                        <li>{projectonepoint2exp}</li>
                      )}
                      {projectonepoint3exp === "" ? null : (
                        <li>{projectonepoint3exp}</li>
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
                <Col
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={4}
                  xxl={4}
                  className="p-2"
                >
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
          <Container style={{ border: "1px solid #DDDDDD", height: "182vh" }}>
            <Row className="gx-0">
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <div style={{ backgroundColor: "#16365D", padding: "16px" }}>
                  <div className="resume1Username">
                    <h3 style={{ color: "#FFFFFF" }}>{enameval}</h3>
                  </div>
                  <div className="resume1Role">
                    <h4 style={{ color: "#FFFFFF" }}>{eroleSelectval}</h4>
                  </div>
                  <div className="resume1Mail">
                    <h5 style={{ color: "#FFFFFF" }}>{eemailval}</h5>
                  </div>
                  <div className="resume1Phone">
                    <h5 style={{ color: "#FFFFFF" }}>{ephoneval}</h5>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="gx-0 mb-2 p-4">
              <Col xs={9} sm={9} md={9} lg={9} xl={9} xxl={9} className="p-2">
                <div className="resume2Heading pb-3">
                  <h4 style={{ color: "#D13C39" }}>Professional Summary</h4>
                  <p>{esummaryval}</p>
                </div>

                <div className="resume1Heading">
                  <h4 style={{ color: "#D13C39" }}>PROJECTS</h4>
                </div>
                <div className="resume2Project-cont pb-2">
                  <h4>{projectoneexp}</h4>
                  <h5>{projectoneroleexp}</h5>
                  {projectonetech1exp === "" ? null : (
                    <p>
                      Technologies used: {projectonetech1exp},
                      {projectonetech2exp},{projectonetech3exp}
                    </p>
                  )}
                  <ul>
                    {projectonepoint1exp === "" ? null : (
                      <li>{projectonepoint1exp}</li>
                    )}
                    {projectonepoint2exp === "" ? null : (
                      <li>{projectonepoint2exp}</li>
                    )}
                    {projectonepoint3exp === "" ? null : (
                      <li>{projectonepoint3exp}</li>
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
              <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} className="p-2">
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
      <div className="experience-form">
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
                      className="stepTxtExperience"
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
                resumeIDInfo == "Resume11" ? (
                  <ResumeDesign1 />
                ) : resumeIDInfo == "Resume12" ? (
                  <ResumeDesign2 />
                ) : resumeIDInfo == "Resume13" ? (
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
              <div className="experience-formContent">
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
                              className="experience-forms-cont"
                              style={{
                                backgroundColor: theme.cardColor,
                                boxShadow: theme.cardShadow,
                              }}
                            >
                              <Row className="gx-0 mb-4">
                                <div className="experience-title">
                                  <h3 style={{ color: "#61DBFB" }}>
                                    Experience Form
                                  </h3>
                                </div>
                                <Col ///////////////////////Username
                                  xs={12}
                                  sm={12}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                  xxl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="firstname"
                                    className="pb-2 labelTextExperience"
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
                                        setEnameval(e.target.value);
                                      }}
                                      value={values.eusername}
                                      name="eusername"
                                    ></input>
                                  </div>
                                  {errors.eusername && (
                                    <div className="errortext pt-2">
                                      {errors.eusername}
                                    </div>
                                  )}
                                </Col>
                                <Col ///////////////////////RoleSelect
                                  xs={12}
                                  sm={12}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                  xxl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="role"
                                    className="pb-2 labelTextExperience"
                                  >
                                    Role:
                                  </label>
                                  <div>
                                    <select
                                      style={{
                                        backgroundColor: theme.inputFieldColor,
                                        color: theme.inputTextColor,
                                        boxShadow: theme.inputfieldShadow,
                                      }}
                                      className="form-control form-select"
                                      onChange={workroleSelect}
                                      value={eroleSelectval}
                                    >
                                      {roleOptionsExperience.map(
                                        (item, keyindex) => {
                                          return (
                                            <option
                                              key={keyindex}
                                              value={item.value}
                                            >
                                              {item.label}
                                            </option>
                                          );
                                        }
                                      )}
                                    </select>
                                  </div>
                                </Col>
                                <Col ///////////////////////Email
                                  xs={12}
                                  sm={12}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                  xxl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="emailID"
                                    className="pb-2 labelTextExperience"
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
                                        setEemailVal(e.target.value);
                                      }}
                                      value={values.eemail}
                                      name="eemail"
                                    ></input>
                                  </div>
                                  {errors.eemail && (
                                    <div className="errortext pt-2">
                                      {errors.eemail}
                                    </div>
                                  )}
                                </Col>
                                <Col ///////////////////////Phonenumber
                                  xs={12}
                                  sm={12}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                  xxl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="phoneno"
                                    className="pb-2 labelTextExperience"
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
                                        setEphoneval(e.target.value);
                                      }}
                                      value={values.ephoneno}
                                      name="ephoneno"
                                    ></input>
                                  </div>
                                  {errors.ephoneno && (
                                    <div className="errortext pt-2">
                                      {errors.ephoneno}
                                    </div>
                                  )}
                                </Col>
                                <Col ///////////////////////Summary
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                  xxl={12}
                                  className="p-2 mb-2"
                                >
                                  <div className="labelFlex">
                                    <label
                                      htmlFor="summary"
                                      className="pb-2 labelTextExperience"
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
                                        setEsummaryVal(e.target.value);
                                      }}
                                      value={values.esummary}
                                      name="esummary"
                                    ></textarea>
                                  </div>
                                  {errors.esummary && (
                                    <div className="errortext pt-2">
                                      {errors.esummary}
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
                                onClick={handleNext}
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
                              className="experience-forms-cont"
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
                                  xxl={12}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Skills"
                                    className="pb-2 labelTitleTextExperience"
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
                                    styles={skillColourStyles}
                                    isLoading={isselectLoading}
                                    onChange={programSelectFresher}
                                    options={langOptions}
                                  />
                                  {skillnullexperience === true && (
                                    <div className="errortext pt-3">
                                      Please select Atleast 3-4 Skills.
                                    </div>
                                  )}
                                </Col>
                                <Col ///////////////////////  Work experience 1 starts here
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                  xxl={12}
                                  className="p-2"
                                >
                                  <Row className="gx-0">
                                    <label
                                      htmlFor="Work Exp"
                                      className="pb-2 labelTitleTextExperience"
                                    >
                                      Work Experience 1{"\n"}
                                      <span className="asteriskkey">*</span>
                                    </label>

                                    <Col /////////////////////// Company Name
                                      xs={12}
                                      sm={12}
                                      md={5}
                                      lg={5}
                                      xl={5}
                                      xxl={5}
                                      className="p-2 mb-2"
                                    >
                                      <label
                                        htmlFor="Stream"
                                        className="pb-2 labelTextExperience"
                                      >
                                        Company Name{"\n"}
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
                                              icon={faLandmark}
                                            />
                                          </div>
                                        </div>
                                        <input
                                          type="text"
                                          style={{
                                            backgroundColor:
                                              theme.inputFieldColor,
                                            color: theme.inputTextColor,
                                            boxShadow: theme.inputfieldShadow,
                                          }}
                                          className="form-control inputTxt"
                                          placeholder="Enter full name"
                                          onChange={(e) => {
                                            handleChange(e);
                                            setEworkCname1Val(e.target.value);
                                          }}
                                          value={values.eworkCname1val}
                                          name="eworkCname1val"
                                        ></input>
                                      </div>
                                      {errors.eworkCname1val && (
                                        <div className="errortext pt-2">
                                          {errors.eworkCname1val}
                                        </div>
                                      )}
                                    </Col>

                                    <Col //////////////////////  Location
                                      xs={12}
                                      sm={12}
                                      md={3}
                                      lg={3}
                                      xl={3}
                                      xxl={3}
                                      className="p-2 mb-2"
                                    >
                                      <label
                                        htmlFor="University"
                                        className="pb-2 labelTextExperience"
                                      >
                                        Location{"\n"}
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
                                              icon={faLocationDot}
                                            />
                                          </div>
                                        </div>
                                        <input
                                          type="text"
                                          style={{
                                            backgroundColor:
                                              theme.inputFieldColor,
                                            color: theme.inputTextColor,
                                            boxShadow: theme.inputfieldShadow,
                                          }}
                                          className="form-control inputTxt"
                                          placeholder="Company location"
                                          onChange={(e) => {
                                            handleChange(e);
                                            setEworkLoc1Val(e.target.value);
                                          }}
                                          value={values.eworkLoc1val}
                                          name="eworkLoc1val"
                                        ></input>
                                      </div>
                                      {errors.eworkLoc1val && (
                                        <div className="errortext pt-2">
                                          {errors.eworkLoc1val}
                                        </div>
                                      )}
                                    </Col>

                                    <Col ////////////////////  Work Role
                                      xs={12}
                                      sm={12}
                                      md={4}
                                      lg={4}
                                      xl={4}
                                      xxl={4}
                                      className="p-2 mb-2"
                                    >
                                      <label
                                        htmlFor="Degree"
                                        className="pb-2 labelTextExperience"
                                      >
                                        Role{"\n"}
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
                                              icon={faBriefcase}
                                            />
                                          </div>
                                        </div>
                                        <input
                                          type="text"
                                          style={{
                                            backgroundColor:
                                              theme.inputFieldColor,
                                            color: theme.inputTextColor,
                                            boxShadow: theme.inputfieldShadow,
                                          }}
                                          className="form-control inputTxt"
                                          placeholder="Ex: Software Engineer"
                                          onChange={(e) => {
                                            handleChange(e);
                                            setEworkRole1Val(e.target.value);
                                          }}
                                          value={values.eworkRole1val}
                                          name="eworkRole1val"
                                        ></input>
                                      </div>
                                      {errors.eworkRole1val && (
                                        <div className="errortext pt-2">
                                          {errors.eworkRole1val}
                                        </div>
                                      )}
                                    </Col>

                                    <Col ///////////////////////Work Month From
                                      xs={12}
                                      sm={12}
                                      md={3}
                                      lg={3}
                                      xl={3}
                                      xxl={3}
                                      className="p-2 mb-2"
                                    >
                                      <label
                                        htmlFor="Months"
                                        className="pb-2 labelTextExperience"
                                      >
                                        Month From
                                      </label>
                                      <select
                                        style={{
                                          backgroundColor:
                                            theme.inputFieldColor,
                                          color: theme.inputTextColor,
                                          boxShadow: theme.inputfieldShadow,
                                        }}
                                        className="form-control form-select"
                                        onChange={workonemonthfromSelect}
                                        value={workonemonthfromval}
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
                                      md={3}
                                      lg={3}
                                      xl={3}
                                      xxl={3}
                                      className="p-2 mb-2"
                                    >
                                      <label
                                        htmlFor="Years"
                                        className="pb-2 labelTextExperience"
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
                                            <FontAwesomeIcon
                                              icon={faCalendar}
                                            />
                                          </div>
                                        </div>
                                        <select
                                          style={{
                                            backgroundColor:
                                              theme.inputFieldColor,
                                            color: theme.inputTextColor,
                                            boxShadow: theme.inputfieldShadow,
                                          }}
                                          className="form-control form-select"
                                          onChange={workoneyearfromSelect}
                                          value={workoneyearfromval}
                                        >
                                          {yearfromData.map(
                                            (item, keyindex) => {
                                              return (
                                                <option
                                                  key={keyindex}
                                                  value={item.eduname}
                                                >
                                                  {item.label}
                                                </option>
                                              );
                                            }
                                          )}
                                        </select>
                                      </div>
                                    </Col>
                                    <Col ///////////////////////Work Month To
                                      xs={12}
                                      sm={12}
                                      md={3}
                                      lg={3}
                                      xl={3}
                                      xxl={3}
                                      className="p-2 mb-2"
                                    >
                                      <label
                                        htmlFor="Months"
                                        className="pb-2 labelTextExperience"
                                      >
                                        Month To
                                      </label>
                                      <select
                                        style={{
                                          backgroundColor:
                                            disablemonthyear1 === false &&
                                            theme.inputFieldColor,
                                          color:
                                            disablemonthyear1 === false &&
                                            theme.inputTextColor,
                                          boxShadow: theme.inputfieldShadow,
                                        }}
                                        className="form-control form-select"
                                        onChange={workonemonthtoSelect}
                                        value={workonemonthtoval}
                                        disabled={disablemonthyear1}
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
                                    <Col ///////////////////////Year To
                                      xs={12}
                                      sm={12}
                                      md={4}
                                      lg={3}
                                      xl={3}
                                      xxl={3}
                                      className="p-2 mb-2"
                                    >
                                      <label
                                        htmlFor="Years"
                                        className="pb-2 labelTextExperience"
                                      >
                                        Year To
                                      </label>
                                      <div className="input-group">
                                        <div className="input-group-prepend">
                                          <div
                                            className="input-group-text h-100"
                                            style={{
                                              backgroundColor:
                                                disablemonthyear1 === false &&
                                                theme.inputPrependColor,
                                              color:
                                                disablemonthyear1 === false &&
                                                theme.inputIcon,
                                              boxShadow: theme.inputfieldShadow,
                                            }}
                                          >
                                            <FontAwesomeIcon
                                              icon={faCalendar}
                                            />
                                          </div>
                                        </div>
                                        <select
                                          style={{
                                            backgroundColor:
                                              disablemonthyear1 === false &&
                                              theme.inputFieldColor,
                                            color:
                                              disablemonthyear1 === false &&
                                              theme.inputTextColor,
                                            boxShadow: theme.inputfieldShadow,
                                          }}
                                          className="form-control form-select"
                                          onChange={workoneyeartoSelect}
                                          value={workoneyeartoval}
                                          disabled={disablemonthyear1}
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

                                    <div className="p-2">
                                      <input
                                        type="checkbox"
                                        style={{
                                          height: "15px",
                                          width: "15px",
                                        }}
                                        checked={ispresentChecked1}
                                        onChange={present1checkClick}
                                      />
                                      <span className="leftcardcheckboxtext text-danger">
                                        &nbsp;&nbsp;Present
                                      </span>
                                    </div>

                                    <Col ///////////////////////Work Point 1
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={12}
                                      xl={12}
                                      xxl={12}
                                      className="p-2"
                                    >
                                      <div className="input-group">
                                        <textarea
                                          style={{
                                            backgroundColor:
                                              theme.inputFieldColor,
                                            color: theme.inputTextColor,
                                            boxShadow: theme.inputfieldShadow,
                                          }}
                                          className="form-control inputTxt"
                                          placeholder="Enter point 1"
                                          rows="2"
                                          onChange={(e) => {
                                            handleChange(e);
                                            setWorkonepoint1exp(e.target.value);
                                          }}
                                          value={values.eworkonePoint1val}
                                          name="eworkonePoint1val"
                                        ></textarea>
                                      </div>
                                    </Col>
                                    <Col ///////////////////////Work Point 2
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={12}
                                      xl={12}
                                      xxl={12}
                                      className="p-2 mb-3"
                                    >
                                      <div className="input-group">
                                        <textarea
                                          style={{
                                            backgroundColor:
                                              theme.inputFieldColor,
                                            color: theme.inputTextColor,
                                            boxShadow: theme.inputfieldShadow,
                                          }}
                                          className="form-control inputTxt"
                                          placeholder="Enter point 2"
                                          rows="2"
                                          onChange={(e) => {
                                            handleChange(e);
                                            setWorkonepoint2exp(e.target.value);
                                          }}
                                          value={values.eworkonePoint2val}
                                          name="eworkonePoint2val"
                                        ></textarea>
                                      </div>
                                      {errors.eworkonePointval && (
                                        <div className="errortext pt-3">
                                          {errors.eworkonePointval}
                                        </div>
                                      )}
                                    </Col>

                                    {/* <hr></hr> */}
                                  </Row>
                                </Col>
                                <div className="p-2">
                                  <input
                                    type="checkbox"
                                    style={{
                                      height: "15px",
                                      width: "15px",
                                    }}
                                    checked={isworkChecked2}
                                    onChange={work2checkClick}
                                  />
                                  <span className="labelTitleTextExperience">
                                    &nbsp;&nbsp;Work Experience 2
                                    <span className="leftcardcheckboxtext text-danger">
                                      {" "}
                                      (Check this If Applicable)
                                    </span>
                                  </span>
                                </div>

                                {isworkChecked2 ? (
                                  <Fragment>
                                    <Col ///////////////////////  Work experience 2 starts here
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={12}
                                      xl={12}
                                      xxl={12}
                                      className="p-2"
                                    >
                                      <Row className="gx-0">
                                        <Col /////////////////////// Company Name
                                          xs={12}
                                          sm={12}
                                          md={5}
                                          lg={5}
                                          xl={5}
                                          xxl={5}
                                          className="p-2 mb-2"
                                        >
                                          <label
                                            htmlFor="Stream"
                                            className="pb-2 labelTextExperience"
                                          >
                                            Company Name{"\n"}
                                            <span className="asteriskkey">
                                              *
                                            </span>
                                          </label>
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
                                                  icon={faLandmark}
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
                                              placeholder="Enter full name"
                                              onChange={(e) => {
                                                handleChange(e);
                                                setEworkCname2Val(
                                                  e.target.value
                                                );
                                              }}
                                              value={values.eworkCname2val}
                                              name="eworkCname2val"
                                            ></input>
                                          </div>
                                          {errors.eworkCname2val && (
                                            <div className="errortext pt-2">
                                              {errors.eworkCname2val}
                                            </div>
                                          )}
                                        </Col>

                                        <Col //////////////////////  Location
                                          xs={12}
                                          sm={12}
                                          md={3}
                                          lg={3}
                                          xl={3}
                                          xxl={3}
                                          className="p-2 mb-2"
                                        >
                                          <label
                                            htmlFor="University"
                                            className="pb-2 labelTextExperience"
                                          >
                                            Location{"\n"}
                                            <span className="asteriskkey">
                                              *
                                            </span>
                                          </label>
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
                                                  icon={faLocationDot}
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
                                              placeholder="Company location"
                                              onChange={(e) => {
                                                handleChange(e);
                                                setEworkLoc2Val(e.target.value);
                                              }}
                                              value={values.eworkLoc2val}
                                              name="eworkLoc2val"
                                            ></input>
                                          </div>
                                          {errors.eworkLoc2val && (
                                            <div className="errortext pt-2">
                                              {errors.eworkLoc2val}
                                            </div>
                                          )}
                                        </Col>

                                        <Col ////////////////////  Work Role
                                          xs={12}
                                          sm={12}
                                          md={4}
                                          lg={4}
                                          xl={4}
                                          xxl={4}
                                          className="p-2 mb-2"
                                        >
                                          <label
                                            htmlFor="Degree"
                                            className="pb-2 labelTextExperience"
                                          >
                                            Role{"\n"}
                                            <span className="asteriskkey">
                                              *
                                            </span>
                                          </label>
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
                                                  icon={faBriefcase}
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
                                              placeholder="Ex: Software Engineer"
                                              onChange={(e) => {
                                                handleChange(e);
                                                setEworkRole2Val(
                                                  e.target.value
                                                );
                                              }}
                                              value={values.eworkRole2val}
                                              name="eworkRole2val"
                                            ></input>
                                          </div>
                                          {errors.eworkRole2val && (
                                            <div className="errortext pt-2">
                                              {errors.eworkRole2val}
                                            </div>
                                          )}
                                        </Col>

                                        <Col ///////////////////////Work Month From
                                          xs={12}
                                          sm={12}
                                          md={3}
                                          lg={3}
                                          xl={3}
                                          xxl={3}
                                          className="p-2 mb-2"
                                        >
                                          <label
                                            htmlFor="Months"
                                            className="pb-2 labelTextExperience"
                                          >
                                            Month From
                                          </label>
                                          <select
                                            style={{
                                              backgroundColor:
                                                theme.inputFieldColor,
                                              color: theme.inputTextColor,
                                              boxShadow: theme.inputfieldShadow,
                                            }}
                                            className="form-control form-select"
                                            onChange={worktwomonthfromSelect}
                                            value={worktwomonthfromval}
                                          >
                                            {monthNames.map(
                                              (item, keyindex) => {
                                                return (
                                                  <option
                                                    key={keyindex}
                                                    value={item.eduname}
                                                  >
                                                    {item.label}
                                                  </option>
                                                );
                                              }
                                            )}
                                          </select>
                                        </Col>

                                        <Col ///////////////////////Year From
                                          xs={12}
                                          sm={12}
                                          md={3}
                                          lg={3}
                                          xl={3}
                                          xxl={3}
                                          className="p-2 mb-2"
                                        >
                                          <label
                                            htmlFor="Years"
                                            className="pb-2 labelTextExperience"
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
                                                  boxShadow:
                                                    theme.inputfieldShadow,
                                                }}
                                              >
                                                <FontAwesomeIcon
                                                  icon={faCalendar}
                                                />
                                              </div>
                                            </div>
                                            <select
                                              style={{
                                                backgroundColor:
                                                  theme.inputFieldColor,
                                                color: theme.inputTextColor,
                                                boxShadow:
                                                  theme.inputfieldShadow,
                                              }}
                                              className="form-control form-select"
                                              onChange={worktwoyearfromSelect}
                                              value={worktwoyearfromval}
                                            >
                                              {yearfromData.map(
                                                (item, keyindex) => {
                                                  return (
                                                    <option
                                                      key={keyindex}
                                                      value={item.eduname}
                                                    >
                                                      {item.label}
                                                    </option>
                                                  );
                                                }
                                              )}
                                            </select>
                                          </div>
                                        </Col>
                                        <Col ///////////////////////Work Month To
                                          xs={12}
                                          sm={12}
                                          md={3}
                                          lg={3}
                                          xl={3}
                                          xxl={3}
                                          className="p-2 mb-2"
                                        >
                                          <label
                                            htmlFor="Months"
                                            className="pb-2 labelTextExperience"
                                          >
                                            Month To
                                          </label>
                                          <select
                                            style={{
                                              backgroundColor:
                                                disablemonthyear2 === false &&
                                                theme.inputFieldColor,
                                              color:
                                                disablemonthyear2 === false &&
                                                theme.inputTextColor,
                                              boxShadow: theme.inputfieldShadow,
                                            }}
                                            className="form-control form-select"
                                            onChange={worktwomonthtoSelect}
                                            value={worktwomonthtoval}
                                            disabled={disablemonthyear2}
                                          >
                                            {monthNames.map(
                                              (item, keyindex) => {
                                                return (
                                                  <option
                                                    key={keyindex}
                                                    value={item.eduname}
                                                  >
                                                    {item.label}
                                                  </option>
                                                );
                                              }
                                            )}
                                          </select>
                                        </Col>
                                        <Col ///////////////////////Year To
                                          xs={12}
                                          sm={12}
                                          md={4}
                                          lg={3}
                                          xl={3}
                                          xxl={3}
                                          className="p-2 mb-2"
                                        >
                                          <label
                                            htmlFor="Years"
                                            className="pb-2 labelTextExperience"
                                          >
                                            Year To
                                          </label>
                                          <div className="input-group">
                                            <div className="input-group-prepend">
                                              <div
                                                className="input-group-text h-100"
                                                style={{
                                                  backgroundColor:
                                                    disablemonthyear2 ===
                                                      false &&
                                                    theme.inputPrependColor,
                                                  color:
                                                    disablemonthyear2 ===
                                                      false && theme.inputIcon,
                                                  boxShadow:
                                                    theme.inputfieldShadow,
                                                }}
                                              >
                                                <FontAwesomeIcon
                                                  icon={faCalendar}
                                                />
                                              </div>
                                            </div>
                                            <select
                                              style={{
                                                backgroundColor:
                                                  disablemonthyear2 === false &&
                                                  theme.inputFieldColor,
                                                color:
                                                  disablemonthyear2 === false &&
                                                  theme.inputTextColor,
                                                boxShadow:
                                                  theme.inputfieldShadow,
                                              }}
                                              className="form-control form-select"
                                              onChange={worktwoyeartoSelect}
                                              value={worktwoyeartoval}
                                              disabled={disablemonthyear2}
                                            >
                                              {yeartoData.map(
                                                (item, keyindex) => {
                                                  return (
                                                    <option
                                                      key={keyindex}
                                                      value={item.eduname}
                                                    >
                                                      {item.label}
                                                    </option>
                                                  );
                                                }
                                              )}
                                            </select>
                                          </div>
                                        </Col>

                                        <div className="p-2">
                                          <input
                                            type="checkbox"
                                            style={{
                                              height: "15px",
                                              width: "15px",
                                            }}
                                            checked={ispresentChecked2}
                                            onChange={present2checkClick}
                                          />
                                          <span className="leftcardcheckboxtext text-danger">
                                            &nbsp;&nbsp;Present
                                          </span>
                                        </div>

                                        <Col ///////////////////////Work Point 1
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={12}
                                          xl={12}
                                          xxl={12}
                                          className="p-2"
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
                                                setWorktwopoint1exp(
                                                  e.target.value
                                                );
                                              }}
                                              value={values.eworktwoPoint1val}
                                              name="eworktwoPoint1val"
                                            ></textarea>
                                          </div>
                                        </Col>
                                        <Col ///////////////////////Work Point 2
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={12}
                                          xl={12}
                                          xxl={12}
                                          className="p-2 mb-3"
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
                                                setWorktwopoint2exp(
                                                  e.target.value
                                                );
                                              }}
                                              value={values.eworktwoPoint2val}
                                              name="eworktwoPoint2val"
                                            ></textarea>
                                          </div>
                                          {errors.eworktwoPointval && (
                                            <div className="errortext pt-3">
                                              {errors.eworktwoPointval}
                                            </div>
                                          )}
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Fragment>
                                ) : null}

                                <div className="p-2">
                                  <input
                                    type="checkbox"
                                    style={{
                                      height: "15px",
                                      width: "15px",
                                    }}
                                    checked={isworkChecked3}
                                    onChange={work3checkClick}
                                  />
                                  <span className="labelTitleTextExperience">
                                    &nbsp;&nbsp;Work Experience 3
                                    <span className="leftcardcheckboxtext text-danger">
                                      {" "}
                                      (Check this If Applicable)
                                    </span>
                                  </span>
                                </div>

                                {isworkChecked3 ? (
                                  <Fragment>
                                    <Col ///////////////////////  Work experience 3 starts here
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={12}
                                      xl={12}
                                      xxl={12}
                                      className="p-2"
                                    >
                                      <Row className="gx-0">
                                        <Col /////////////////////// Company Name
                                          xs={12}
                                          sm={12}
                                          md={5}
                                          lg={5}
                                          xl={5}
                                          xxl={5}
                                          className="p-2 mb-2"
                                        >
                                          <label
                                            htmlFor="Stream"
                                            className="pb-2 labelTextExperience"
                                          >
                                            Company Name{"\n"}
                                            <span className="asteriskkey">
                                              *
                                            </span>
                                          </label>
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
                                                  icon={faLandmark}
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
                                              placeholder="Enter full name"
                                              onChange={(e) => {
                                                handleChange(e);
                                                setEworkCname3Val(
                                                  e.target.value
                                                );
                                              }}
                                              value={values.eworkCname3val}
                                              name="eworkCname3val"
                                            ></input>
                                          </div>
                                          {errors.eworkCname3val && (
                                            <div className="errortext pt-2">
                                              {errors.eworkCname3val}
                                            </div>
                                          )}
                                        </Col>

                                        <Col //////////////////////  Location
                                          xs={12}
                                          sm={12}
                                          md={3}
                                          lg={3}
                                          xl={3}
                                          xxl={3}
                                          className="p-2 mb-2"
                                        >
                                          <label
                                            htmlFor="University"
                                            className="pb-2 labelTextExperience"
                                          >
                                            Location{"\n"}
                                            <span className="asteriskkey">
                                              *
                                            </span>
                                          </label>
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
                                                  icon={faLocationDot}
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
                                              placeholder="Company location"
                                              onChange={(e) => {
                                                handleChange(e);
                                                setEworkLoc3Val(e.target.value);
                                              }}
                                              value={values.eworkLoc3val}
                                              name="eworkLoc3val"
                                            ></input>
                                          </div>
                                          {errors.eworkLoc3val && (
                                            <div className="errortext pt-2">
                                              {errors.eworkLoc3val}
                                            </div>
                                          )}
                                        </Col>

                                        <Col ////////////////////  Work Role
                                          xs={12}
                                          sm={12}
                                          md={4}
                                          lg={4}
                                          xl={4}
                                          xxl={4}
                                          className="p-2 mb-2"
                                        >
                                          <label
                                            htmlFor="Degree"
                                            className="pb-2 labelTextExperience"
                                          >
                                            Role{"\n"}
                                            <span className="asteriskkey">
                                              *
                                            </span>
                                          </label>
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
                                                  icon={faBriefcase}
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
                                              placeholder="Ex: Software Engineer"
                                              onChange={(e) => {
                                                handleChange(e);
                                                setEworkRole3Val(
                                                  e.target.value
                                                );
                                              }}
                                              value={values.eworkRole3val}
                                              name="eworkRole3val"
                                            ></input>
                                          </div>
                                          {errors.eworkRole3val && (
                                            <div className="errortext pt-2">
                                              {errors.eworkRole3val}
                                            </div>
                                          )}
                                        </Col>

                                        <Col ///////////////////////Work Month From
                                          xs={12}
                                          sm={12}
                                          md={3}
                                          lg={3}
                                          xl={3}
                                          xxl={3}
                                          className="p-2 mb-2"
                                        >
                                          <label
                                            htmlFor="Months"
                                            className="pb-2 labelTextExperience"
                                          >
                                            Month From
                                          </label>
                                          <select
                                            style={{
                                              backgroundColor:
                                                theme.inputFieldColor,
                                              color: theme.inputTextColor,
                                              boxShadow: theme.inputfieldShadow,
                                            }}
                                            className="form-control form-select"
                                            onChange={workthreemonthfromSelect}
                                            value={workthreemonthfromval}
                                          >
                                            {monthNames.map(
                                              (item, keyindex) => {
                                                return (
                                                  <option
                                                    key={keyindex}
                                                    value={item.eduname}
                                                  >
                                                    {item.label}
                                                  </option>
                                                );
                                              }
                                            )}
                                          </select>
                                        </Col>

                                        <Col ///////////////////////Year From
                                          xs={12}
                                          sm={12}
                                          md={3}
                                          lg={3}
                                          xl={3}
                                          xxl={3}
                                          className="p-2 mb-2"
                                        >
                                          <label
                                            htmlFor="Years"
                                            className="pb-2 labelTextExperience"
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
                                                  boxShadow:
                                                    theme.inputfieldShadow,
                                                }}
                                              >
                                                <FontAwesomeIcon
                                                  icon={faCalendar}
                                                />
                                              </div>
                                            </div>
                                            <select
                                              style={{
                                                backgroundColor:
                                                  theme.inputFieldColor,
                                                color: theme.inputTextColor,
                                                boxShadow:
                                                  theme.inputfieldShadow,
                                              }}
                                              className="form-control form-select"
                                              onChange={workthreeyearfromSelect}
                                              value={workthreeyearfromval}
                                            >
                                              {yearfromData.map(
                                                (item, keyindex) => {
                                                  return (
                                                    <option
                                                      key={keyindex}
                                                      value={item.eduname}
                                                    >
                                                      {item.label}
                                                    </option>
                                                  );
                                                }
                                              )}
                                            </select>
                                          </div>
                                        </Col>
                                        <Col ///////////////////////Work Month To
                                          xs={12}
                                          sm={12}
                                          md={3}
                                          lg={3}
                                          xl={3}
                                          xxl={3}
                                          className="p-2 mb-2"
                                        >
                                          <label
                                            htmlFor="Months"
                                            className="pb-2 labelTextExperience"
                                          >
                                            Month To
                                          </label>
                                          <select
                                            style={{
                                              backgroundColor:
                                                disablemonthyear3 === false &&
                                                theme.inputFieldColor,
                                              color:
                                                disablemonthyear3 === false &&
                                                theme.inputTextColor,
                                              boxShadow: theme.inputfieldShadow,
                                            }}
                                            className="form-control form-select"
                                            onChange={workthreemonthtoSelect}
                                            value={workthreemonthtoval}
                                            disabled={disablemonthyear3}
                                          >
                                            {monthNames.map(
                                              (item, keyindex) => {
                                                return (
                                                  <option
                                                    key={keyindex}
                                                    value={item.eduname}
                                                  >
                                                    {item.label}
                                                  </option>
                                                );
                                              }
                                            )}
                                          </select>
                                        </Col>
                                        <Col ///////////////////////Year To
                                          xs={12}
                                          sm={12}
                                          md={4}
                                          lg={3}
                                          xl={3}
                                          xxl={3}
                                          className="p-2 mb-2"
                                        >
                                          <label
                                            htmlFor="Years"
                                            className="pb-2 labelTextExperience"
                                          >
                                            Year To
                                          </label>
                                          <div className="input-group">
                                            <div className="input-group-prepend">
                                              <div
                                                className="input-group-text h-100"
                                                style={{
                                                  backgroundColor:
                                                    disablemonthyear3 ===
                                                      false &&
                                                    theme.inputPrependColor,
                                                  color:
                                                    disablemonthyear3 ===
                                                      false && theme.inputIcon,
                                                  boxShadow:
                                                    theme.inputfieldShadow,
                                                }}
                                              >
                                                <FontAwesomeIcon
                                                  icon={faCalendar}
                                                />
                                              </div>
                                            </div>
                                            <select
                                              style={{
                                                backgroundColor:
                                                  disablemonthyear3 === false &&
                                                  theme.inputFieldColor,
                                                color:
                                                  disablemonthyear3 === false &&
                                                  theme.inputTextColor,
                                                boxShadow:
                                                  theme.inputfieldShadow,
                                              }}
                                              className="form-control form-select"
                                              onChange={workthreeyeartoSelect}
                                              value={workthreeyeartoval}
                                              disabled={disablemonthyear3}
                                            >
                                              {yeartoData.map(
                                                (item, keyindex) => {
                                                  return (
                                                    <option
                                                      key={keyindex}
                                                      value={item.eduname}
                                                    >
                                                      {item.label}
                                                    </option>
                                                  );
                                                }
                                              )}
                                            </select>
                                          </div>
                                        </Col>

                                        <div className="p-2">
                                          <input
                                            type="checkbox"
                                            style={{
                                              height: "15px",
                                              width: "15px",
                                            }}
                                            checked={ispresentChecked3}
                                            onChange={present3checkClick}
                                          />
                                          <span className="leftcardcheckboxtext text-danger">
                                            &nbsp;&nbsp;Present
                                          </span>
                                        </div>

                                        <Col ///////////////////////Work Point 1
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={12}
                                          xl={12}
                                          xxl={12}
                                          className="p-2"
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
                                                setWorkthreepoint1exp(
                                                  e.target.value
                                                );
                                              }}
                                              value={values.eworkthreePoint1val}
                                              name="eworkthreePoint1val"
                                            ></textarea>
                                          </div>
                                        </Col>
                                        <Col ///////////////////////Work Point 2
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={12}
                                          xl={12}
                                          xxl={12}
                                          className="p-2 mb-3"
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
                                                setWorkthreepoint2exp(
                                                  e.target.value
                                                );
                                              }}
                                              value={values.eworkthreePoint2val}
                                              name="eworkthreePoint2val"
                                            ></textarea>
                                          </div>
                                          {errors.eworkthreePointval && (
                                            <div className="errortext pt-3">
                                              {errors.eworkthreePointval}
                                            </div>
                                          )}
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Fragment>
                                ) : null}

                                <hr className="mt-3"></hr>

                                <Col ///////////////////////Projects
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                  xxl={12}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Projects"
                                    className="pb-2 labelTitleTextExperience"
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
                                          className="labelTextExperience"
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
                                            xxl={7}
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
                                                  setprojectoneexp(
                                                    e.target.value
                                                  );
                                                }}
                                                value={values.eprojectonename}
                                                name="eprojectonename"
                                              ></input>
                                            </div>
                                            {errors.eprojectonename && (
                                              <div className="errortext pt-2">
                                                {errors.eprojectonename}
                                              </div>
                                            )}
                                          </Col>
                                          <Col ///////////////////////Project Role
                                            xs={12}
                                            sm={12}
                                            md={5}
                                            lg={5}
                                            xl={5}
                                            xxl={5}
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
                                                  setprojectoneroleexp(
                                                    e.target.value
                                                  );
                                                }}
                                                value={values.eprojectonerole}
                                                name="eprojectonerole"
                                              ></input>
                                            </div>
                                            {errors.eprojectonerole && (
                                              <div className="errortext pt-2">
                                                {errors.eprojectonerole}
                                              </div>
                                            )}
                                          </Col>
                                          <Col ///////////////////////Technology Names
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                            xxl={12}
                                            className="p-2 mb-0"
                                          >
                                            <label
                                              htmlFor="firstname"
                                              className="pb-2 labelTextExperience"
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
                                                xxl={4}
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
                                                      setprojectonetech1exp(
                                                        e.target.value
                                                      );
                                                    }}
                                                    value={
                                                      values.eprojectonetech1
                                                    }
                                                    name="eprojectonetech1"
                                                  ></input>
                                                </div>
                                              </Col>
                                              <Col
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={4}
                                                xl={4}
                                                xxl={4}
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
                                                      setprojectonetech2exp(
                                                        e.target.value
                                                      );
                                                    }}
                                                    value={
                                                      values.eprojectonetech2
                                                    }
                                                    name="eprojectonetech2"
                                                  ></input>
                                                </div>
                                              </Col>
                                              <Col
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={4}
                                                xl={4}
                                                xxl={4}
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
                                                      setprojectonetech3exp(
                                                        e.target.value
                                                      );
                                                    }}
                                                    value={
                                                      values.eprojectonetech3
                                                    }
                                                    name="eprojectonetech3"
                                                  ></input>
                                                </div>
                                              </Col>
                                              <Col
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                lg={4}
                                                xl={4}
                                                xxl={4}
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
                                                      setprojectonetech4exp(
                                                        e.target.value
                                                      );
                                                    }}
                                                    value={
                                                      values.eprojectonetech4
                                                    }
                                                    name="eprojectonetech4"
                                                  ></input>
                                                </div>
                                              </Col>
                                            </Row>
                                            {errors.eprojectonetech && (
                                              <div className="errortext p-2">
                                                {errors.eprojectonetech}
                                              </div>
                                            )}
                                            <Col ///////////////////////Project Point 1
                                              xs={12}
                                              sm={12}
                                              md={12}
                                              lg={12}
                                              xl={12}
                                              xxl={12}
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
                                                    setprojectonepoint1exp(
                                                      e.target.value
                                                    );
                                                  }}
                                                  value={
                                                    values.eprojectonepoint1
                                                  }
                                                  name="eprojectonepoint1"
                                                ></textarea>
                                              </div>
                                            </Col>
                                            <Col ///////////////////////Project Point 2
                                              xs={12}
                                              sm={12}
                                              md={12}
                                              lg={12}
                                              xl={12}
                                              xxl={12}
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
                                                    setprojectonepoint2exp(
                                                      e.target.value
                                                    );
                                                  }}
                                                  value={
                                                    values.eprojectonepoint2
                                                  }
                                                  name="eprojectonepoint2"
                                                ></textarea>
                                              </div>
                                            </Col>
                                            <Col ///////////////////////Project Point 3
                                              xs={12}
                                              sm={12}
                                              md={12}
                                              lg={12}
                                              xl={12}
                                              xxl={12}
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
                                                    setprojectonepoint3exp(
                                                      e.target.value
                                                    );
                                                  }}
                                                  value={
                                                    values.eprojectonepoint3
                                                  }
                                                  name="eprojectonepoint3"
                                                ></textarea>
                                              </div>
                                              {errors.eprojectonepoint && (
                                                <div className="errortext pt-3">
                                                  {errors.eprojectonepoint}
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
                                          className="labelTextExperience"
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
                                            xxl={7}
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
                                            xxl={5}
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
                                            xxl={12}
                                            className="p-2 mb-0"
                                          >
                                            <label
                                              htmlFor="firstname"
                                              className="pb-2 labelTextExperience"
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
                                                xxl={4}
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
                                                xxl={4}
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
                                                xxl={4}
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
                                                xxl={4}
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
                                              xxl={12}
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
                                              xxl={12}
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
                                              xxl={12}
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
                                  className="pb-2 labelTitleTextExperience"
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
                                  xxl={2}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Degree"
                                    className="pb-2 labelTextExperience"
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
                                  xxl={4}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Stream"
                                    className="pb-2 labelTextExperience"
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
                                  xxl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="University"
                                    className="pb-2 labelTextExperience"
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
                                  xxl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Months"
                                    className="pb-2 labelTextExperience"
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
                                  xxl={3}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Years"
                                    className="pb-2 labelTextExperience"
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
                                  xxl={3}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Years"
                                    className="pb-2 labelTextExperience"
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
                                  className="pb-2 labelTitleTextExperience"
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
                                  xxl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="CourseName"
                                    className="pb-2 labelTextExperience"
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
                                  xxl={6}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Platform Name"
                                    className="pb-2 labelTextExperience"
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
                                  xxl={4}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Month"
                                    className="pb-2 labelTextExperience"
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
                                  xxl={3}
                                  className="p-2 mb-2"
                                >
                                  <label
                                    htmlFor="Year"
                                    className="pb-2 labelTextExperience"
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

export default ExperienceFormScreen;
