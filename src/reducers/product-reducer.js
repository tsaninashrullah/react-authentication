import * as productConstant from "../const/product";

const ERROR_SERVER = "Terjadi kesalahan pada server silakan coba beberapa saat lagi";

export default function (state = {
    message : "",
    httpCode : 200,
    products : [],
    total : 0,
    totalPage : 0,
    existingPage : 1
}, action) {
    switch (action.type) {
        case productConstant.LIST_PRODUCT:
            state = {
                message : action.message,
                httpCode : action.httpCode,
                products : action.dataProduct,
                total : action.dataTotalProduct,
                totalPage : action.dataTotalPage,
                existingPage : action.existingPage
            };
            break;
        
        case productConstant.API_FAILED_PRODUCT :
            state = {
                message : ((action.httpCode >= 500) ? ERROR_SERVER : action.message),
                httpCode : action.httpCode,
                products : [],
                total : 0,
                totalPage : 0,
                existingPage : 1
            }
    
        // default:
        //     state = {
        //         message : ((action.httpCode >= 500) ? ERROR_SERVER : action.message),
        //         httpCode : action.httpCode,
        //         products : []
        //     }
        //     break;
    }
    return state;
}