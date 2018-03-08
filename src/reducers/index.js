import {combineReducers} from 'redux';
import UserReducer from "./users";
import ActiveUser from "./active-user";
import ProfileReducer from "./profile-user";

const allReducer = combineReducers({
    users : UserReducer,
    profileUser : ProfileReducer,
    activeUser : ActiveUser
});

export default allReducer;