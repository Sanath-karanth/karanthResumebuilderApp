import React, { memo, useState, useEffect, useContext, Fragment } from 'react';
import '../css/header.css'
import { ThemeContext } from '../contexts/themeContext';
import {Container,Row,Col} from 'react-bootstrap';
import Switch from '@mui/material/Switch';

const HeaderScreen = memo(() => {
    const [{theme,isDark}, toggleTheme] = useContext(ThemeContext);

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
                    <Container fluid>
                        <div className='header-Desktop'>
                            <Row className='gx-0'>
                                <Col xs={12} sm={12} md={2} lg={2} xl={2} xxl={4}>
                                    <p>Resume Builder</p>
                                </Col>
                                <Col xs={12} sm={12} md={8} lg={7} xl={7} xxl={4}>
                                    <p>Tabs </p>
                                </Col>
                                <Col xs={12} sm={12} md={2} lg={3} xl={3} xxl={4} className="das">
                                    <div>
                                        <p>Feedback</p>
                                    </div>
                                    <div>
                                    <Switch
                                        checked={isDark}
                                        onChange={toggleTheme}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div className='header-Mobile'>
                            <Row className='gx-0'>
                                <Col xs={3} sm={3}>
                                    <p>Resume Builder</p>
                                </Col>
                                <Col xs={7} sm={7}>
                                    <p>Theme</p>
                                </Col>
                                <Col xs={2} sm={2}>
                                    <p>Theme</p>
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