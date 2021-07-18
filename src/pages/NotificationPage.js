import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import NavMenuMobile from '../components/common/NavMenuMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import Notification from '../components/Notification/Notification';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import Axios from 'axios';
import ApiURL from '../api/ApiURL';
import DescriptionPlaceholder from '../components/placeholder/DescriptionPlaceholder';
import SessionHelper from '../SessionHelper/SessionHelper';

class NotificationPage extends React.Component{
    constructor(){
        super();
        this.state = {
            NotificationList : [],
            isLoading : 'mt-5',
            mainDiv : 'd-none',

        }
    }
    componentDidMount() {
        window.scroll(0,0);
        let user_id = SessionHelper.getIdSession();
        Axios.get(ApiURL.GetNotificationList(user_id))
        .then(response=>{
            this.setState({NotificationList : response.data, isLoading : 'd-none', mainDiv : ''});
        })
        .catch(error=>{

        })

    }
 render() {
    return (
        <Fragment>
            <div className="Mobile">
                <NavMenuMobile/>
            </div>
            <div className="Desktop">
                <NavMenuDesktop/>
            </div>
           <div className={this.state.isLoading}>
                <DescriptionPlaceholder/>
           </div>
           <div className={this.state.mainDiv}>
                <Notification NotificationList={this.state.NotificationList}/>
           </div>
            <div className="Desktop">
                <FooterDesktop/>
            </div>
            <div className="Mobile">
                <FooterMobile/>
            </div>
        </Fragment>
    );
  }
}

export default NotificationPage;
