import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import NavMenuMobile from '../components/common/NavMenuMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import Refund from '../components/others/Refund';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import Axios from 'axios';
import ApiURL from '../api/ApiURL';
import ProductDetailsPlaceholder from '../components/placeholder/ProductDetailsPlaceholder'

class RefundPage extends React.Component{
    constructor({match}){
        super();
        this.state = {
            product_code : match.params.product_code,
            ProductDetails : [],
            isLoading : '',
            mainDiv : 'd-none',
        }
    }
    componentDidMount() {
         window.scroll(0,0);
         Axios.get(ApiURL.GetProductDetails(this.state.product_code))
        .then(response=>{
            this.setState({ProductDetails : response.data, isLoading:'d-none', mainDiv:''});
        })
        .catch(error=>{

        })
    }
 render() {
   if(this.state.mainDiv=='d-none')
   {
     return (
        <Fragment>
            <div className="Mobile">
                <NavMenuMobile/>
            </div>
            <div className="Desktop">
                <NavMenuDesktop/>
            </div>
            <div>
                <ProductDetailsPlaceholder/>
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
   else{
     return (
        <Fragment>
            <title>Product Details</title>
            <div className="Mobile">
                <NavMenuMobile/>
            </div>
            <div className="Desktop">
                <NavMenuDesktop/>
            </div>
            <div>

            </div>
           <div>
                <ProductDetails details={this.state.ProductDetails}/>
               
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
}

export default RefundPage;
