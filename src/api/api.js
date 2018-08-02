// const base="/api"
//生产环境
// const base="http://192.168.0.25:84/"
const base="http://clinic.100care.cn"
// react 封装请求方法
//1.诊所介绍
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
//2.医生信息列表
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
//3.医生详情
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
//4.服务列表
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
//5.服务详情
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
//6.用户详情
export const getUserBaseinfo = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000",
        "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/userController/getUserBaseinfo',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//7.修改用户信息
export const modifyUserInfo = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000",
        "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/userController/modifyUserInfo',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//8 获取验证码接口
export const getVerifyCode = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000",
        "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/userController/getVerifyCode',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//9 提交接口
export const verifyMobile = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000",
        "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/userController/verifyMobile',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//10 查询每天可预约的时间段
export const getClinicAppointmentTimes = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000",
        "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicAppointmentTimes',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//11 预约按钮
export const subscriberAppointmentInfo = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000",
        "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/userController/subscriberAppointmentInfo',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//12 wifi接口
export const getClinicWIFI = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000",
        "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/wechatOfficialController/getClinicWIFI',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//13 活动列表
export const getClinicActivityList = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000",
        "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicActivityList',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//14 活动详情
export const getClinicActivityDetail = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000",
        "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicActivityDetail',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//15 就诊列表
export const queryAppointmentList = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000",
        "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/userController/queryAppointmentList',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//16 取消预约
export const modifyAppointmentStatus = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000",
        "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/userController/modifyAppointmentStatus',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}
//17 轮播图
export const getClinicBanner = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000",
        "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/clinicController/wechat/getClinicBanner',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}

//18 与微信授权
export const getSignature4Js = (param="",obj={}) => {
    obj={
        "settingCode":"wxc_100000",
        "openId":"oWZnu0x_7kPOPDyiXWRjPIfzO8vQ"
    }
    var headers=Object.assign( {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
    },obj)  
      var a= fetch(base+'/100care-wechat/wechatOfficialController/getSignature4Js',
        {
            method: "POST",
            mode: "cors",
            headers:headers,
            body: param
        }

        )
        return a
}

