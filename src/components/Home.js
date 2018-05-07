import React, { Component } from 'react';
import { FormGroup, FormControl, HelpBlock, Button, ControlLabel, Alert, Modal} from 'react-bootstrap';
import { Grid, Row } from 'react-bootstrap';
import ListProfileUser from '../actions/home';
import ReactAvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";

class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            image: 'http://random-ize.com/lorem-ipsum-generators/lorem-ipsum/lorem-ipsum.jpg',
            modalShow: false,
            formData : {
                firstName: '',
                lastName: '',
                password: '',
            },
            errorMessage: {
                firstName: '',
                lastName: '',
                password : ''
            },
            validForms: {
                firstName: false,
                lastName: false,
                password: false
            },
            focusForms: {
                firstName: false,
                lastName: false,
                password: false
            },
            formValid: false
        };
        this.handleInput = this.handleInput.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this)
    }
    handleCloseModal() {
        this.setState({
            modalShow: false
        })
    }
    handleOpenModal() {
        this.setState({
            modalShow: true
        })
    }
    handleInput(e) {
        const NAME = e.target.name;
        const VALUE = e.target.value;
        let updateState = this.state.formData;
        updateState[NAME] = VALUE
        this.setState(updateState, this.validateForm(NAME, VALUE))
    }

    validateForm(fieldName, value) {
        let rules;
        let isValid = true;
        let errorMessage = '';
        switch (fieldName) {
            case 'firstName':
            rules = [
                'min:8',
                'max:25'
            ];
                break;
            case 'lastName':
            rules = [
                'min:2'
            ];
                break;
            case 'password':
            rules = [
                'min:6'
            ]
                break;
        
            default:
            rules = [];
                break;
        }

        rules.forEach(element => {
            if (isValid) {
                if (element.indexOf('min') >= 0 || element.indexOf('max') >= 0) {
                    const length = parseInt(element.split(':')[1])
                    let fieldNameModified = ""
                    fieldName.split(/(?=[A-Z])/).forEach(element => {
                        fieldNameModified = fieldNameModified +  element.charAt(0).toUpperCase() + element.slice(1) + " ";
                    });
                    if(element.split(':')[0] == 'max'){
                        isValid = value.length <= length;
                        errorMessage = ((!isValid) ? fieldNameModified + 'must less than ' + length : '')
                    } else {
                        isValid = value.length >= length;
                        errorMessage = ((!isValid) ?  fieldNameModified + 'must more than ' + length : '')
                    }
                }
            }
        });
        
        let updateState = this.state.validForms;
        let messageState = this.state.errorMessage;
        for (var key in updateState) {
            if(key.indexOf(fieldName) >= 0){
                updateState[fieldName] = isValid;
                messageState[fieldName] = errorMessage;
            }
        }
         
        this.setState({
            validForms : updateState,
            errorMessage: messageState
        }, this.checkForm)
    }
    checkForm() {
        let isValid = true;
        const listValidation = this.state.validForms
        for(var key in listValidation) {
            if (!listValidation[key]) {
                isValid = listValidation[key]
            }
        }
        this.setState({
            formValid : isValid
        })
    }
    onSubmit(e){
        this.props.submitLogin(this.state.value, this.state.password);
    }
    setFocus(fieldName) {
        let updateState = this.state.focusForms;
        updateState[fieldName] = true;
        this.setState({
            focusForms: updateState
        })
    }
    
    handleDrop = dropped => {
        this.setState({ image: dropped[0] })
    }

    render() {
        return (
        <Grid>
            <Row>
                <form>
                    <FormGroup
                        controlId="formFirstName"
                        className={(!this.state.validForms.firstName && this.state.focusForms.firstName) ? 'has-error' : '' }
                    >
                        <ControlLabel>First Name</ControlLabel>
                        <FormControl
                            type="text"
                            name="firstName"
                            value={this.state.formData.firstName}
                            placeholder="Enter First Name"
                            onChange={(event)=>this.handleInput(event)}
                            onFocus={() => this.setFocus('firstName')}
                        />
                        <FormControl.Feedback />
                        {
                            (!this.state.validForms.firstName && this.state.focusForms.firstName) ? 
                                <HelpBlock>{this.state.errorMessage.firstName}</HelpBlock>
                            : ""
                        }
                    </FormGroup>
                    <FormGroup
                        controlId="formLastName"
                        className={(!this.state.validForms.lastName && this.state.focusForms.lastName) ? 'has-error' : '' }
                    >
                        <ControlLabel>Last Name</ControlLabel>
                        <FormControl
                            type="text"
                            name="lastName"
                            value={this.state.formData.lastName}
                            placeholder="Enter Last Name"
                            onChange={(event)=>this.handleInput(event)}
                            onFocus={() => this.setFocus('lastName')}
                        />
                        <FormControl.Feedback />
                        {
                            (!this.state.validForms.lastName && this.state.focusForms.lastName) ? 
                                <HelpBlock>{this.state.errorMessage.lastName}</HelpBlock>
                            : ""
                        }
                    </FormGroup>
                    <FormGroup
                        controlId="formPassword"
                        className={(!this.state.validForms.password && this.state.focusForms.password) ? 'has-error' : '' }
                    >
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            name="password"
                            value={this.state.formData.password}
                            placeholder="Password"
                            onChange={(event)=>this.handleInput(event)}
                            onFocus={() => this.setFocus('password')}
                        />
                        <FormControl.Feedback />
                        {
                            (!this.state.validForms.password && this.state.focusForms.password) ? 
                                <HelpBlock>{this.state.errorMessage.password}</HelpBlock>
                            : ""
                        }
                    </FormGroup>
                    <FormGroup
                        controlId="formPassword"
                        className={(!this.state.validForms.password && this.state.focusForms.password) ? 'has-error' : '' }
                    >
                        <img src={this.state.image}/>
                    </FormGroup>
                    <FormGroup
                        controlId="formSubmit"
                    >
                        <Button type="button" onClick={this.onSubmit} disabled={!this.state.formValid}>Register</Button>
                    </FormGroup>
                </form>
            </Row>
            <p>Click to get the full Modal experience!</p>

            <Button bsStyle="primary" bsSize="large" onClick={this.handleOpenModal}>
            Launch demo modal
            </Button>

            <Modal show={this.state.modalShow} backdrop={'static'} onHide={this.handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Text in a modal</h4>
                    <p>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Grid>

        );
    }
}

export default Home;
