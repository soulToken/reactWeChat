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
  return `${dateStr} ${timeStr}`;
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
      date: now,
      time: now,
      utcDate: utcNow,
      dpValue: null,
      customChildValue: null,
      visible: false,
    }
 
  }
  changeName=() => {
    prompt('', '请输入名字',

  [
    {
      text: '取消',
      onPress: value => new Promise((resolve) => {
        Toast.info('onPress promise resolve', 1);
        setTimeout(() => {
          resolve();
          console.log(`value:${value}`);
        }, 1000);
      }),
    },
    {
      text: '确定',
      onPress: value => new Promise((resolve, reject) => {
        Toast.info('onPress promise reject', 1);
        setTimeout(() => {
          reject();
          console.log(`value:${value}`);
        }, 1000);
      }),
    },
  ], 'default', null, ['请输入姓名'])
}
goBind=()=>{
  this.props.history.push('/bind')
}
  render() {
    return (
      <div style={{height:'100%'}}>

      <div style={{ position: 'absolute', bottom: '50px', top: '0', zIndex: '10',width:'100%' ,background:'#f5f5f5'}}>

        <div className="my_head_box">
                <img className="head_url_center" src={heardUrl}/>  
        </div>

         <List className="date-picker-list" style={{ backgroundColor: 'white',marginTop:'41px' }}>
            <Item
              thumb={nameUrl}
              arrow="horizontal"
              extra={'郝文斌'}
              onClick={this.changeName.bind(this)}
            >姓名</Item>
             <Picker data={district} cols={1}  
                    className="forss"
                    onChange={v =>console.log(v,1)}
                       onOk={v => console.log(v,2)}
            
            >
              <List.Item 
               thumb={sexUrl}
              arrow="horizontal">性别</List.Item>
            </Picker>


            <DatePicker
              mode="date"
              title="Select Date"
              extra="Optional"
              value={this.state.date}
              onChange={date => this.setState({ date })}
            >
              <List.Item 
               thumb={ageUrl}
              arrow="horizontal">年龄</List.Item>
            </DatePicker>
            <Item
              thumb={phoneUrl}
              extra={'18838186419'}
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