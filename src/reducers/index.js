import {combineReducers} from 'redux';
import UserReducer from "./users";
import ActiveUser from "./active-user";
import ProfileReducer from "./profile-user";
import ProductReducer from "./product-reducer";

const allReducer = combineReducers({
    users : UserReducer,
    profileUser : ProfileReducer,
    activeUser : ActiveUser,
    productReducer : ProductReducer
});

export default allReducer;