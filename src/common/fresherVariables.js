import React, { useState } from "react";

const roleOptionsFresher = [{ value: "Fresher", label: "Fresher" }];

export function useVariableHook() {
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

  return [{fnameval, setFnameVal, froleSelectval, setFroleSelectVal,femailval, setFemailVal,
    fphoneval, setFphoneVal, fsummaryval, setFsummaryVal, projectonefresher, setProjectonefresher,
    projectonerolefresher, setProjectonerolefresher, projectonetech1fresher, setProjectonetech1fresher,
    projectonetech2fresher, setProjectonetech2fresher, projectonetech3fresher, setProjectonetech3fresher,
    projectonetech4fresher, setProjectonetech4fresher, projectonepoint1fresher, setProjectonepoint1fresher,
    projectonepoint2fresher, setProjectonepoint2fresher, projectonepoint3fresher, setProjectonepoint3fresher,
    isCheckedProject, setIsCheckedProject, projecttwofresher, setProjecttwofresher, projecttworolefresher, setProjecttworolefresher,
    projecttwotech1fresher, setProjecttwotech1fresher, projecttwotech2fresher, setProjecttwotech2fresher,
    projecttwotech3fresher, setProjecttwotech3fresher, projecttwotech4fresher, setProjecttwotech4fresher,
    projecttwopoint1fresher, setProjecttwopoint1fresher, projecttwopoint2fresher, setProjecttwopoint2fresher,
    projecttwopoint3fresher, setProjecttwopoint3fresher, eduSelectval, setEduSelectVal,
    fstreamval, setFstreamVal, funiversitynameval, setFuniversitynameVal, fmonthfromval, setFmonthfromVal,
    fyearfromval, setFfromyearVal, fyeartoval, setFtoyearVal, fcoursenameval, setFcoursenameVal,
    fplatnameval, setFplatnameVal, fcertificatemonthval, setFcertificatemonthVal, fcertificateyearval, setFcertificateyearVal, roleOptionsFresher}];
} 
