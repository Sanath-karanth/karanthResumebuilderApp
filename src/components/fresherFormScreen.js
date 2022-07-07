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
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { Container } from "react-bootstrap";
import { Formik } from "formik";
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

const FresherFormScreen = memo(() => {
  const [{ theme, isDark }] = useContext(ThemeContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
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
  return (
    <Fragment>
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
                      className="stepTxt"
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
                <p className="text-danger">
                  <span className="asteriskkey">*</span> Please complete all the{" "}
                  <b>steps</b> to get the complete resume.
                </p>
              </div>
              <div className="fresher-formContent">
                <div className="fresher-forms-cont" style={{backgroundColor: theme.cardColor, boxShadow: theme.cardShadow}}>
                  {activeStep === 0 ? (
                    <Fragment>
                      <Formik
                        initialValues={{
                          fusername: "",
                          femail: "",
                        }}
                        // onSubmit={createPurchaseOrder}
                        // validate={freshervalidate}
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
                            <div className="row mb-4">
                              <div className="col-md-6 p-2">
                                <label htmlFor="firstname" className="pb-2">
                                  Full Name
                                  <span className="asteriskkey">*</span>
                                </label>
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <div className="input-group-text h-100">
                                      <FontAwesomeIcon icon={faUser} />
                                    </div>
                                  </div>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Full name"
                                    // onChange={(e) => {
                                    //   handleChange(e);
                                    //   setFullnamefresher(e.target.value);
                                    // }}
                                    // value={values.fusername}
                                    name="fusername"
                                  ></input>
                                </div>
                                {errors.fusername && (
                                  <div className="errortext pt-2">
                                    {errors.fusername}
                                  </div>
                                )}
                              </div>
                              <div className="col-md-6 p-2">
                                <label htmlFor="lastname" className="pb-2">
                                  Role:
                                </label>
                                <select className="form-control form-select">
                                  <option>Fresher</option>
                                </select>
                              </div>
                            </div>
                          </>
                        )}
                      </Formik>
                    </Fragment>
                  ) : null}
                  {activeStep === 1 ? "Form2" : null}
                  {activeStep === 2 ? "Form3" : null}
                </div>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
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
              </div>
            </Fragment>
          )}
        </Box>
      </div>
    </Fragment>
  );
});

export default FresherFormScreen;
