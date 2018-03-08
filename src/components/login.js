import React, { Component } from 'react';
import { FormGroup, FormControl, HelpBlock, Button, ControlLabel, Alert} from 'react-bootstrap';
import { submitLogin } from '../actions/login-action.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleDismiss = this.handleChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleHideAlert = this.handleHideAlert.bind(this);
        this.setDataForActionLogin = this.setDataForActionLogin.bind(this);

        this.state = {
            value: '',
            password: '',
            show: false,
            token : "",
            profile : {},
            httpCode : 200,
            message : ""
        };
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleDismiss() {
        console.log('here');
        this.setState({ show: false });
    }

    handleHideAlert() {
        console.log("hide");
        this.setState({ show: false });
    }

    // handleShow() {
    //     this.setState({ show: true });
    // }

    setDataForActionLogin(token, profile, httpCode, message) {
        this.setState({
            token : token,
            profile : profile,
            httpCode : httpCode,
            message : message
        })
    }

    onSubmit(e){
        var promise = new Promise(function(resolve, reject) {
            // call resolve if the method succeeds
            resolve(true);
        })
        promise.then(function details() {
            fetch("http://minjem.in/api/v1/customer/login", {
                method : "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    email : this.state.value,
                    password : this.state.password
                })
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    token : ((data.meta.code >= 200 && data.meta.code < 300) ? data.data.token : ""),
                    profile : ((data.meta.code >= 200 && data.meta.code < 300) ? data.data.profile : {}),
                    httpCode : data.meta.code,
                    message : data.meta.message,
                    show: true
                })
                this.props.submitLogin(this.state.token, this.state.profile, this.state.httpCode, this.state.message);
            })
            .catch(error => {
                this.setState({
                    token: "",
                    profile : {},
                    httpCode: 500,
                    message: "",
                    show: true
                })
                this.props.submitLogin(this.state.token, this.state.profile, this.state.httpCode, this.state.message);
            })
        }.bind(this))
    }

    render() {
        if (typeof localStorage.token !== "undefined" && localStorage.token !== "") {
            return (
                <Redirect to={{
                    pathname: '/',
                }}/>
            )
        } else {
            return (
                <div id="alert-login">
                    {this.state.show ? <Alert bsStyle={ (this.props.resultLogin.httpCode >= 400) ? "danger" : "success" } onDismiss={this.handleHideAlert}>
                    <p>
                        {this.props.resultLogin.message}
                    </p>
                    </Alert> : null}
                    <form>
                        <FormGroup
                            controlId="formEmail"
                            validationState={ this.getValidationState() }
                        >
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                type="email"
                                value={this.state.value}
                                placeholder="Enter Email"
                                onChange={this.handleChange}
                            />
                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>
                        <FormGroup
                            controlId="formPassword"
                        >
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                value={this.state.password}
                                placeholder="Password"
                                onChange={this.handleChangePassword}
                            />
                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>
                        <Button type="button" onClick={this.onSubmit}>Sign in</Button>
                    </form>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        resultLogin : state.profileUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({submitLogin:submitLogin}, dispatch);
} 
export default connect(mapStateToProps, mapDispatchToProps)(Login);