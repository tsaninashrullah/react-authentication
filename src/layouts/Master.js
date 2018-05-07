import React from 'react';
import ProductIndex from '../components/product-index';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { Redirect, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { isLoggedIn } from '../middleware/';

const GuestRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isLoggedIn() ? (
        <Redirect to={{
            pathname: '/'
        }}/>

        ) : (<Component {...props}/>)
    )}/>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !isLoggedIn() ? (
        <Redirect to={{
            pathname: '/login'
        }}/>

        ) : (<Component {...props}/>)
    )}/>
);

const Master = (props) => {
    let route = "";
    switch (props.middleware) {
        case 'general':
        route = <Route path={props.path} component={props.component}/>
            break;
        case 'private':
        route = <PrivateRoute path={props.path} component={props.component}/>
            break;
        case 'guest':
        route = <GuestRoute path={props.path} component={props.component}/>
        default:
            break;
    }
    return (
        <div>
            <Header/>
            <div className="container">
                { route }
                {/* <CheckTypeRoute type={props.type} path={props.path} component={props.component}/> */}
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default Master;