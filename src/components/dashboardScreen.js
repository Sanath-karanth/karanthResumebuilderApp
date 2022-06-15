import React, { memo, useState, useEffect, useContext, Fragment } from 'react';
import '../css/dashboard.css'
import Loader from '../common/loader'
import HeaderScreen from '../common/header';
import FooterScreen from '../common/footer';
import { ThemeContext } from '../contexts/themeContext';
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
                          height:'100vh'
                        }
                     }>
                        <HeaderScreen />
                          <Container fluid>
                            <div className='pt-4 mt-4'>
                              <h1>Main Container</h1>
                            </div>
                          </Container>
                        <FooterScreen />
                    </div>
                </div>
            </div>
        </Fragment>
  )
})


export default DashboardScreen;