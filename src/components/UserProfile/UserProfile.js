import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Form, Row, Breadcrumb} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import cogoToast from 'cogo-toast';
import validation from '../../validation/validation';
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';
import SessionHelper from '../../SessionHelper/SessionHelper';

class UserProfile extends Component {
    constructor(){
        super();
        this.state = {
            PageRefreshStatus : false,
            name : '',
            username : '',
            email : '',
            phone : '',
            photo : '',
            previewImg : '',
        }
    }
    componentDidMount(){
        let user_id= SessionHelper.getIdSession();
        Axios.get(ApiURL.GetUserProfile(user_id))
        .then(response=>{
            if(response.status===200)
            {
                this.setState({
                    name : response.data[0]['fullname'],
                    username : response.data[0]['username'],
                    email : response.data[0]['email'],
                    phone : response.data[0]['phone'],
                    previewImg : response.data[0]['photo'],
                })
                if(SessionHelper.getIdSession()===null)
                {
                    SessionHelper.setIdSession(response.data[0]['id']);  
                    SessionHelper.setNameSession(response.data[0]['fullname']);  
                    SessionHelper.setEmailSession(response.data[0]['email']);  
                    SessionHelper.setPhoneSession(response.data[0]['phone']);  
                    SessionHelper.setPhotoSession(response.data[0]['photo']);  
                }
            }
        })
        .catch(error=>{

        })
    }
    onUpdateProfile=()=>{
        
      let id = SessionHelper.getIdSession();
      let name = this.state.name;
      let username = this.state.username;
      let email = this.state.email;
      let phone = this.state.phone;
      let photo = this.state.photo;

       if(name.length===0)
        {
            cogoToast.error('Enter Your Name');
        }
        else if(!validation.NameRegx.test(name))
        {
             cogoToast.error('Name is Invalid!');
        } 
        else if(username.length===0)
        {
            cogoToast.error('Enter Your Username');
        }
        else if(username.length < 3)
        {
            cogoToast.error('Username is Too Short!');
        }
        else if(!validation.UserNameRegx.test(username))
        {
             cogoToast.error('Username is Invalid!');
        }

        else if(email.length===0)
        {
            cogoToast.error('Enter Your Valid Email Address');
        }
        else if(!validation.EmailRegx.test(email))
        {
             cogoToast.error('Invalid Email Address!');
        } 

        else if(phone.length===0)
        {
            cogoToast.error('Enter Your Valid Mobile Number');
        }
        else if(!validation.MobileRegx.test(phone))
        {
             cogoToast.error('Invalid Mobile Number!');
        }
        else
        {
            let MyForm = new FormData();
            MyForm.append('id', id);
            MyForm.append('name', name);
            MyForm.append('username', username);
            MyForm.append('email', email);
            MyForm.append('phone', phone);
            MyForm.append('photo', photo);

            Axios.post(ApiURL.UpdateProfile, MyForm)
            .then(response=>{
                if(response.status==200 && response.data!=0)
                {
                    this.setState({PageRefreshStatus:true})
                    cogoToast.success('Your profile updated successfully..');
                    localStorage.removeItem('name');
                    localStorage.removeItem('email');
                    localStorage.removeItem('phone');
                    localStorage.removeItem('photo');
                    localStorage.setItem('user', username);
                    SessionHelper.setNameSession(response.data.name);
                    SessionHelper.setEmailSession(response.data.email);
                    SessionHelper.setPhoneSession(response.data.phone);
                    SessionHelper.setPhotoSession(response.data.photo);
                }
                else{
                     cogoToast.warn("Profile Nothing to Changes");
                }
            })
            .catch(error=>{
                 cogoToast.error('Something Went Wrong!');
            })
        
    }
}
    PageRefresh=()=>{
        if(this.state.PageRefreshStatus===true){
            let path = window.location.pathname;
            return (
                    <Redirect to={path} />
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
                          <Breadcrumb.Item><Link to="/user_profile">My Profile</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Row className="p-0">
                        <Col className="offset-md-3 shadow-sm bg-white mt-1" md={6} lg={6} sm={12} xs={12}>
                            <Row>
                                <Col md={12} lg={12} sm={12} xs={12}>
                                    <div className="card p-2">
                                        <div className="card-body">
                                            <div className="container-fluid ">
                                                <div className="row">
                                                    <div className="col-md-12 p-1  col-lg-12 col-sm-12 col-12">
                                                        <h5 className="text-success text-center"><b>YOUR PROFILE</b></h5><hr/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Your Name</label>
                                                        <input value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} className="form-control" type="text" placeholder=""/>
                                                    </div> 
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Your Username</label>
                                                        <input value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})} className="form-control" type="text" placeholder=""/>
                                                    </div> 
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Your Email Address</label>
                                                        <input value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} className="form-control" type="text" placeholder=""/>
                                                    </div> 
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Your Mobile Number</label>
                                                        <input value={this.state.phone} onChange={(e)=>this.setState({phone:e.target.value})} className="form-control" type="text" placeholder=""/>
                                                    </div>

                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Your Photo</label><br/>
                                                        <img className="profile-image" src={this.state.previewImg}/>
                                                        <input onChange={(e)=> this.setState({photo:e.target.files[0]})} type="file" className="form-control mt-2 mb-3"/>
                                                    </div>
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <button onClick={this.onUpdateProfile} className="btn btn-block btn-success">UPDATE PROFILE</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                         
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {this.PageRefresh()}
            </Fragment>
        );
    }
}

export default UserProfile;