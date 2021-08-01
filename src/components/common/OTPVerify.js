import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Form, Row, Breadcrumb} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import cogoToast from 'cogo-toast';
import validation from '../../validation/validation';
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';

class OTPVerify extends Component {
    constructor(){
        super();
        this.state = {
            email : '',
            password : '',
            confirm_password : '',
            redirectStatus : false,
        }
    }
    componentDidMount() {
        var totalSec = 300;
        setInterval(this.onRecoveryHandler, 1000);
       
    }
    
    onRecoveryHandler=(event)=>{
        event.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        let confirm_password = this.state.confirm_password;

        if(email.length==0)
        {
            cogoToast.error('Email Address is Required!');
        }
        
        else if(!validation.EmailRegx.test(email))
        {
             cogoToast.error('Invalid Email Address!');
        }

        else if(password.length==0)
        {
            cogoToast.error('New Password is Required!');
        } 

        else if(password.length < 3)
        {
            cogoToast.error('New Password is Too Short!');
        } 

        else if(confirm_password.length==0)
        {
            cogoToast.error('Confirm Password is Required!');
        } 

        else if(confirm_password.length < 3)
        {
            cogoToast.error('Confirm Password is Too Short!');
        } 

        else if(password!=confirm_password)
        {
            cogoToast.error('Both Password does not match!');
        }

        else
        {
            let MyForm = new FormData();
            MyForm.append('email', email);
            MyForm.append('password', password);

            Axios.post(ApiURL.ForgetPassword, MyForm)
            .then(response=>{
                if(response.status==200 && response.data==1)
                {
                    cogoToast.success('Password Recover Successfully');
                    setTimeout(()=>{
                        this.setState({redirectStatus : true});
                    },3000);
                    
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
    onRedirectLogin=()=>{
        if(this.state.redirectStatus===true){
            return (
                    <Redirect to="/user_login" />
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
                          <Breadcrumb.Item><Link to="/forget_password">OTP Verification</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Row className="p-0">
                        <Col className="offset-md-3 shadow-sm bg-white mt-1" md={6} lg={6} sm={12} xs={12}>
                            <Row className="text-center ">
                                <Col className="" md={12} lg={12} sm={12} xs={12}>
                                    <Form id="UserForm" onSubmit={this.onRecoveryHandler} className="onboardForm">
                                        <h3 className="section-title"></h3>
                                        <h5 className="text-danger text-center mb-5"><b>Step 02 : OTP Verification</b></h5>
                                        <p>We've already sent 6 digits OTP number in this email : example@gmail.com</p><hr/>
                                        <p>This OTP will be expired within <span id="count_down">05:00</span></p>
                                        <hr/>
                                        <input onChange={(e)=>this.setState({otp : e.target.value})} className="form-control m-2" type="text" maxlength="6" placeholder="Enter 6 digits OTP number..."/>
                                        <Button type="submit" className="btn btn-block m-2 btn-success" disabled>VERIFY</Button>
                                        <Link className="text-danger" to="/email_verification">Back to Email Verification</Link>
                                    </Form>
                                </Col>
                         
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {this.onRedirectLogin()}
            </Fragment>
        );
    }
}

export default OTPVerify;