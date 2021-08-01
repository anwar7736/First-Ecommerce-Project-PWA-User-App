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
            password : '',
            confirm_password : '',
            redirectStatus : false,
        }
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
                          <Breadcrumb.Item><Link to="/forget_password">Email Verification</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Row className="p-0">
                        <Col className="offset-md-3 shadow-sm bg-white mt-1" md={6} lg={6} sm={12} xs={12}>
                            <Row className="text-center ">
                                <Col className="" md={12} lg={12} sm={12} xs={12}>
                                    <Form id="UserForm" onSubmit={this.onRecoveryHandler} className="onboardForm">
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
                {this.onRedirectLogin()}
            </Fragment>
        );
    }
}

export default EmailVerify;