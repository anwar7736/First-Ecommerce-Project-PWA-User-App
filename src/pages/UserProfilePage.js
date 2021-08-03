import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import NavMenuMobile from '../components/common/NavMenuMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import UserProfile from '../components/UserProfile/UserProfile';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import DescriptionPlaceholder from '../components/placeholder/DescriptionPlaceholder';
import Axios from 'axios';
import ApiURL from '../api/ApiURL';
import cogoToast from 'cogo-toast';
import SessionHelper from '../SessionHelper/SessionHelper';
import {Redirect} from 'react-router';

class UserProfilePage extends React.Component{
        constructor(){
        super();
        this.state = {
            redirectStatus : false,
        }
    }
    componentDidMount() {
        window.scroll(0,0);
        let user_id = SessionHelper.getIdSession();
        if(user_id===null)
        {
            this.setState({redirectStatus:true})
        }
}
RedirectToHome=()=>{
        if(this.state.redirectStatus===true)
        {
             return(
                <Redirect to="/user_login" />
            )
        }
}
 render() {
    return (
        <Fragment>
            <title>Your Profile</title>
            <div className="Mobile">
                <NavMenuMobile/>
            </div>
            <div className="Desktop">
                <NavMenuDesktop/>
            </div>
           <div className={this.state.mainDiv}>
                <UserProfile />
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

export default UserProfilePage;
