import React, { Component } from 'react';
import ListTableProduct from '../containers/list-product';
import Loader from 'react-loaders'
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import '../css/custom.scss';

class ProductIndex extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <div>
                <Loader type="ball-zig-zag-deflect" />
                {this.props.reducerProduct.httpCode >= 500 ? <Alert bsStyle={ (this.props.reducerProduct.httpCode >= 400) ? "danger" : "success" }>
                <p>
                    {this.props.reducerProduct.message}
                </p>
                </Alert> : null}
                <ListTableProduct/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        reducerProduct: state.productReducer
    };
}
export default connect(mapStateToProps, null)(ProductIndex);