import * as productConstant from "../const/product";
import {HEADER_LOGIN, URL_API} from "../const/general";
import HitApi from "../functions/api";

export const getProduct = (page, limit, keyword) => {
    return async (dispatch) => {
        const result = await HitApi(URL_API + "/api/v1/product", "GET", "limit=" + limit + "&page=" + page + "&keyword=" + keyword, HEADER_LOGIN);
    
        const dataBody = result.jsonBody;
        let dispacthVar;
        if (result.status >= 500) {
            dispacthVar = {
                type: ((result.status >= 200 && result.status <= 299) ? productConstant.LIST_PRODUCT : ((result.status >=400 && result.status <=499) ? productConstant.LIST_PRODUCT_FAILED : productConstant.API_FAILED_PRODUCT)),
                httpCode : result.status,
                message : result.statusText
            }
        } else {
            dispacthVar = {
                type: ((result.status >= 200 && result.status <= 299) ? productConstant.LIST_PRODUCT : ((result.status >=400 && result.status <=499) ? productConstant.LIST_PRODUCT_FAILED : productConstant.API_FAILED_PRODUCT)),
                httpCode : result.status,
                message : ((typeof dataBody.meta === "undefined") ? result.statusText : dataBody.meta.message),
                dataProduct : dataBody.data.products,
                dataTotalProduct : dataBody.data.total,
                dataTotalPage : dataBody.data.total_page,
                existingPage : ((page > dataBody.data.total_page) ? dataBody.data.total_page : page)
            }
        }
        dispatch(dispacthVar)
    }
}