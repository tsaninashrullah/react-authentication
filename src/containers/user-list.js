import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectUser } from '../actions/';

class UserList extends Component {
    showList() {
        return this.props.users.map((user) => {
            return (
                <li 
                    key={user.id}
                    onClick={() => this.props.selectUser(user)}
                >
                    {user.first_name} {user.last_name}
                </li>
            );
        });
    }
    render() { 
        return (
            <ul>
                {this.showList()}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectUser:selectUser}, dispatch);
}
 
export default connect(mapStateToProps, mapDispatchToProps)(UserList);