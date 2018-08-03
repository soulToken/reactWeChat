
// //当通过函数来定义组建的时候参数是属性对象  函数声明 简单，类声明 
// 复杂  当组建需要状态时 推荐用类声明
// //props ={
//     path:"/my",
//     conponent:MY
// }
import React from 'react'
import {Route ,Redirect } from 'react-router-dom';
import {GetRequest} from '../util/index'
import {getUserBaseinfo} from '../api/api'
import {Toast} from 'antd-mobile'
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
            param:param,
            getUserBaseinfo:getUserBaseinfo
        }
        if(this.state.param.settingCode&&this.state.param.openId){
            window.sessionStorage.setItem('paramInfo',JSON.stringify(this.state.param))
        }
        
     
    }  
       
    componentDidMount(){
        this.getDetail()
    }
    getDetail=()=>{
        var self=this;
        var param=""
        Toast.loading('Loading...', 0, () => {
          console.log('Load complete !!!');
        });
        this.state.getUserBaseinfo().then(function(res){
          if (res.ok) {
            res.json().then((obj)=> {
                if(obj.resultCode==="1000"){ 
                  Toast.hide()
                      window.sessionStorage.setItem("loginInfo",JSON.stringify(obj.result))
                }else{
                    Toast.hide()
                    Toast.fail(obj.resultMsg, 1);
                }
            })
    
        }
        }).catch(function(){
          Toast.hide()
          Toast.fail("网络错误", 1);
        })
      }

        render() {
                return (
                    <div>
                       <Route 
                       render={()=>
                                    sessionStorage.getItem('loginInfo')&&JSON.parse(sessionStorage.getItem('loginInfo'))&&JSON.parse(sessionStorage.getItem('loginInfo')).mobile?<this.props.component/>:
                                    <Redirect to={{
                                        pathname:"/bind",
                                        state:{from:this.props.location.pathname},
                                        goot:'1'
                                    }}></Redirect>
                            }></Route>
                    </div>
                )
        }
           
        
    }
    export default App