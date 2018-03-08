import * as type from "../const/auth";

export const submitLogin = (token, profile, httpCode, message) => {
    // here is the process
    return {
        type: ((httpCode >= 200 && httpCode <= 299) ? type.LOGIN_SUCCESS : ((httpCode >=400 && httpCode <=499) ? type.LOGIN_NOT_MATCH : type.LOGIN_ERROR)),
        httpCode : httpCode,
        message : message,
        data: {
            token : token,
            profile : profile
        }
    };
}