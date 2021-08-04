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
		
		let siteLogo = localStorage.getItem('site-logo');
		let appleLogo = localStorage.getItem('apple-logo');
		let androidLogo = localStorage.getItem('android-logo');

        if(siteLogo==null || appleLogo==null || androidLogo==null)
        {
            Axios.get(ApiURL.GetSiteInfo)
            .then(response=>{
                if(response.status==200)
                {
					
					 localStorage.setItem('site-logo', response.data[1]['about']);
					 localStorage.setItem('apple-logo', response.data[2]['about']);
		             localStorage.setItem('android-logo', response.data[3]['about']);
                }
            })
            .catch(error=>{
                
            })
        }
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
