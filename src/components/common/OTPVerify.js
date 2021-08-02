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
            otp: '',
            redirectStatus : false,
            totalSec : 300,
            status : false,
            isDisabled : true,


        }
    }

    componentDidMount() {  
        setInterval(this.countDown,1000); 
        Axios.post(ApiURL.GetOTPExpiration, {email : 'anwarhossain7736@gmail.com'})
        .then(response=>{
            if(response.data < 0)
            {
                this.setState({status : true});
            }
            else{
                this.setState({totalSec : response.data});
            }
            
        })
        .catch(error=>{

        })    

        let email = localStorage.getItem('email_verified');

        if(email!=null)
        {
            this.setState({email : email});
        }

    }


     countDown=()=>{
       var totalSec = this.state.totalSec;
        var min = Math.floor(totalSec / 60);
        var sec = (totalSec % 60);
        if(min < 10)
        {
            min = '0' + min;
        }

        if(sec < 10)
        {
            sec = '0' + sec;
        }
        if(totalSec==0)
        {
          clearInterval(totalSec);
          return this.setState({status : true, totalSec : ''});
        }
        else{
              document.getElementById('count_down').innerHTML = min + ':' + sec; 
              this.state.totalSec--;
        }
      
    }
    onChangeHandler=(e)=>
    {
        let otp = e.target.value;
        this.setState({otp : otp});
        if(otp.length===6)
        {
            this.setState({isDisabled : false});
        }
        
       else
        {
            this.setState({isDisabled : true});
        }
    }
    onOTPHandler=(event)=>{
        event.preventDefault();
        let email = this.state.email;
        let otp = this.state.otp;
            let MyForm = new FormData();
            MyForm.append('email', email);
            MyForm.append('otp', otp);

            Axios.post(ApiURL.OTPVerification, MyForm)
            .then(response=>{
                if(response.status==200 && response.data==1)
                {
                    cogoToast.success('OTP Verification Successfully');
                    setTimeout(()=>{
                        localStorage.setItem('otp_verified', email);
                        localStorage.removeItem('email_verified');
                        this.setState({redirectStatus : true});
                    },2000);
                    
                    document.getElementById('UserForm').reset();
                }
                else
                {
                    cogoToast.error('Your OTP is not valid!');
                }
            })
            .catch(error=>{
                 cogoToast.error('Something went wrong! Please try again!');
            })
        
        
    }
    onRedirectToForgetPassword=()=>{
        if(this.state.redirectStatus===true){
            return (
                    <Redirect to="/forget_password" />
                   );
        }
    } 
    onRedirectToEmailVerify=()=>{
        if(this.state.status===true){
            return (
                    <Redirect to="/email_verification" />
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
                                    <Form id="UserForm" onSubmit={this.onOTPHandler} className="onboardForm">
                                        <h3 className="section-title"></h3>
                                        <h5 className="text-danger text-center mb-5"><b>Step 02 : OTP Verification</b></h5>
                                        <p>We've already sent 6 digits OTP number in this email : {this.state.email}</p><hr/>
                                        <p>This OTP will be expired within <span id="count_down" className="text-danger"></span></p>
                                        <hr/>
                                        <input onChange={this.onChangeHandler} className="form-control m-2" type="text" maxlength="6" placeholder="Enter 6 digits OTP number..."/>
                                        <Button type="submit" id="verify_btn" className="btn btn-block m-2 btn-success" disabled={this.state.isDisabled}>VERIFY</Button>
                                        <Link className="text-danger" to="/email_verification">Back to Email Verification</Link>
                                    </Form>
                                </Col>
                         
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {this.onRedirectToForgetPassword()}
                {this.onRedirectToEmailVerify()}
            </Fragment>
        );
    }
}

export default OTPVerify;