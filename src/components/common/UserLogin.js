import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Form, Row, Breadcrumb} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import cogoToast from 'cogo-toast';
import validation from '../../validation/validation';
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';
import SessionHelper from '../../SessionHelper/SessionHelper';

class UserLogin extends Component {
      constructor(){
        super();
        this.state = {
            username : 'anwarhossain7736',
            password : '123',
            redirectStatus : false,
        }
    }
    onLoginHandler=(event)=>{
        event.preventDefault();
        let username = this.state.username;
        let password = this.state.password;

        if(username.length==0)
        {
            cogoToast.error('Username or Email Address is Required!');
        }

        else if(password.length==0)
        {
            cogoToast.error('Password is Required!');
        } 

        else
        {
            let MyForm = new FormData();
            MyForm.append('username', username);
            MyForm.append('password', password);

            Axios.post(ApiURL.UserLogin, MyForm)
            .then(response=>{
                if(response.status==200 && response.data!=0)
                {
                    SessionHelper.setIdSession(response.data.id);
                    SessionHelper.setNameSession(response.data.name);
                    SessionHelper.setEmailSession(response.data.email);
                    SessionHelper.setPhoneSession(response.data.phone);
                    SessionHelper.setPhotoSession(response.data.photo);
                    document.getElementById('UserForm').reset();
                    this.setState({redirectStatus : true});
                }
                else
                {
                    cogoToast.error('Username or Password Wrong!');
                }
            })
            .catch(error=>{
                 cogoToast.error('Something went wrong! Please try again!');
            })
        }
        
    }
    RedirectPage=()=>{
        if(this.state.redirectStatus===true){
        let redirect_path = SessionHelper.getRedirectPathSession();

        if(redirect_path!==null)
        {
            return(
                <Redirect to={redirect_path} />
            )
        }
        else
        {
             return(
                <Redirect to="/" />
            )
        }
        
    }
    }
    render() {
        return (
            <Fragment>
                <Container className="TopSection">
                    <Row>
                        <Breadcrumb className=" shadow-sm w-100 bg-white mt-3">
                          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                          <Breadcrumb.Item><Link to="/user_login">Login</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Row className="p-0">
                        <Col className="offset-md-3 shadow-sm bg-white mt-1" md={6} lg={6} sm={12} xs={12}>
                            <Row className="text-center ">
                                <Col className="" md={12} lg={12} sm={12} xs={12}>
                                    <Form id="UserForm" onSubmit={this.onLoginHandler} className="onboardForm">
                                        <h3 className="section-title mt-3">USER LOGIN</h3>
                                        <input value={this.state.username} onChange={(e)=>this.setState({username : e.target.value})} className="form-control m-2" type="text" placeholder="Username or Email..."/>
                                        <input value={this.state.password} onChange={(e)=>this.setState({password : e.target.value})} className="form-control m-2" type="password" placeholder="User Password..."/>
                                        <Button type="submit" className="btn btn-block m-2 site-btn">Login</Button>
                                        <span className="text-danger" >No yet a registered? <Link to="/user_signup">Signup</Link></span><br/>
                                        <span><Link to="/forget_password">Forgotten Password?</Link></span>
                                    </Form>
                                </Col>
                         
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {this.RedirectPage()}
            </Fragment>
        );
    }
}

export default UserLogin;