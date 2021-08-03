import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import NavMenuMobile from '../components/common/NavMenuMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import EmailVerify from '../components/common/EmailVerify';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import DescriptionPlaceholder from '../components/placeholder/DescriptionPlaceholder'
import SessionHelper from '../SessionHelper/SessionHelper';

class EmailVerifyPage extends React.Component{
    constructor(){
        super();
        this.state = {
            redirectStatus : false,
        }
    }
    componentDidMount() {
        window.scroll(0,0);
        
        if(SessionHelper.getIdSession()!==null)
        {
            this.setState({redirectStatus:true})
        } 
        
        if(localStorage.getItem('email_verified')!=null)
        {
            localStorage.removeItem('email_verified');
        }
        
        if(localStorage.getItem('otp_verified')!=null)
        {
            localStorage.removeItem('otp_verified');
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
 render() {
    return (
        <Fragment>
            <title>Email Verification</title>
            <div className="Mobile">
                <NavMenuMobile/>
            </div>
            <div className="Desktop">
                <NavMenuDesktop/>
            </div>
           <div>
                <EmailVerify/>
           </div>
            <div className="Desktop">
                <FooterDesktop/>
            </div>
            <div className="Mobile">
                <FooterMobile/>
            </div>
            {this.RedirectToHome()}
        </Fragment>
    );
  }
}

export default EmailVerifyPage;
