import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import NavMenuMobile from '../components/common/NavMenuMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import HomeTop from '../components/home/HomeTop';
import HomeTopMobile from '../components/home/HomeTopMobile';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Categories from '../components/home/Categories';
import Collection from '../components/home/Collection';
import NewArrival from '../components/home/NewArrival';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import Axios from 'axios';
import ApiURL from '../api/ApiURL';

class HomePage extends React.Component{
    componentDidMount() {
        window.scroll(0,0);
        Axios.get(ApiURL.VisitorDetails).then().catch();
    }
 render() {
    return (
        <Fragment>
            <title>E-Commerce App</title>
            <div className="Mobile">
                <NavMenuMobile/>
                <HomeTopMobile/>
            </div>
            <div className="Desktop">
                <NavMenuDesktop/>
                <HomeTop/>
            </div>

            <FeaturedProducts/>
            <Collection/>
            <NewArrival/>
            <Categories/>

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

export default HomePage;
