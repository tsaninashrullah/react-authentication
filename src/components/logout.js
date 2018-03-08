import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Logout extends Component {
    constructor(props) {
        super(props);
        localStorage.removeItem('credential');
        localStorage.removeItem('token');
    }
    render() { 
        return (
            <Redirect to={{
                pathname: '/login',
            }}/>
        )
    }
}
 
export default Logout;