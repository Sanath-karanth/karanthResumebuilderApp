import React, { memo, useState, useEffect, useContext, Fragment } from 'react';
import '../css/dashboard.css'
import Loader from '../common/loader'
import HeaderScreen from '../common/header';
import FooterScreen from '../common/footer';
import { ThemeContext } from '../contexts/themeContext';
import { resumeData } from "../json/json"
import { useNavigate  } from "react-router-dom";
import {Navbar,Nav,Container,Row,Col,Button,Card,Modal} from 'react-bootstrap'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faQuestionCircle, faCommentDots, faHeart } from '@fortawesome/free-solid-svg-icons'


const DashboardScreen = memo(() => {

    const [{theme,isDark}, toggleTheme] = useContext(ThemeContext);
    const [RadioVal, setRadioVal] = useState('Resume 1');
    const [idVal, setIdVal] = useState(97);
    const navigate = useNavigate();
    let currentyear = moment().format('YYYY');
    const [instructionmodalShow, setInstructionmodalShow] = useState(false);
    const [reviewshow, setReviewshow] = useState(false);
    const [spin, setSpin] = useState(true);

 
    const homeClick = () => {
        navigate("/home");
    }

    const filterforImage = (item) => {
      if(item.resumeName === RadioVal)
      {
          return true
      }
      else
      {
          return false
      }
    }

    function resumeTabClick(evt, resumeName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("Dashboardtabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("Dashboardtablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" activetab", "");
      }
      document.getElementById(resumeName).style.display = "block";
      evt.currentTarget.className += " activetab";
    }

    function InstructionsModal(props) {
        return (
          <Modal scrollable
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Instructions
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card className='m-3'  border="secondary">
                    <Card.Header style={{color:'red'}}><span className='asteriskkey'>*</span> Important Instructions</Card.Header>
                    <Card.Body>
                        <Card.Text style={{color:'green'}}>
                            <ol>
                                <li>Please fill all the details in the form to get the complete resume.</li>
                                <li>After filling all the details in the form, Go to the end of the form and click the button to get the Generate PDF button.</li>
                                <li><b><u>Note:</u></b> Resume will be restricted to only one page of PDF. So, Fill the details with short descriptions.</li>
                                <li>Kindly use <b>Laptop</b>, <b>Desktop</b> or <b>Mobile Desktop Site's</b> Chrome for generating resume with proper PDF layout.</li>
                                <li>Kindly Request you to please provide your valuable <b>feedback</b> at the end.</li>
                            </ol>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }



      useEffect(() => {
        document.getElementById("defaultTabOpen").click();
        if (spin) {
          setTimeout(() => setSpin(false), 2000);
        }
      }, [spin]);

    return (
        <Fragment>
            <div className='MainContainer-dashboard'>
                <div className='SubContainer-dashboard'>
                    <div className='HeadContainer-dashboard' 
                    style={
                        { 
                          backgroundColor: theme.backgroundColor,
                          color: theme.color,
                        }
                     }>
                        <HeaderScreen />
                            <div className='MainCont-dashboard'>
                              <Container fluid className='container-guttersforDashboard'>
                              <div className='mandatoryinfotext'>
                                <p>
                                  <span className='asteriskkey'>*</span> Please read all the <b>Instructions</b> present within the Header before proceed!
                                </p>
                              </div>
                              <Row className='gx-0'>
                                <Col xs={12} sm={4} md={4} lg={3} xl={3} xxl={3}>
                                  <div className='m-3'>
                                    <section className='dashboard-card' style={{background: theme.cardLeftBorderColor}}>
                                      <div className='selecttext pb-3'>
                                        <h5>Select the Resume:</h5>
                                      </div>
                                      <div className='dashboard-lefttCard'>
                                        {resumeData.map((item,key) => {
                                            return(
                                            <div key={key} 
                                                 className="Dashboardtablinks mb-3"
                                                 id="defaultTabOpen"
                                                 onClick={(e) => resumeTabClick(e, item.resumeID)}>
                                              <div className='leftCardBorder' style={{background: theme.cardLeftBorderColor}}>
                                                <img 
                                                  src={item.resumeImg} 
                                                  alt={item.resumeName}> 
                                                </img>
                                              </div>
                                            </div>)
                                        })}
                                      </div>
                                    </section>
                                  </div>
                                </Col>
                                <Col xs={12} sm={8} md={8} lg={9} xl={9} xxl={9}>
                                  <div className='m-3'>
                                    <section className='dashboard-card' style={{background: theme.cardColor}}>
                                      <div className='dashboard-rightCard'>
                                      {resumeData.map((item,key) => {
                                            return(
                                            <div key={key} id={item.resumeID} className="Dashboardtabcontent">
                                              <img 
                                                src={item.resumeImg} 
                                                alt={item.resumeName} 
                                                width="100%" 
                                                height="auto"> 
                                              </img>
                                            </div>)
                                        })}
                                      </div>
                                    </section>
                                  </div>
                                </Col>
                              </Row>
                              </Container>
                            </div>
                        <FooterScreen />
                    </div>
                </div>
            </div>
        </Fragment>
  )
})


export default DashboardScreen;