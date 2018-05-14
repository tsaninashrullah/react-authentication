import * as type from "../const/auth";
import HitApi from "../functions/api";
import { URL_API } from "../const/general";

export const submitRegister = (email, password) => {
    return async (dispatch) => {
        const result = await HitApi(URL_API + "/api/v1/product", "GET"); 
        // here is the process
        dispatch({
            type: ((result.status >= 200 && result.status <= 299) ? type.LOGIN_SUCCESS : ((result.status >=400 && result.status <=499) ? type.LOGIN_NOT_MATCH : type.LOGIN_ERROR)),
            httpCode : result.status,
            message : ((typeof result.jsonBody.meta.message === "undefined") ? result.statusText : result.jsonBody.meta.message),
            data: {
                token : ((result.jsonBody.meta.code >= 200 && result.jsonBody.meta.code < 300) ? result.jsonBody.data.token : ""),
                profile : ((result.jsonBody.meta.code >= 200 && result.jsonBody.meta.code < 300) ? result.jsonBody.data.profile : {})
            }
        })
    }
}