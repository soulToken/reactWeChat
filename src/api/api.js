const base="/api/"
//生产环境
// const base="http://192.168.0.25:84/"
// react 封装请求方法
export const mock = (param,obj={}) => {

    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
    },obj)  
      var a= fetch(base+'100care-wechat/clinicController/wechatgzh/getClinicBaseinfo',
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

    var headers=Object.assign( {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
    },obj)  
      var a= fetch(base+'100care-wechat/clinicController/wechatgzh/getClinicBaseinfo',
        {
            credentails: 'include',
            mode: "cors",
            headers: headers
        }
        )
        return a
}