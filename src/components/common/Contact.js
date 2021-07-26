import React, {Component, Fragment} from 'react';
import {Container, Row, Col, Button, Form, Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import Axios from 'axios';
import validation from '../../validation/validation';
import ApiURL from '../../api/ApiURL';
import cogoToast from 'cogo-toast';
import emailjs from 'emailjs-com';

class Contact extends React.Component{
    constructor(){
        super();
        this.state = {
            name : '',
            email : '',
            message : '',
            sendBtn : 'SEND',
        }
    }
    onSendContactDetails=(event)=>{
        event.preventDefault();
        let name = this.state.name;
        let email = this.state.email;
        let message = this.state.message;
        let contactForm = document.getElementById('contactForm');
        
        if(name.length==0)
        {
            cogoToast.error('Name is Required');
        }

        else if(!validation.NameRegx.test(name))
        {
            cogoToast.error('Name is Invalid');
        }

        else if(email.length==0)
        {
            cogoToast.error('Email Address is Required');
        } 

        else if(!validation.EmailRegx.test(email))
        {
            cogoToast.error('Email Address is Invalid');
        }

        else if(message.length==0)
        {
            cogoToast.error('Message is Required');
        }  
        else {

            this.setState({sendBtn: 'SENDING...'})
            let contactData = new FormData();
            contactData.append('name', name);
            contactData.append('email', email);
            contactData.append('message', message);

            Axios.post(ApiURL.SendContactDetails, contactData)
            .then(response=>{
                if(response.status==200 && response.data==1)
                {
                    emailjs.sendForm('ecom_service', 'ecom_template', event.target, 'user_GWJf11gBKZ4agSRdJb6VN')
                    .then((result) => {
                          cogoToast.success("Message has been sent");
                          contactForm.reset();
                          this.setState({sendBtn: 'SEND'})
                    }, (error) => {
                        
                    });
                }
            })
            .catch(error=>{
                cogoToast.error("Something Went Wrong!");
                this.setState({sendBtn: 'SEND'})
            })
        }


        
    }
    render(){
        return (
            <Fragment>
                <Container className="TopSection animated slideInDown">
                   <Row>
                        <Breadcrumb className=" shadow-sm w-100 bg-white mt-3">
                          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                          <Breadcrumb.Item><Link to="/contact">Contact</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
                            <Row className="text-center ">
                                <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                                    <Form id="contactForm" onSubmit={this.onSendContactDetails} className=" onboardForm">
                                        <h4 className="section-title">CONTACT WITH US</h4>
                                        <h6 className="section-sub-title">Please Enter Your email No, And Go Next</h6>
                                        <input name="name" onChange={(event)=> this.setState({name: event.target.value})} className="form-control m-2" type="text" placeholder="Your Name"/>
                                        <input name="email" onChange={(event)=> this.setState({email: event.target.value})} className="form-control m-2" type="text" placeholder="Your Email Address"/>
                                        <textarea rows="4" name="message" onChange={(event)=> this.setState({message: event.target.value})} className="form-control m-2" type="text" placeholder="Please Write Something..."/>
                                        <Button type="submit" className="btn btn-block m-2 site-btn">{this.state.sendBtn}</Button>
                                    </Form>
                                </Col>
                                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                                    <iframe className="GoogleMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3646.7837360184853!2d90.2612632149848!3d23.932710984499774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755e8604d6f9d21%3A0xd2156959137437b7!2sPalash%20Bari%20Rd!5e0!3m2!1sen!2sbd!4v1624120568154!5m2!1sen!2sbd"></iframe>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
export default Contact;