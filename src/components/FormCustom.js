import React, { Component } from 'react'

const FormCustom = (props) => {
    return (
    <FormGroup
        controlId={props.id}
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
    )
}

export default FormCustom;