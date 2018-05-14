import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, HelpBlock, Button, ControlLabel, Alert, Modal, Image } from 'react-bootstrap';
import { FaRefresh } from 'react-icons/lib/fa';
import b64toBlob from '../library/imageHelper';
import ListProfileUser from '../actions/home';
import ReactAvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import { submitRegister } from '../actions/userAction.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            image: '',
            imagePreview: 'http://random-ize.com/lorem-ipsum-generators/lorem-ipsum/lorem-ipsum.jpg',
            modalShow: false,
            reactAvatarProps: {
                borderRadius: 0,
                scale: 1,
                rotate: 0
            },
            formData : {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            },
            errorMessage: {
                firstName: '',
                lastName: '',
                email: '',
                password : ''
            },
            validForms: {
                firstName: false,
                lastName: false,
                email: false,
                password: false
            },
            focusForms: {
                firstName: false,
                lastName: false,
                email: false,
                password: false
            },
            formValid: false
        };
        this.handleInput = this.handleInput.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this)
    }
    componentWillMount(){
        this.setState({
            image: this.state.imagePreview
        })
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
        // this.props.route.handleSetStateParent({
        //     resultApi : {
        //         httpCode : 200,
        //     }
        // })
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
            case 'email':
            rules = [
                'email'
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
            let additionalErrorMessage;
            let fieldNameModified = ""            
            if (isValid) {
                const length = parseInt(element.split(':')[1])
                fieldName.split(/(?=[A-Z])/).forEach(element => {
                    fieldNameModified = fieldNameModified +  element.charAt(0).toUpperCase() + element.slice(1) + " ";
                });
                if (element.indexOf('min') >= 0 || element.indexOf('max') >= 0) {
                    if(element.split(':')[0] == 'max'){
                        isValid = value.length <= length;
                        additionalErrorMessage =  'must less than ' + length
                    } else {
                        isValid = value.length >= length;
                        additionalErrorMessage =  'must more than ' + length
                    }
                } else {
                    switch (element) {
                        case 'email':
                        isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                        additionalErrorMessage =  'not valid'
                        break;
                    
                        default:
                            break;
                    }
                }
                errorMessage = ((!isValid) ? fieldNameModified + additionalErrorMessage : '')
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
        // Get the form
        const form = document.getElementById("registerForm");
        const ImageURL = document.getElementById("imageUser").src;
        // Split the base64 string in data and contentType
        const block = ImageURL.split(";");
        if (typeof block[1] === 'undefined') {
            alert('Please insert the photos')
        } else {
            // Get the content type
            const contentType = block[0].split(":")[1];// In this case "image/gif"
            // get the real base64 content of the file
            const realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."
    
            // Convert to blob
            const blob = b64toBlob(realData, contentType);
    
            // Create a FormData and append the file
            const fd = new FormData(form);
            fd.append("image", blob);
            this.props.submitLogin(fd);
        }
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

    handlePropsReactAvatar = (el) => {
        let updateState = this.state.reactAvatarProps
        updateState[el.target.id] = parseFloat(el.target.value)
        this.setState({
            reactAvatarProps: updateState
        })
    }

    handleRotateImage = () => {
        let updateState = this.state.reactAvatarProps
        updateState['rotate'] = parseInt(updateState.rotate) + parseInt(90)
        this.setState({
            reactAvatarProps: updateState
        })
    }

    saveImage = () => {
        const canvas = this.editor.getImage().toDataURL();
        let imageURL = ""
        this.setState({
            imagePreview : canvas
        })
        this.handleCloseModal()
    }

    onClickSave = () => {
        if (this.editor) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            const canvas = this.editor.getImage()

            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
            const canvasScaled = this.editor.getImageScaledToCanvas()
        }
    }
    
    componentWillReceiveProps(nextProps) {
    }

    setEditorRef = (editor) => this.editor = editor

    render() {
        return (
        <Grid>
            <Row>
                <form id="registerForm">
                    <FormGroup
                        controlId="formFirstName"
                        className={(!this.state.validForms.firstName && this.state.focusForms.firstName) ? 'has-error' : '' }
                    >
                        <ControlLabel>First Nih Name</ControlLabel>
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
                        controlId="formemail"
                        className={(!this.state.validForms.email && this.state.focusForms.email) ? 'has-error' : '' }
                    >
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type="text"
                            name="email"
                            value={this.state.formData.email}
                            placeholder="Enter Email"
                            onChange={(event)=>this.handleInput(event)}
                            onFocus={() => this.setFocus('email')}
                        />
                        <FormControl.Feedback />
                        {
                            (!this.state.validForms.email && this.state.focusForms.email) ? 
                                <HelpBlock>{this.state.errorMessage.email}</HelpBlock>
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
                        <Image circle responsive src={this.state.imagePreview} onClick={this.handleOpenModal} id="imageUser" width='10%'/>
                    </FormGroup>
                    <FormGroup
                        controlId="formSubmit"
                    >
                        <Button type="button" onClick={this.onSubmit} disabled={!this.state.formValid}>Register</Button>
                    </FormGroup>`
                </form>
            </Row>

            <Modal show={this.state.modalShow} backdrop={'static'} onHide={this.handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit avatar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={6}>
                            <Dropzone
                                onDrop={this.handleDrop}
                                style={{ width: '100%', height: '100%' }}
                            >
                                <ReactAvatarEditor
                                image={this.state.image}
                                borderRadius={100}
                                scale={this.state.reactAvatarProps.scale}
                                rotate={this.state.reactAvatarProps.rotate}
                                style={{ width: '100%', height: '100%' }}
                                ref={this.setEditorRef}
                                border={0}
                                />
                            </Dropzone>
                            <FormControl.Feedback />
                            {
                                (!this.state.validForms.password && this.state.focusForms.password) ? 
                                    <HelpBlock>{this.state.errorMessage.password}</HelpBlock>
                                : ""
                            }
                        </Col>
                        <Col xs={6}>
                            Border Radius
                            <input type="range" min={0} max={100} onChange={(event) => this.handlePropsReactAvatar(event)} id='borderRadius' value={this.state.reactAvatarProps.borderRadius}/>
                            Zoom
                            <input type="range" step={0.01} min={1} max={2} onChange={(event) => this.handlePropsReactAvatar(event)} id='scale' value={this.state.reactAvatarProps.scale}/>
                            Rotate<br/>
                            <Button type="button" onClick={this.handleRotateImage}><FaRefresh/></Button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.saveImage} className='btn btn-success'>Save</Button>
                    <Button onClick={this.handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Grid>

        );
    }
}


function mapStateToProps(state) {
    return {
        resultRegister : state.userUtilReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({submitRegister:submitRegister}, dispatch);
} 
export default connect(mapStateToProps, mapDispatchToProps)(Home);
