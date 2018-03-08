import * as constantAuth from "../const/auth";

const ERROR_SERVER = "Terjadi kesalahan pada server silakan coba beberapa saat lagi";

export default function (state = {"message" : "", "httpCode" : 200}, action) {
    switch (action.type) {
        case constantAuth.LOGIN_SUCCESS:
            state = {
                message : action.message,
                httpCode : action.httpCode
            };
            localStorage.setItem("token", action.data.token);
            localStorage.setItem("credential", JSON.stringify(action.data.profile));
            break;
    
        default:
            state = {
                message : ((action.httpCode >= 500) ? ERROR_SERVER : action.message),
                httpCode : action.httpCode
            }
            break;
    }
    return state;
}