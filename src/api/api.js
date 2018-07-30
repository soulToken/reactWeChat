const base="/api"
//生产环境
// const base="http://192.168.0.25:84/"
// react 封装请求方法
//诊所介绍
export const getClinicBaseinfo = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicBaseinfo',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}


export const Gmock = (param,obj={}) => {
    obj={
        "settingCode":100000
    }
    var headers=Object.assign( {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicBaseinfo',
        {
            credentails: 'include',
            mode: "cors",
            headers: headers
        }
        )
        return a
}