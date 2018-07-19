
// //当通过函数来定义组建的时候参数是属性对象  函数声明 简单，类声明 
// 复杂  当组建需要状态时 推荐用类声明
// //props ={
//     path:"/my",
//     conponent:MY
// }
import React from 'react'
import {Route ,Redirect } from 'react-router-dom';
export default function({component:Component,...rest}){
    return <Route {...rest} render={(props)=>
            localStorage.getItem('login')?<Component/>:
            <Redirect to={{
                pathname:"/login",
                state:{from:props.location.pathname}
            }}></Redirect>
    }></Route>
}