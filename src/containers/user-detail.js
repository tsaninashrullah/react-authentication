import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserDetail extends Component {
    render() {
        if (!this.props.user) {
            return (
                <h2>Hallo, Please select user</h2>
            )
        }
        
        return (
            <div>
                <h2>My Name is : {this.props.user.first_name} {this.props.user.last_name}</h2>
                <h3>And my hobby is : {this.props.user.hobby}</h3>
                <hr />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.activeUser
    };
}
 
export default connect(mapStateToProps)(UserDetail);