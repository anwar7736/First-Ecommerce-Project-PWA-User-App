import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import NavMenuMobile from '../components/common/NavMenuMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import Policy from '../components/others/Policy';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';

class PolicyPage extends React.Component{
    componentDidMount() {
        window.scroll(0,0)
    }
 render() {
    return (
        <Fragment>
            <title>Privacy Policy</title>
            <div className="Mobile">
                <NavMenuMobile/>
            </div>
            <div className="Desktop">
                <NavMenuDesktop/>
            </div>
           <div>
                <Policy/>
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

export default PolicyPage;
