import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Form, Row, Breadcrumb} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import cogoToast from 'cogo-toast';
import validation from '../../validation/validation';
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';

class UserSignup extends Component {
    constructor(){
        super();
        this.state = {
            fullname : '',
            username : '',
            email : '',
            phone : '',
            photo : '',
            password : '',
            confirm_password : '',
            redirectStatus : false,
        }
    }
    onRegistration=(event)=>{
        event.preventDefault();
        let fullname = this.state.fullname;
        let username = this.state.username;
        let email = this.state.email;
        let phone = this.state.phone;
        let photo = this.state.photo;
        let password = this.state.password;
        let confirm_password = this.state.confirm_password;
        if(fullname.length==0)
        {
            cogoToast.error('Name is Required!');
        }
        
        else if(!validation.NameRegx.test(fullname))
        {
             cogoToast.error('Name is Invalid!');
        } 

        else if(username.length==0)
        {
            cogoToast.error('Username is Required!');
        } 

        else if(username.length < 3)
        {
            cogoToast.error('Username is Too Short!');
        }
        
        else if(!validation.UserNameRegx.test(username))
        {
             cogoToast.error('Username is Invalid!');
        }

        else if(email.length==0)
        {
            cogoToast.error('Email Address is Required!');
        }
        
        else if(!validation.EmailRegx.test(email))
        {
             cogoToast.error('Invalid Email Address!');
        } 

        else if(phone.length==0)
        {
            cogoToast.error('Mobile Number is Required!');
        }
        
        else if(!validation.MobileRegx.test(phone))
        {
             cogoToast.error('Invalid Mobile Number!');
        } 

        else if(photo.length==0)
        {
             cogoToast.error('Profile Photo is Required!');
        }

        else if(password.length==0)
        {
            cogoToast.error('Password is Required!');
        } 

        else if(password.length < 3)
        {
            cogoToast.error('Password is Too Short!');
        } 
        
        else if(confirm_password.length==0)
        {
            cogoToast.error('Confirm Password is Required!');
        }

        else if(password!==confirm_password)
        {
            cogoToast.error('Both password does not match!');
        }

        else
        {
            let MyForm = new FormData();
            MyForm.append('fullname', fullname);
            MyForm.append('username', username);
            MyForm.append('email', email);
            MyForm.append('phone', phone);
            MyForm.append('photo', photo);
            MyForm.append('password', password);

            Axios.post(ApiURL.UserRegistration, MyForm)
            .then(response=>{
                if(response.status==200 && response.data==1)
                {
                    cogoToast.success('Registration Successfully, Now You Can Login');
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
                          <Breadcrumb.Item><Link to="/user_signup">Signup</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Row className="p-0">
                        <Col className="offset-md-3 shadow-sm bg-white mt-1" md={6} lg={6} sm={12} xs={12}>
                            <Row className="text-center ">
                                <Col className="" md={12} lg={12} sm={12} xs={12}>
                                    <Form id="UserForm" onSubmit={this.onRegistration} className="onboardForm">
                                        <h5 className="text-success text-center mb-5"><b>USER REGISTRATION</b></h5><hr/>
                                        <input onChange={(e)=>this.setState({fullname : e.target.value})} className="form-control m-2" type="text" placeholder="Enter your full name..."/>
                                        <input onChange={(e)=>this.setState({username : e.target.value})} className="form-control m-2" type="text" placeholder="Enter your username..."/>
                                        <input onChange={(e)=>this.setState({email : e.target.value})} className="form-control m-2" type="text" placeholder="Enter your valid email address..."/>
                                        <input onChange={(e)=>this.setState({phone : e.target.value})} maxlength="11" className="form-control m-2" type="text" placeholder="Enter your valid mobile number..."/>
                                        <h6 className="float-left ml-3">Choose Profile Picture</h6>
                                        <input onChange={(e)=>this.setState({photo : e.target.files[0]})} className="form-control m-2" type="file" />
                                        <input onChange={(e)=>this.setState({password : e.target.value})} className="form-control m-2" type="password" placeholder="Enter your strong password..."/>
                                        <input onChange={(e)=>this.setState({confirm_password : e.target.value})} className="form-control m-2" type="password" placeholder="Enter your confirm password..."/>
                                        <Button type="submit" className="btn btn-block m-2 btn-success">SIGN UP</Button>
                                        <span className="text-danger">Already registered? <Link to="/user_login">Login</Link></span>
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

export default UserSignup;