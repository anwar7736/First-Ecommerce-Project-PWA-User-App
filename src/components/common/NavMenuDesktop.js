import React, {Component, Fragment} from 'react';
import  {Container,Nav,Navbar, Row, Col, Button, InputGroup, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Redirect} from "react-router";
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';
import SessionHelper from '../../SessionHelper/SessionHelper';

class NavMenuDesktop extends React.Component{
    constructor(){
        super();
        this.state = {
            search_query : '',
            cartCount : '0',
            favCount  : '0',
            notCount  : '0',
            status : false,  
            homeRedirectStatus : false,
        }
       
    }

    componentDidMount(){

            let cart = JSON.parse(sessionStorage.getItem('cart'));
            this.setState({cartCount : cart == null ? '0' : cart.length});
        
        // Axios.get(ApiURL.CartCount(SessionHelper.getIdSession()))
        // .then(response=>{
        //     this.setState({cartCount : response.data});
        // })
        // .catch(error=>{

        // }) 

        Axios.get(ApiURL.FavItemCount(SessionHelper.getIdSession()))
        .then(response=>{
            this.setState({favCount : response.data});
        })
        .catch(error=>{

        }) 

        Axios.get(ApiURL.NotificationCount(SessionHelper.getIdSession()))
        .then(response=>{
            this.setState({notCount : response.data});
        })
        .catch(error=>{

        })
    }

    SearchOnChange=(event)=>{
        this.setState({search_query : event.target.value});
    }

    SearchOnClick=(event)=>{
            if(this.state.search_query.length >= 2)
            {
                this.setState({status : true});
            }
      }

    searchRedirect=()=>{
      if(this.state.status===true){
         return <Redirect to={"/ProductListBySearch/"+this.state.search_query} />
      }
       
    }

    onLogout=()=>{
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        localStorage.removeItem('photo');
        localStorage.removeItem('redirect_path');
        this.setState({homeRedirectStatus : true});
      
    }
    onRedirectHome=()=>{
        if(this.state.homeRedirectStatus===true)  
            return (
                <Redirect to="/" />
               )
    }

 render() {
    let name = SessionHelper.getNameSession();
    let photo = SessionHelper.getPhotoSession();
    if(name==null)
    {
            return (
            <Fragment>
                <Container fluid={true} className="fixed-top shadow-sm p-2 m-0 bg-white" >
                    <Row>
                        <Col className="p-1" xl={4} lg={4} md={4} sm={12} xs={12}>
                           <Link to="/" className="btn"> <img className="nav-logo" src={localStorage.getItem('site-logo')}/></Link>
                           <Link to="/cart" className="link cart-btn"><i className="fa fa-shopping-cart"></i> {this.state.cartCount} items </Link>
                             
                        </Col>
                        <Col className="p-1" xl={5} lg={5} md={5} sm={12} xs={12}>
                                <div className="input-group w-100">
                                <input onChange={this.SearchOnChange} type="search" className="form-control-search" aria-label="Text input with segmented dropdown button"/>
                                <button onClick={this.SearchOnClick} type="button" placeholder="Search Here...." className="btn site-btn"><i className="fa fa-search"></i></button>
                                <span id="current_date" className="ml-4 text-success"></span>
                                <span id="current_time" className="ml-4 text-danger"></span>
                               </div>
                        </Col> 
                         <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={12}>
                             <div className="input-group w-100">
                             <Link to="/user_login" className="h4 btn btn-info btn-sm p-2">LOGIN</Link>
                             </div>

                        </Col>     
                    </Row>
                   {this.searchRedirect()}
                   {this.onRedirectHome()}
                </Container>
            </Fragment>
        );
            }

        else{
        return (
        <Fragment>
        <Container fluid={true} className="fixed-top shadow-sm p-2 m-0 bg-white" >
            <Row>
                <Col className="p-1" xl={4} lg={4} md={4} sm={12} xs={12}>
                   <Link to="/" className="btn"> <img className="nav-logo" src={localStorage.getItem('site-logo')}/></Link>
                   <Link to="/cart" className="link cart-btn"><i className="fa fa-shopping-cart"></i> {this.state.cartCount} items </Link>
                   
                </Col>
                <Col className="p-1" xl={5} lg={5} md={5} sm={12} xs={12}>
                        <div className="input-group w-100">
                        <input onChange={this.SearchOnChange} type="search" className="form-control-search" aria-label="Text input with segmented dropdown button"/>
                        <button onClick={this.SearchOnClick} type="button" placeholder="Search Here...." className="btn site-btn"><i className="fa fa-search"></i></button>
                        <span id="current_date" className="ml-4 text-success"></span>
                        <span id="current_time" className="ml-4 text-danger"></span>
                        </div>
                        
                </Col> 
                 <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={12}>
                     <div className="input-group w-100">
                     <span id="current_date" className="m-2 text-success"></span>
                         <NavDropdown title={<img className="profile-photo" src={photo}/>} id="navbarScrollingDropdown">
                             <NavDropdown.Item>
                                <span className="text-muted">{name}</span>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                 <Link to="/notification" className="btn"><i className="fas h4 fa-bell"></i> <sup><span className="badge text-white bg-danger">{this.state.notCount}</span></sup></Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/favourite" className="btn"><i className="fas h4 fa-heart"></i>  <sup><span className="badge text-white bg-danger">{this.state.favCount}</span></sup></Link>
                            </NavDropdown.Item> 
                            <NavDropdown.Item>
                                <Link to="/order_details" className="btn text-danger"><i className="fas fa-list"></i> Order List</Link>
                            </NavDropdown.Item>                            
                            <NavDropdown.Item>
                                <Link to="/payment_list" className="btn text-info"><i className="fas fa-list"></i> Payment List</Link>
                            </NavDropdown.Item>
                             <NavDropdown.Item>
                                <Link to="/user_profile"><span className="btn text-success"><i className="fa h4 fa-user"></i> My Profile</span></Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/change_password"><span className="btn text-primary"><i class="fas fa-key"></i> Change Password</span></Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <a onClick={this.onLogout} className="link btn text-muted"><i class="fas fa-power-off"></i> Logout</a>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                      </NavDropdown>  
                     </div>

                </Col>     
            </Row>
           {this.searchRedirect()}
           {this.onRedirectHome()}
        </Container>
        </Fragment>
        );

        }

        }
        }

export default NavMenuDesktop;
