import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/Home';
import Login from './components/login';
import Logout from './components/logout';
import Header from './layouts/Header';
import registerServiceWorker from './registerServiceWorker';
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import allReducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { isLoggedIn } from './middleware/';

const store = createStore(
    allReducer,
    window.devToolsExtension && window.devToolsExtension(),
    applyMiddleware(thunk)
);

const GuestRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isLoggedIn() ? (
        <Redirect to={{
            pathname: '/'
        }}/>

        ) : (<Component {...props}/>)
    )}/>
 )

const RouterNav = () => (
    <Router>
        <Provider store={store}>
            <div>
                <Header/>
                <div className="container">
                    <Route path="/" exact component={App}/>
                    <Route path="/home" component={Home}/>
                    <GuestRoute path="/login" component={Login}/>
                    <Route path="/logout" component={Logout}/>
                </div>
            </div>
        </Provider>
    </Router>
)
ReactDOM.render(<RouterNav />, document.getElementById('root'));
registerServiceWorker();
