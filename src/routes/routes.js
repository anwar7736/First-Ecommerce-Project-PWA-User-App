import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import HomePage from '../pages/HomePage';
import UserSignupPage from '../pages/UserSignupPage';
import UserLoginPage from '../pages/UserLoginPage';
import UserProfilePage from '../pages/UserProfilePage';
import ForgetPasswordPage from '../pages/ForgetPasswordPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import ContactPage from '../pages/ContactPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import OrderDetailsPage from '../pages/OrderDetailsPage';
import RefundPage from '../pages/RefundPage';
import PolicyPage from '../pages/PolicyPage';
import PurchasePage from '../pages/PurchasePage';
import AboutPage from '../pages/AboutPage';
import NotificationPage from '../pages/NotificationPage';
import FavouritePage from '../pages/FavouritePage';
import CartPage from '../pages/CartPage';
import SearchPage from '../pages/SearchPage';
import ProductListByCategory from '../pages/ProductListByCategory';
import ProductListBySubcategory from '../pages/ProductListBySubcategory';

class Routes extends React.Component{
 render() {
    return (
        <Fragment>
                <Route exact path="/" render={(props)=> <HomePage {...props} key={ Date.now() } />} />
                <Route exact path="/user_signup" render={(props)=> <UserSignupPage {...props} key={ Date.now() } />} />
                <Route exact path="/user_login" render={(props)=> <UserLoginPage {...props} key={ Date.now() } />} />
                <Route exact path="/user_profile" render={(props)=> <UserProfilePage {...props} key={ Date.now() } />} />
                <Route exact path="/forget_password" render={(props)=> <ForgetPasswordPage {...props} key={ Date.now() } />} />
                <Route exact path="/change_password" render={(props)=> <ChangePasswordPage {...props} key={ Date.now() } />} />
                <Route exact path="/product_details/:product_code" render={(props)=> <ProductDetailsPage {...props} key={ Date.now() } />} />
                <Route exact path="/order_details/" render={(props)=> <OrderDetailsPage {...props} key={ Date.now() } />} />
                <Route exact path="/contact" render={(props)=> <ContactPage {...props} key={ Date.now() } />} />
                <Route exact path="/refund" render={(props)=> <RefundPage {...props} key={ Date.now() } />} />
                <Route exact path="/policy" render={(props)=> <PolicyPage {...props} key={ Date.now() } />} />
                <Route exact path="/purchase" render={(props)=> <PurchasePage {...props} key={ Date.now() } />} />
                <Route exact path="/about" render={(props)=> <AboutPage {...props} key={ Date.now() } />} />
                <Route exact path="/notification" render={(props)=> <NotificationPage {...props} key={ Date.now() } />} />
                <Route exact path="/favourite" render={(props)=> <FavouritePage {...props} key={ Date.now() } />} />
                <Route exact path="/cart" render={(props)=> <CartPage {...props} key={ Date.now() } />} />
                <Route exact path="/ProductListByCategory/:category" render={(props)=> <ProductListByCategory {...props} key={ Date.now() } />} />
                <Route exact path="/ProductListBySubcategory/:category/:subcategory" render={(props)=> <ProductListBySubcategory {...props} key={ Date.now() } />} />
                <Route exact path="/ProductListBySearch/:search_query" render={(props)=> <SearchPage {...props} key={ Date.now() } />} />
       
        </Fragment>
    );
  }
}

export default Routes;
