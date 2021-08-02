import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Form, Row, Breadcrumb} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import cogoToast from 'cogo-toast';
import validation from '../../validation/validation';
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';

class EmailVerify extends Component {
    constructor(){
        super();
        this.state = {
            email : '',
            redirectStatus : false,
        }
    }
    onEmailHandler=(event)=>{
        event.preventDefault();
        let email = this.state.email;
        if(email.length==0)
        {
            cogoToast.error('Email Address is Required!');
        }
        
        else if(!validation.EmailRegx.test(email))
        {
             cogoToast.error('Invalid Email Address!');
        }

        else
        {
            let MyForm = new FormData();
            MyForm.append('email', email);
            Axios.post(ApiURL.EmailVerification, MyForm)
            .then(response=>{
                if(response.status==200 && response.data==1)
                {
                    cogoToast.success('Please check your email!');
                    setTimeout(()=>{
                        
                        localStorage.setItem('email_verified', email);
                        this.setState({redirectStatus : true});
                    },2000);
                    
                    document.getElementById('UserForm').reset();
                }
                else
                {
                    cogoToast.error(response.data);
                }
            })
            .catch(error=>{
                 cogoToast.error('Something went wrong! Please try again!');
            })
        }
        
    }
    onRedirectToOTPPage=()=>{
        if(this.state.redirectStatus===true){
            return (
                    <Redirect to="/otp_verification" />
                   );
        }
    }
    render() {
        return (
            <Fragment>
                <Container className="TopSection animated slideInDown">
                    <Row>
                        <Breadcrumb className=" shadow-sm w-100 bg-white mt-3">
                          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                          <Breadcrumb.Item><Link to="/email_verification">Email Verification</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Row className="p-0">
                        <Col className="offset-md-3 shadow-sm bg-white mt-1" md={6} lg={6} sm={12} xs={12}>
                            <Row className="text-center ">
                                <Col className="" md={12} lg={12} sm={12} xs={12}>
                                    <Form id="UserForm" onSubmit={this.onEmailHandler} className="onboardForm">
                                        <h3 className="section-title"></h3>
                                        <h5 className="text-danger text-center mb-5"><b>Step 01 : Email Verification</b></h5><hr/>

                                        <input onChange={(e)=>this.setState({email : e.target.value})} className="form-control m-2" type="text" placeholder="Enter your valid email address..."/>
                                        <Button type="submit" className="btn btn-block m-2 btn-success">VERIFY</Button>
                                        <Link className="text-danger" to="/user_login">Back to Login</Link>
                                    </Form>
                                </Col>
                         
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {this.onRedirectToOTPPage()}
            </Fragment>
        );
    }
}

export default EmailVerify;