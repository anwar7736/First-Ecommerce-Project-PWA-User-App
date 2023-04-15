import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import NavMenuMobile from '../components/common/NavMenuMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import OrderPayment from '../components/OrderPayment/OrderPayment';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import Axios from 'axios';
import ApiURL from '../api/ApiURL';
import SessionHelper from '../SessionHelper/SessionHelper';


class OrderPaymentPage extends React.Component{
     constructor() {
        super();
        this.state={
            data:[],
        }
    }

    componentDidMount() {
        window.scroll(0,0);
         let user_id = SessionHelper.getIdSession();
         Axios.get(ApiURL.GetPaymentList(user_id))
        .then(response=> {
            this.setState({data:response.data})
        })
    }

 render() {
    return (
        <Fragment>
            <title>Order Details</title>
            <div className="Mobile">
                <NavMenuMobile/>
            </div>
            <div className="Desktop">
                <NavMenuDesktop/>
            </div>
           <div className="">
                <OrderPayment data={this.state.data} />
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

export default OrderPaymentPage;
