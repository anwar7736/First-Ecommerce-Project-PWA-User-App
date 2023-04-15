import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import NavMenuMobile from '../components/common/NavMenuMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import PrintInvoice from '../components/OrderDetails/PrintInvoice';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import Axios from 'axios';
import ApiURL from '../api/ApiURL';

class PrintInvoicePage extends React.Component{
    constructor({match}){
        super();
        this.state = {
            id : match.params.id,
            order : [],
        }
    }
    componentDidMount() {
        window.scroll(0,0);

        //  Axios.get(ApiURL.GetOrderDetails(this.state.id))
        // .then(response=>{ 
        //     this.setState({order : response.data});
        // })
        // .catch(error=>{

        // })
    }
 render() {
    return (
        <Fragment>
            <title>Print Order Invoice</title>
            <div className="Mobile no-print">
                <NavMenuMobile/>
            </div>
            <div className="Desktop no-print">
                <NavMenuDesktop/>
            </div>
           <div>
                <PrintInvoice id={this.state.id} />
           </div>
            <div className="Desktop no-print">
                <FooterDesktop/>
            </div>
            <div className="Mobile no-print">
                <FooterMobile/>
            </div>
        </Fragment>
    );
  }
}

export default PrintInvoicePage;
