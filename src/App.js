import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes/routes';
import MessengerCustomerChat from 'react-messenger-customer-chat';

class App extends React.Component{
 render() {
    return (
        <Fragment>
            <Router>
                <Routes/>
            </Router>
            <MessengerCustomerChat
            pageId="104337965247527"
            appId="416222869720823"/>
        </Fragment>
    );
  }
}

export default App;