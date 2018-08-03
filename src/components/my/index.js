import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ReactDOM from 'react-dom'
import { Route } from "react-router-dom";
import TabBarExample from '../tooBar/tooBar'
import { DatePicker, List, InputItem,Picker , Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import heardUrl from '../../static/images/doctor_team_portrait@3x.png'
import nameUrl from '../../static/svg/personal_name.svg'
import sexUrl from '../../static/svg/personal_sex.svg'
import ageUrl from '../../static/svg/personal_age.svg'
import phoneUrl from '../../static/svg/personal_phone.svg'
import {getUserBaseinfo} from '../../api/api'
import {modifyUserInfo} from '../../api/api'
import './index.css'

const prompt = Modal.prompt;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

// Make sure that in `time` mode, the maxDate and minDate are within one day.
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
// console.log(minDate, maxDate);
if (minDate.getDate() !== maxDate.getDate()) {
  // set the minDate to the 0 of maxDate
  minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}

function formatDate(date) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => n < 10 ? `0${n}` : n;
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${dateStr}`;
}

// If not using `List.Item` as children
// The `onClick / extra` props need to be processed within the component
const CustomChildren = ({ extra, onClick, children }) => (
  <div
    onClick={onClick}
    style={{ backgroundColor: '#fff', height: '45px', lineHeight: '45px', padding: '0 15px' }}
  >
    {children}
    <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  </div>
);

const Item = List.Item;


const district=[
  {
    value:'1',
    label:'男'
  },
  {
    value:'0',
    label:'女'
  }
]







class ListExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      match: this.props.match.path,
      history: this.props.history,
      sex:null,
      ex:"qian",
      date: now,
      time: now,
      utcDate: utcNow,
      dpValue: null,
      customChildValue: null,
      visible: false,
      nickName:null,
      headUrl:null,
      getUserBaseinfo:getUserBaseinfo,
      modifyUserInfo:modifyUserInfo,
    }
    document.title="个人中心"
  }
  componentDidMount(){
    console.log(minDate,new Date("1900-1-1"),this.state.time)
    this.getDetail()
  }
  getDetail=()=>{
    var self=this;
    var param=""
    Toast.loading('Loading...', 0, () => {
      console.log('Load complete !!!');
    });
    this.state.getUserBaseinfo(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              Toast.hide()
                 self.setState({
                  nickName:obj.result.nickName,
                  sex:obj.result.sex,
                  birthday:obj.result.birthday,
                  mobile:obj.result.mobile,
                  headUrl:obj.result.headUrl
                 })     
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
  changeMessage=(param,resolve)=>{
    var self=this;
    this.state.modifyUserInfo(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
                self.getDetail()
                if(resolve){
                  resolve()
                }
               
            }else{
              if(resolve){
                resolve()
              }
                Toast.fail(obj.resultMsg, 1);
            }
        })
    }
    }).catch(function(){
      Toast.fail("网络错误", 1);
    })
  }
  changeName=() => {
    var self=this;
    prompt('', '请输入名字',
  [
    {
      text: '取消',
      onPress: value => new Promise((resolve) => {
        resolve()
      }),
    },
    {
      text: '确定',
      onPress: value => new Promise((resolve, reject) => {
        if(!value.trim()){
          Toast.info('不可以输入空姓名 !!!', 1);
          return 
        }
        const param="nickName="+value;
        self.changeMessage(param,resolve)
      }),
    },
  ], 'default', null, ['请输入姓名'])
}
goBind=()=>{
  this.props.history.push('/bind')
}
chooseSex=(v)=>{
  if(v){
    return district.filter(function(item){
      return item.value==v
    })[0].label
  }
}
changeSex=(v)=>{
  var param="sex="+v[0]
  this.changeMessage(param)
}
changeBirthday=(date)=>{
  var newDate=formatDate(date)
  var param="birthday="+newDate;
  this.changeMessage(param)
}
  render() {
    return (
      <div style={{height:'100%'}}>

      <div style={{ position: 'absolute', bottom: '50px', top: '0', zIndex: '10',width:'100%' ,background:'#f5f5f5'}}>

        <div className="my_head_box">
                <img className="head_url_center" src={this.state.headUrl}/>  
        </div>

         <List className="date-picker-list" style={{ backgroundColor: 'white',marginTop:'41px' }}>
            <Item
              thumb={nameUrl}
              arrow="horizontal"
              extra={this.state.nickName}
              onClick={this.changeName.bind(this)}
            >姓名</Item>
             <Picker data={district} cols={1}  
                    className="forss"
                    value={[this.state.sex]}
                    onChange={this.changeSex.bind(this)}
                    onOk={v =>this.setState({sex:v[0]})}
                    extra={this.chooseSex(this.state.sex)}
            >
              <Item 
               thumb={sexUrl}
              arrow="horizontal">性别</Item>
            </Picker>
            <DatePicker
              mode="date"
              title="选择日期"
              extra="请选择"
              minDate={new Date("1900-01-01")}
              maxDate={this.state.time}
              value={new Date(this.state.birthday)}
              onChange={this.changeBirthday.bind(this)}
            >
              <List.Item 
               thumb={ageUrl}
              arrow="horizontal">生日</List.Item>
            </DatePicker>
            <Item
              thumb={phoneUrl}
              extra={this.state.mobile||"去绑定"}
              arrow="horizontal"
              onClick={this.goBind.bind(this)}
            >
              手机
              </Item>
          </List> 
      </div>
        <TabBarExample></TabBarExample>
      </div>);
  }
}

// class Iteme extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       disabled: false,
//       match: this.props.match.path,
//       history: this.props.history
//     }

//   }
//   render() {
//     return (
//       <div>

//         {/* <Switch> */}

//         <Route exact path={`${this.state.match}`} component={ListExample} />
//         <Route path={`${this.state.match}/money`} component={Topic} />
//         {/* </Switch> */}


//       </div>);
//   }
// }




// export default withRouter(Iteme) 
export default  ListExample