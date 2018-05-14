import * as constantApi from '../const/api'
import * as constantUser from '../const/user'

export default function (state = {"message" : "", "httpCode" : 200}, action) {
    switch (action.type) {
        case constantUser.REGISTER_SUCCESS:
            state = {
                message : action.message,
                httpCode : action.httpCode
            };
            break;
    
        default:
            state = {
                message : ((action.httpCode >= 500) ? constantApi.ERROR_SERVER : action.message),
                httpCode : action.httpCode
            }
            break;
    }
    return state;
}