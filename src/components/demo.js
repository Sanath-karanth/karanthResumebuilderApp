import React, {
  memo,
  useState,
  useEffect,
  useContext,
  useCallback,
  Fragment,
} from "react";
import "../css/demo.css";
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
} from "react-bootstrap";

const DemoScreen = memo(() => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const copyTxtData = (values) => {};

  const copySummaryText = (copytxtVal, sIdVal) => {
    var copyText = copytxtVal;
    var copyDataDiv;
    navigator.clipboard.writeText(copyText);
    copyDataDiv = document.querySelectorAll(`.copyContent #${sIdVal}`);

    for (let i = 0; i < copyDataDiv.length; i++) {
      copyDataDiv[i].style.display = "block";
      setTimeout(() => {
        copyDataDiv[i].style.display = "none";
      }, 3000);
    }
  };

  return (
    <Fragment>
      <div>
        <h4>Demo Page</h4>
      </div>
      <div>
     
      </div>
    </Fragment>
  );
});

export default DemoScreen;
