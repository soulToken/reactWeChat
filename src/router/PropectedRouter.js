
// //当通过函数来定义组建的时候参数是属性对象  函数声明 简单，类声明 
// 复杂  当组建需要状态时 推荐用类声明
// //props ={
//     path:"/my",
//     conponent:MY
// }
import React from 'react'
import {Route ,Redirect } from 'react-router-dom';
import {GetRequest} from '../util/index'
// export default function({component:Component,...rest}){
//     return <Route {...rest} render={(props)=>
//             localStorage.getItem('login')?<Component/>:
//             <Redirect to={{
//                 pathname:"/",
//                 state:{from:props.location.pathname}
//             }}></Redirect>
//     }></Route>
// }


class App extends React.Component {
    constructor(props) {
        super(props);
        //在这里 做判断 如果 路径后面有参数  则  去请求 个人信息用户接口 并且 全局保存  诊所id 跟 openid
        const param=GetRequest(this.props.location.search)
        this.state={
            param:param
        }
        if(this.state.param.settingCode&&this.state.param.openId){
            window.sessionStorage.setItem('paramInfo',JSON.stringify(this.state.param))
        }
    }  
       
    componentDidMount(){
          
    }
        render() {
                return (
                    <div>
                       <Route component={this.props.component}></Route>
                    </div>
                )
        }
           
        
    }
    export default App