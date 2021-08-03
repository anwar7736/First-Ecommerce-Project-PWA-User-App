import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import NavMenuMobile from '../components/common/NavMenuMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import Notification from '../components/Notification/Notification';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import Axios from 'axios';
import ApiURL from '../api/ApiURL';
import SearchList from '../components/ProductDetails/SearchList';
import ProductListLoader from '../components/placeholder/ProductListLoader'

class NotificationPage extends React.Component{
    constructor({match}){
        super();
        this.state = {
            ProductList : [],
            search_query : match.params.search_query,
            isLoading : 'mt-5',
            mainDiv : 'd-none',

        }
    }
    componentDidMount() {
        window.scroll(0,0);
        Axios.get(ApiURL.ProductListBySearch(this.state.search_query))
        .then(response=>{
            this.setState({ProductList : response.data, isLoading : 'd-none', mainDiv : ''});
        })
        .catch(error=>{

        })

    }
 render() {
    return (
        <Fragment>
            <title>Search Results</title>
            <div className="Mobile">
                <NavMenuMobile/>
            </div>
            <div className="Desktop">
                <NavMenuDesktop/>
            </div>
           <div className={this.state.isLoading}>
                <ProductListLoader/>
           </div>
           <div className={this.state.mainDiv}>
                <SearchList search_query = {this.state.search_query} ProductList={this.state.ProductList}/>
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
