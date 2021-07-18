import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import NavMenuMobile from '../components/common/NavMenuMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import OrderDetails from '../components/OrderDetails/OrderDetails';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import Axios from 'axios';
import ApiURL from '../api/ApiURL';
import cogoToast from 'cogo-toast';
import SessionHelper from '../SessionHelper/SessionHelper';
import DescriptionPlaceholder from '../components/placeholder/DescriptionPlaceholder';
import {Redirect} from 'react-router';

class OrderDetailsPage extends React.Component{
     constructor() {
        super();
        this.state={
            ProductData:[],
            isLoading : 'mt-5',
            mainDiv : 'd-none',
            redirectStatus : false,
        }
    }
    componentDidMount() {
        window.scroll(0,0);
         let user_id = SessionHelper.getIdSession();
         Axios.get(ApiURL.GetOrderDetails(user_id))
        .then(response=> {
            this.setState({ProductData:response.data, isLoading:'d-none',mainDiv:''})
        })
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
            <div className="Mobile">
                <NavMenuMobile/>
            </div>
            <div className="Desktop">
                <NavMenuDesktop/>
            </div>
           <div className={this.state.isLoading} >
                <DescriptionPlaceholder/>
           </div>
           <div className={this.state.mainDiv} >
                <OrderDetails ProductData={this.state.ProductData} />
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

export default OrderDetailsPage;
