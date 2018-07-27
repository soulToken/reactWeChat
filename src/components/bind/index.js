import React, { Component } from 'react';
import { List, InputItem, Button,Toast } from 'antd-mobile';
import './index.css'
import phoneUrl from '../../static/svg/phone_phone.svg'
import codeUrl from '../../static/svg/phone_verification.svg'
class App extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
        　　　　tel: 13407163853,
        　　　　btnText: '获取验证码',
        　　　　timer: 60,
        　　　　discodeBtn: false,
        　　　　clearInterval: false
            }
         
          }

        //   componentWillReceiveProps(nextProps) {
        //     　　const { props } = this;
        //     　　const { openBox } = nextProps;
        //     　　// console.log('nextProps', nextProps);
        //     　　// 获取验证码
        //     　　if (props.openBox.sendBoxMobileCode !== openBox.sendBoxMobileCode) {
        //     　　　　const { code, message } = openBox.sendBoxMobileCode;
        //     　　　　if (code === '0') {
        //     　　　　　　this.count();
        //     　　　　} else {
        //     // 　　　　　　Toast.info(message);
        //     　　　　}
        //     　　}
        //     }
            count = () => {
                
                var timer=this.state.timer
               
                let siv = setInterval(() => {
                    this.setState({ timer: (timer--), btnText: timer+'s', discodeBtn: true }, () => {
                        if (timer === 0) {
                            clearInterval(siv);
                            this.setState({ btnText: '重新发送',timer:60, discodeBtn: false })
                        }
                    });
                }, 1000);
                }

          //获取code 
          getCode=()=>{
                if(this.state.btnText=="获取验证码"||this.state.btnText=="重新发送"){
                    this.count()
                }
                
          }
          //去注册
          gotoBind=()=>{
            Toast.success('成功', 1);

              console.log('电话号:'+this.phoneNumber.state.value.replace(/ /g,''),'验证码:'+this.codeNumber.state.value.replace(/ /g,''))
          }
          render(){
              return (
                  <div className="bind_box" style={
                      {
                          background:'#f7f7f7',
                          paddingLeft:'10px',
                          paddingRight:'10px',
                          height:'100%'
                       }
                  }>
                      <div className="bind_titleName">
                                恒信口腔惠州分院
                      </div>

                        <div className="phone_box">
                                <InputItem
                                    type="phone"
                                    placeholder="请输入手机号"
                                    extra="发送验证码"
                                    ref={el => this.phoneNumber = el}
                                > <img src={phoneUrl} />
                                </InputItem>
                        </div>
                       
                     
                        <div
                            className="code_box"
                            style={{
                                marginTop:'14px'
                            }}
                        >

                        <InputItem
                            placeholder="请输入验证码"
                            extra={this.state.btnText}
                            ref={el => this.codeNumber = el}
                            maxLength={6}
                            onExtraClick={this.getCode.bind(this)}  
                        >
                        <img src={codeUrl} />
                        </InputItem>
                        </div>
            
                        <Button className="bind_btn" style={{width:'100%',marginTop:'30px'}}  onClick={this.gotoBind.bind(this)} type="primary">绑定</Button>
                  </div>
              )
          }
}
export default App