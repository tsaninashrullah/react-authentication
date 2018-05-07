import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/Home';
import Login from './components/login';
import Logout from './components/logout';
import NoMatch from './components/404';
import ProductIndex from './components/product-index';
import registerServiceWorker from './registerServiceWorker';
import { Redirect, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "loaders.css/src/animations/ball-zig-zag-deflect.scss";
import allReducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { isLoggedIn } from './middleware/';
// import Loader from 'react-loaders';rrr
import Loader from 'react-loader-spinner';
import Master from './layouts/Master';

const store = createStore(
    allReducer,
    window.devToolsExtension && window.devToolsExtension(),
    applyMiddleware(thunk)
);

const RouterNav = () => (
    <Router>
        <Provider store={store}>
            <Switch>
                <Master path='/home' middleware='general' component={Home}/>
                <Master path='/logout' middleware='general' component={Logout}/>
                <Master path='/login' middleware='guest' component={Login}/>
                <Master path='/product-management' middleware='private' component={ProductIndex}/>
                <Master path='/' exact middleware='general' component={App}/>
                <Route component={NoMatch}/>
            </Switch>
        </Provider>
    </Router>
)
ReactDOM.render(<RouterNav />, document.getElementById('root'));
registerServiceWorker();
