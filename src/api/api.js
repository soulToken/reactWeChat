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
//医生信息列表
export const getClinicDoctorList = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicDoctorList',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//医生详情
export const getClinicDoctorDetail = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicDoctorDetail',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//服务列表
export const getClinicServerIteamList = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicServerIteamList',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//服务详情
export const getClinicServerIteamDetail = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicServerIteamDetail',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}