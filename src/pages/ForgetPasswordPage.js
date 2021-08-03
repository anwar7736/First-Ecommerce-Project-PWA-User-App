import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import NavMenuMobile from '../components/common/NavMenuMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import ForgetPassword from '../components/common/ForgetPassword';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import DescriptionPlaceholder from '../components/placeholder/DescriptionPlaceholder'
import SessionHelper from '../SessionHelper/SessionHelper';

class ForgetPasswordPage extends React.Component{
    constructor(){
        super();
        this.state = {
            redirectStatus : false,
            status : false,
        }
    }
    componentDidMount() {
        window.scroll(0,0);
        
        if(SessionHelper.getIdSession()!==null)
        {
            this.setState({redirectStatus:true})
        }

        if(localStorage.getItem('otp_verified')==null)
        {
            this.setState({status:true})
        }

    }
    RedirectToHome=()=>{
        if(this.state.redirectStatus===true)
        {
             return(
                <Redirect to="/" />
            )
        }
}

RedirectToOTPVerify=()=>{
    if(this.state.status===true)
    {
         return(
            <Redirect to="/otp_verification" />
        )
    }
}

 render() {
    return (
        <Fragment>
            <title>Forget Password</title>
            <div className="Mobile">
                <NavMenuMobile/>
            </div>
            <div className="Desktop">
                <NavMenuDesktop/>
            </div>
           <div>
                <ForgetPassword/>
           </div>
            <div className="Desktop">
                <FooterDesktop/>
            </div>
            <div className="Mobile">
                <FooterMobile/>
            </div>
            {this.RedirectToHome()}
            {this.RedirectToOTPVerify()}
        </Fragment>
    );
  }
}

export default ForgetPasswordPage;
