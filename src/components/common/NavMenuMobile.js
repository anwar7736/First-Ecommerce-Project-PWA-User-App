import React, {Component,Fragment} from 'react';
import {Button, Col, Container, Navbar, Row, NavDropdown} from "react-bootstrap";
import MegaMenu from "../home/MegaMenu";
import MegaMenuMobile from "../home/MegaMenuMobile";
import {Link} from "react-router-dom";
import {Redirect} from "react-router";
import Axios from 'axios';
import ApiURL from '../../api/ApiURL';
import SessionHelper from '../../SessionHelper/SessionHelper';

class NavMenuMobile extends Component {

    constructor() {
        super();
        this.state={
            SideNavState:"sideNavClose",
            ContentOverState:"ContentOverlayClose",
            menuData : [],
            cartCount : '0',
            favCount  : '0',
            notCount  : '0',
            homeRedirectStatus : false,
        }
    }

    componentDidMount(){
        Axios.get(ApiURL.GetCategoryDetails)
        .then(response=>{
            this.setState({menuData : response.data});
        })
        .catch(error=>{

        })

        Axios.get(ApiURL.CartCount(SessionHelper.getIdSession()))
        .then(response=>{
            this.setState({cartCount : response.data});
        })
        .catch(error=>{

        })

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

    MenuBarClickHandler=()=>{
        this.SideNavOpenClose();
    }

    ContentOverlayClickHandler=()=>{
        this.SideNavOpenClose();
    }



    SideNavOpenClose=()=>{
       let SideNavState= this.state.SideNavState;
       let ContentOverState= this.state.ContentOverState;
       if(SideNavState==="sideNavOpen"){
           this.setState({SideNavState:"sideNavClose",ContentOverState:"ContentOverlayClose"})
       }
       else{
           this.setState({SideNavState:"sideNavOpen",ContentOverState:"ContentOverlayOpen"})
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
            <Navbar fluid={"true"} className="fixed-top shadow-sm p-2 m-0 bg-white">

                <a style={{cursor: 'pointer'}} onClick={this.MenuBarClickHandler} className=" mx-2 navbar-brand"><i className="fa fa-bars"></i></a>
                <Link to="/cart" className="link cart-btn"><i className="fa fa-shopping-cart"></i> {this.state.cartCount} items </Link>
                <Link to="/user_login" className="h4 btn btn-dark btn-sm m-2">LOGIN</Link>
                <span id="current_date2" className="ml-2 text-muted"></span>
                <span id="current_time2" className="ml-3 text-success"></span>  

            </Navbar>
                <div  className={this.state.SideNavState}> 
                    <Link to="/" className="btn"> <img className="nav-logo" src="./Images/logo.png"/></Link>
                    <hr/>
                    <MegaMenuMobile data={this.state.menuData}/>
                </div>

                <div onClick={this.ContentOverlayClickHandler}  className={this.state.ContentOverState}>

                </div>
                {this.onRedirectHome()}
            </Fragment>

        );
    }
        else{
             return (
            <Fragment>
            <Navbar fluid={"true"} className="fixed-top shadow-sm p-2 m-0 bg-white">
                <a style={{cursor: 'pointer'}} onClick={this.MenuBarClickHandler} className=" mx-2 navbar-brand"><i className="fa fa-bars"></i></a>
                <Link to="/cart" className="link cart-btn"><i className="fa fa-shopping-cart"></i> {this.state.cartCount} items </Link>
                            <NavDropdown title={<img className="profile-photo" src={photo} />} id="navbarScrollingDropdown">
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
                                <NavDropdown.Divider />
                          </NavDropdown> 
                          <span id="current_date2" className="ml-2 text-muted"></span>
                          <span id="current_time2" className="ml-3 text-success"></span>  
            </Navbar>
                <div  className={this.state.SideNavState}> 
                    <Link to="/" className="btn"> <img className="nav-logo" src="./Images/logo.png"/></Link>
                    <hr/>
                    <MegaMenuMobile data={this.state.menuData}/>
                </div>

                <div onClick={this.ContentOverlayClickHandler}  className={this.state.ContentOverState}>

                </div>
                {this.onRedirectHome()}
            </Fragment>

        );
        }

    }
}

export default NavMenuMobile;