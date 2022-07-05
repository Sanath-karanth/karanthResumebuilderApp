import React, {
  memo,
  useState,
  useEffect,
  useContext,
  useCallback,
  Fragment,
} from "react";
import "../css/resumeform.css";
import Loader from "../common/loader";
import HeaderScreen from "../common/header";
import FooterScreen from "../common/footer";
import { ThemeContext } from "../contexts/themeContext";
import { resumeData } from "../json/json";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faQuestionCircle,
  faCommentDots,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const ResumeFormScreen = memo(() => {
  const [{ theme, isDark }] = useContext(ThemeContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { resumeid, resumename } = state;
  const headertextValue = 'resumeform';

  const backClick = () => {
    navigate("/dashboard");
  };

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
            <HeaderScreen  headerData={headertextValue} />
            <div>
              <button onClick={backClick}>Back</button>
            </div>
            <h2>{resumeid}</h2>
            <p>{resumename}</p>
            <FooterScreen />
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default ResumeFormScreen;
