import React, { memo, useState, useEffect, useContext, Fragment } from 'react';
import '../css/header.css'
import { ThemeContext } from '../contexts/themeContext';
import  ToggleButton  from '../common/toggle';
import {Container,Row,Col} from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faQuestionCircle, faHeart, faCircleUser, faPenToSquare, faCommentDots } from '@fortawesome/free-solid-svg-icons'

const HeaderScreen = memo(() => {
    const [{theme,isDark}, toggleTheme] = useContext(ThemeContext);
    const navigate  = useNavigate();

    const homeClick = () => {
        navigate("/dashboard");
    }
    const instructionClick = () => {
        navigate("/");
    }
    const reviewClick = () => {
        navigate("/review");
    }
    const feedbackClick = () => {
        navigate("/feedback");
    }


  return (
    <Fragment>
        <div className='MainContainer-header'>
            <div className='SubContainer-header'>
                <div className='HeadContainer-header' 
                     style={
                        { 
                           backgroundColor: theme.headerBgColor,
                           color: theme.color,
                           boxShadow: theme.shadowColor
                        }
                     }>
                    <Container fluid className='container-guttersforheader'>
                        <div className='header-Desktop'>
                            <Row className='gx-0'>
                                <Col xs={12} sm={12} md={4} lg={3} xl={3} xxl={4} className='headertitleCol'>
                                    <div className='resumebuilderTitle-cont'>
                                        <div className='headerlogo'>
                                            <img src="./images/atom.png" className="Appheader-logo" alt="AppLogo" />
                                        </div>
                                        <div className='headertitle'>
                                            <h3>Resume Builder</h3>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={4} className='headertabsCol'>
                                    <div className='headertabs'>
                                        <div className="headertabstext" onClick={homeClick}>
                                            <FontAwesomeIcon icon={faHome} className="headerIcons" />
                                            <h4>Home</h4>
                                        </div>
                                        <div className="headertabstext" onClick={instructionClick}>
                                            <FontAwesomeIcon icon={faQuestionCircle} className="headerIcons" />
                                            <h4>Instructions</h4>
                                        </div>
                                        <div className="headertabstext" onClick={reviewClick}>
                                            <FontAwesomeIcon icon={faHeart} className="headerIcons" />
                                            <h4>Reviews</h4>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={2} lg={3} xl={3} xxl={4} className='headerthemeCol'>
                                    <div className="headertabstext" onClick={feedbackClick}>
                                        <FontAwesomeIcon icon={faCommentDots} className="headerIcons" />
                                        <h4>Feedback</h4>
                                    </div>
                                    <div className='headertoggle-cont'>
                                        <ToggleButton
                                            onChange={toggleTheme}>
                                        </ToggleButton>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div className='header-Mobile'>
                            <Row className='gx-0'>
                                <Col xs={5} sm={5} className='headertitleCol'>
                                    <div className='resumebuilderTitle-cont'>
                                        <div className='headerlogo'>
                                            <img src="./images/atom.png" className="Appheader-logo" alt="AppLogo" />
                                        </div>
                                        <div className='headertitle'>
                                            <h3>Resume Builder</h3>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={5} sm={5} className='headertabsCol'>
                                    <div className='headertabs'>
                                        <div className="headertabstext" onClick={homeClick}>
                                            <FontAwesomeIcon icon={faHome} className="headerIcons" />
                                        </div>
                                        <div className="headertabstext" onClick={instructionClick}>
                                            <FontAwesomeIcon icon={faQuestionCircle} className="headerIcons" />
                                        </div>
                                        <div className="headertabstext" onClick={reviewClick}>
                                            <FontAwesomeIcon icon={faHeart} className="headerIcons" />
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={2} sm={2} className='headerthemeCol'>
                                    <div className='headertoggle-cont'>
                                        <ToggleButton
                                            onChange={toggleTheme}>
                                        </ToggleButton>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    </Fragment>
  )
})

export default HeaderScreen;