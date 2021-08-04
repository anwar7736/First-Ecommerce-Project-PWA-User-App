import React, {Component,Fragment} from 'react';
import {Container,Col,Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class FooterDesktop extends Component {
    render() {
        return (
                <div className="m-0 bg-white mt-5 pt-3 shadow-sm">
                    <Container>
                        <Row className="px-0 my-5">
                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <h5 className="footer-menu-title">ABOUT COMPANY</h5>
                                <p>E-commerce (electronic commerce) is the buying and selling of goods and services, or the transmitting of funds or data, over an electronic network, primarily the internet. These business transactions occur either as business-to-business (B2B), business-to-consumer (B2C), consumer-to-consumer or consumer-to-business.</p>
                                <h5 className="footer-menu-title">SOCIAL LINK</h5>
                                <a href=""><i className="fab m-1 h4 fa-facebook"></i></a>
                                <a href=""><i className="fab m-1 h4 fa-instagram"></i></a>
                                <a href=""><i className="fab m-1 h4 fa-twitter"></i></a>
                            </Col>
                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <h5 className="footer-menu-title">THE COMPANY</h5>
                                <Link to="/about" className="footer-link">About Us</Link><br/>
                                <Link to="/contact" className="footer-link">Contact Us</Link><br/>

                                <h5 className="footer-menu-title mt-3">OFFICE ADDRESS</h5>
                                <p>Polashbari, Ashulia, Dhaka-1341, 01794030592, anwarhossain7736@gmail.com</p>
                            </Col>
                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <h5 className="footer-menu-title">MORE INFO</h5>
                                <Link to="/purchase" className="footer-link">How To Purchase</Link><br/>
                                <Link to="/policy" className="footer-link">Privacy Policy</Link><br/>
                                <Link  to="/refund" className="footer-link">Refund Policy</Link><br/>
                            </Col>
                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <h5 className="footer-menu-title">DOWNLOAD APP</h5>
                                <a><img className="" src={localStorage.getItem('apple-logo')}/></a><br/>
                                <a><img className="mt-2" src={localStorage.getItem('android-logo')}/></a>
                                <p className="mt-3">Change Language</p>
                                <p className="mt-1" id="google_translate_element"></p>
                            </Col>
                        </Row>

                    </Container>
                    <Container fluid={true} className=" m-0 pt-3 pb-1 bg-danger ">
                        <Container className="">
                            <Row className="px-0">
                               <Col className="text-center">
                                    <h6 className="text-white">&copy; Copyright 2020-2021</h6>
                               </Col>
                            </Row>
                            <Row className="px-0">
                                <Col className="text-center">
                                     <p className="footer-text">All Rights Reserved By Md Anwar Hossain</p>
                                 </Col>
                            </Row>
                        </Container>

                    </Container>
                </div>

        );
    }
}

export default FooterDesktop;