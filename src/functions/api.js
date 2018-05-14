import { Redirect } from "react-router-dom";
import { URL_API } from "../const/general";
import React from 'react';

async function GetApi(url, params="", additionalHeaders = {}) {
    const result = await fetch(((params == "") ? url : url + "?" + params), {
        method : "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...additionalHeaders
        }
    });

    const jsonBody = await result.json();
    const statusText = result.statusText;
    const status = result.status;

    return {
        jsonBody : jsonBody,
        statusText : statusText,
        status : status
    };
}

async function PostApi(url, params={}, additionalHeaders = {}) {
    const result = await fetch(url, {
        method : "POST",
        headers: {
            ...additionalHeaders
        },
        body : params
    });

    const jsonBody = await result.json();
    const statusText = result.statusText;
    const status = result.status;

    return {
        jsonBody : jsonBody,
        statusText : statusText,
        status : status
    };
}

async function ExecuteApi(url, method, params=null, headers = {}){
    let resultApi = {};
    if (method == "GET") {
        resultApi = GetApi(url, ((params == null) ? "" : params), headers);
    } else {
        resultApi = PostApi(url, ((params == null) ? {} : params), headers);
    }
    return resultApi;
}

async function RefreshToken() {
    let responseRefresh = await PostApi(URL_API + "/api/v1/customer/refresh",{}, {
        "Authorization" : localStorage.getItem('token')
    });

    if (responseRefresh.status < 400) {
        localStorage.setItem('token', responseRefresh.jsonBody.data.token);
    } else {
        <Redirect to={{
            pathname: '/login'
        }}/>
    }
}

export default async function HitApi(url, method, params=null, headers = {}) {
    let resultApi = await ExecuteApi(url, method, params, headers);

    // CONDITION IF SERVER ERROR
    if (resultApi.status < 500) {
        if (resultApi.jsonBody.meta.code === 406) {
            await RefreshToken();
            let headers = {
                "Authorization" : localStorage.getItem('token')
            }
            resultApi = await ExecuteApi(url, method, params, headers);            
        }
    }

    return resultApi;
}