import React, { Component } from 'react';
import ProductIndex from '../components/product-index';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { Redirect, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { isLoggedIn } from '../middleware/';


class Master extends Component {
    
    constructor(props, context) {
        super(props, context);
        this.state = {
            resultApi : {
                message : "",
                httpCode : 0
            },
            showAlert : false
        }
        this.handleHideAlert = this.handleHideAlert.bind(this);
        this.handleSetStateParent = this.handleSetStateParent.bind(this);
    }

    handleHideAlert() {
        this.setState({ showAlert: false });
    }

    handleSetStateParent(obj) {
        this.setState(obj)
    }

    render() {
        const GuestRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={props => (
                isLoggedIn() ? (
                <Redirect to={{
                    pathname: '/'
                }}/>
        
                ) : (<Component {...props} handleSetStateParent={this.handleSetStateParent}/>)
            )}/>
        );
        
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={props => (
                !isLoggedIn() ? (
                <Redirect to={{
                    pathname: '/login'
                }}/>
        
                ) : (<Component {...props} handleSetStateParent={this.handleSetStateParent}/>)
            )}/>
        );
        let route = "";
        switch (this.props.middleware) {
            case 'general':
            route = <Route path={this.props.path} component={this.props.component} handleSetStateParent={this.handleSetStateParent}/>
                break;
            case 'private':
            route = <PrivateRoute path={this.props.path} component={this.props.component} handleSetStateParent={this.handleSetStateParent}/>
                break;
            case 'guest':
            route = <GuestRoute path={this.props.path} component={this.props.component} handleSetStateParent={this.handleSetStateParent}/>
            default:
                break;
        }
        return (
            <div>
                <Header/>
                <div className="container">
                    {this.state.showAlert ? <Alert bsStyle={ (this.state.resultApi.httpCode >= 400) ? "danger" : "success" } onDismiss={this.handleHideAlert}>
                    <p>
                        {this.state.resultApi.message}
                    </p>
                    </Alert> : null}
                    { route }
                    {/* <CheckTypeRoute type={props.type} path={props.path} component={props.component}/> */}
                </div>
                {/* <Footer/> */}
            </div>
        )
    }
}

export default Master;