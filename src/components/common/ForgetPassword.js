import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Form, Row, Breadcrumb} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import cogoToast from 'cogo-toast';
import validation from '../../validation/validation';
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';

class ForgetPassword extends Component {
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
       
        let email = localStorage.getItem('otp_verified');

        if(email!=null)
        {
            this.setState({email : email});
        }

    }

    onRecoveryHandler=(event)=>{
        event.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        let confirm_password = this.state.confirm_password;

        if(password.length==0)
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
                        localStorage.removeItem('otp_verified');
                        localStorage.removeItem('user');
                        localStorage.removeItem('pass');
                        this.setState({redirectStatus : true});
                    },2000);
                    
                    document.getElementById('UserForm').reset();
                }
                else
                {
                    cogoToast.error('Email address does not exists.');
                }
            })
            .catch(error=>{
                 cogoToast.error('Something went wrong! Please try again!');
            })
        }
        
    }
    onRedirectToLogin=()=>{
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
                          <Breadcrumb.Item><Link to="/forget_password">Forget Password</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Row className="p-0">
                        <Col className="offset-md-3 shadow-sm bg-white mt-1" md={6} lg={6} sm={12} xs={12}>
                            <Row className="text-center ">
                                <Col className="" md={12} lg={12} sm={12} xs={12}>
                                    <Form id="UserForm" onSubmit={this.onRecoveryHandler} className="onboardForm">
                                        <h3 className="section-title"></h3>
                                        <h5 className="text-danger text-center mb-5"><b>Step 03 : PASSWORD RESET</b></h5><hr/>
                                        <input className="form-control m-2" type="email" value={this.state.email} disabled/>
                                        <input onChange={(e)=>this.setState({password : e.target.value})} className="form-control m-2" type="password" placeholder="Enter your new password..."/>
                                        <input onChange={(e)=>this.setState({confirm_password : e.target.value})} className="form-control m-2" type="password" placeholder="Enter your confirm password..."/>
                                        <Button type="submit" className="btn btn-block m-2 btn-info">UPDATE</Button>
                                        <span className="text-danger">Remember Password? <Link to="/user_login">Login</Link></span>
                                    </Form>
                                </Col>
                         
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {this.onRedirectToLogin()}
            </Fragment>
        );
    }
}

export default ForgetPassword;