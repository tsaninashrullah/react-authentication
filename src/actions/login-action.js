import * as type from "../const/auth";
import { URL_API } from "../const/general";

export const submitLogin = (email, password) => {
    return async (dispatch) => {
        const result = await fetch(URL_API + "/5ae7ee5b2f00000f00f05b44", {
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                email : email,
                password : password
            })
        });
        const data = await result.json();
        // here is the process
        dispatch({
            type: ((result.status >= 200 && result.status <= 299) ? type.LOGIN_SUCCESS : ((result.status >=400 && result.status <=499) ? type.LOGIN_NOT_MATCH : type.LOGIN_ERROR)),
            httpCode : result.status,
            message : ((typeof data.meta.message === "undefined") ? result.statusText : data.meta.message),
            data: {
                token : ((data.meta.code >= 200 && data.meta.code < 300) ? data.data.token : ""),
                profile : ((data.meta.code >= 200 && data.meta.code < 300) ? data.data.profile : {})
            }
        })
    }
}