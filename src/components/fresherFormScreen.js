import React, {
  memo,
  useState,
  useEffect,
  useContext,
  useCallback,
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
  roleOptions,
  summarysuggestOptions,
} from "../json/json";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import {
  Container,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
  Card,
  Modal,
  Alert,
  Accordion,
} from "react-bootstrap";
import { Formik, Form } from "formik";
import Select from "react-select";
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
  faBriefcase,
  faCommentDots,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const steps = ["Step 1", "Step 2", "Step 3"];
const roleOptionsFresher = [{ value: "Fresher", label: "Fresher" }];

const FresherFormScreen = memo(() => {
  const [{ theme }] = useContext(ThemeContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [suggestmodalShow, setSuggestmodalShow] = useState(false);
  const [isselectLoading, setIsselectLoading] = useState(true);
  const [progSelectval, setProgSelectval] = useState("");
  const [skillnullfresher, setSkillnullfresher] = useState(false);

  ////////    Form 1 Variables
  const [fnameval, setFnameVal] = useState("");
  const [froleSelectval, setFroleSelectval] = useState(roleOptionsFresher[0]);
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

  const [projecttwofresher, setProjecttwofresher] = useState("");
  const [projecttworolefresher, setProjecttworolefresher] = useState("");
  const [projecttwotech1fresher, setProjecttwotech1fresher] = useState("");
  const [projecttwotech2fresher, setProjecttwotech2fresher] = useState("");
  const [projecttwotech3fresher, setProjecttwotech3fresher] = useState("");
  const [projecttwopoint1fresher, setProjecttwopoint1fresher] = useState("");
  const [projecttwopoint2fresher, setProjecttwopoint2fresher] = useState("");
  const [projecttwopoint3fresher, setProjecttwopoint3fresher] = useState("");

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
    fprojecttwoname: "projecttwofresher",
    fprojecttworole: "projecttworolefresher",
    fprojecttwotech1: "projecttwotech1fresher",
    fprojecttwotech2: "projecttwotech2fresher",
    fprojecttwotech3: "projecttwotech3fresher",
    fprojecttwopoint1: "projecttwopoint1fresher",
    fprojecttwopoint2: "projecttwopoint2fresher",
    fprojecttwopoint3: "projecttwopoint3fresher",
    fstream: "streamfresher",
    funiversity: "universityfresher",
    fyearfrom: "yearfromval",
    fyearto: "yeartoval",
    fcoursename: "coursenamefresher",
    fplatform: "platnamefresher",
    ecompanyname: "companynamework1",
    ecompanylocation: "companylocation1",
    erole: "rolework1",
    eworkyearfrom1: "workoneyearfromval",
    eworkyearto1: "workoneyeartoval",
    eworkonepoint1: "workonepoint1exp",
    eworkonepoint2: "workonepoint2exp",
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

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const InfoClick = () => {
    setSuggestmodalShow(true);
  };

  const handleBack = () => {
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

  const scrollToTopNextStep = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

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

  const handleSubmitForm = async (values) => {
    handleNext();
  };

  const programSelectFresher = (newValue) => {
    if (newValue === null || newValue == "") {
      newValue = [0];
      setSkillnullfresher(true);
      setIsselectLoading(true);
    } else {
      setSkillnullfresher(false);
    }
    const array = [];
    newValue.map((obj) => {
      array.push(obj.value);
      setProgSelectval(array);
      console.log("array-->", array);
    });
    setIsselectLoading(false);
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

  const freshervalidate = (values) => {
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
    } else if (
      !/^[a-zA-Z0-9\&\)\(\+\/\.\,\:\;\'\"\-\b\s ]+$/g.test(values.fsummary)
    ) {
      errors.fsummary = "Please enter the valid characters only.";
    }

    if (!values.fprojectonename) {
      errors.fprojectonename = "Project name is required!";
    } else if (!/^[A-Za-z0-9\&\,\-\_\b ]+$/.test(values.fprojectonename)) {
      errors.fprojectonename =
        "Please enter a Valid Alphanumerical Characters only.";
    }

    if (!values.fprojectonerole) {
      errors.fprojectonerole = "Project Role is required!";
    } else if (!/^[A-Za-z\-\b ]+$/.test(values.fprojectonerole)) {
      errors.fprojectonerole =
        "Please enter a Valid Alphanumerical Characters only.";
    }

    if (!values.fprojectonetech1 || !values.fprojectonetech2 || !values.fprojectonetech3) {
      errors.fprojectonetech1 = 'Please enter Atleast 3-4 Technologies.';
  }

  if (!values.fprojectonepoint1 || !values.fprojectonepoint2) {
      errors.fprojectonepoint1 = 'Please enter Atleast 2-3 Points.';
  }

    return errors;
  };

  useEffect(() => {
    setFroleSelectval(roleOptionsFresher[0].value);
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
              <h6>All steps completed - you&apos;re finished</h6>
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
                      validate={freshervalidate}
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
                                  xxl={6}
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
                                      placeholder="Full name"
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
                                  xxl={6}
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
                                    />
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
                                  xxl={6}
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
                                  xxl={12}
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
                      validate={freshervalidate}
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
                                  xxl={12}
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
                                <Col ///////////////////////Phonenumber
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
                                    className="pb-2 labelTitleTextFresher"
                                  >
                                    Projects{"\n"}
                                    <span className="asteriskkey">*</span>
                                  </label>
                                  <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">  {/* Accordian 1  */}
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
                                            xxl={12}
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




                                    <Accordion.Item eventKey="1">  {/* Accordian 2  */}
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
                                            xxl={12}
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
                              <Button type="submit" variant="outlined">
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
                  <>
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
                      <Button onClick={handleNext} variant="outlined">
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Box>
                  </>
                ) : null}
              </div>
            </Fragment>
          )}
        </Box>
      </div>
    </Fragment>
  );
});

export default FresherFormScreen;
