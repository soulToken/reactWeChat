
import React from 'react';
import { List, Switch, Calendar ,InputItem, WhiteSpace,Button ,Modal,WingBlank } from 'antd-mobile';
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
import { createForm } from 'rc-form';
import './index.css'
import success from '../../static/svg/online_booking_time_success.svg'
import fail from '../../static/svg/online_booking_time_fail.svg' 
import { Picker} from 'antd-mobile';

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

// class Test extends React.Component {
//   state = {
//     data: [],
//     cols: 1,
//     pickerValue: [],
//     asyncValue: [],
//     sValue: ['2013', '春'],
//     visible: false,
//   };



//   render() {
//     const { getFieldProps } = this.props.form;
//     return (<div>
//       <WhiteSpace size="lg" />
//       <List style={{ backgroundColor: 'white' }} className="picker-list">
       
       
//         <Picker data={district} cols={1} {...getFieldProps('district3')} className="forss">
//           <List.Item arrow="horizontal">Single</List.Item>
//         </Picker>
//       </List>
//     </div>);
//   }
// }
// const TestWrapper = createForm()(Test);











const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: '#fff', paddingLeft: 15 }}
  >
    <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
      <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
      <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>
    </div>
  </div>
);

class BasicInputExample extends React.Component {
   
    constructor(props) {
      super(props);
      this.state = {
        en: false,
        show: false,
        config: {},
        startTime:'',
        chooseTreatment:'还没选择呢',
        pickerValue2:'默认医生',
        modal1: false,
        modal2: false,
      };
    }
  componentDidMount() {
    // this.autoFocusInst.focus();
  }
  handleClick = () => {
      //获取 输入框里面的值
      if(this.inputRef.props.value){
        console.log(this.inputRef.props.value.replace(/ /g,''))
      }
    // this.inputRef.focus();
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }
  render() {
    const { getFieldProps } = this.props.form;
    const district=[{
      value:'harry',
      label:'1'
    },
    {
      value:'binn',
      label:'2'
    }
  
  ]
    return (
      <div style={{height:'100%',width:'100%',background:'#F7F7F7'}}>
        <List className='goods'>
          <InputItem
          className="line2"
            {...getFieldProps('autofocus')}
            clear
            placeholder="请输入姓名"
            ref={el => this.autoFocusInst = el}
          >姓名:</InputItem>
          <div className="line"></div>
          <InputItem
            {...getFieldProps('phone')}
            type="phone"
            clear
            placeholder="请输入联系方式"
            ref={el => this.inputRef = el}
          >电话:</InputItem>
        
        </List>
        <div className="data_content">
                <div>选择预约日期(必选)</div>
                <div className="date_bottom">
                  <div className=" date_box">
                        <span className="f_10">星期二</span>
                        <div className="f_16">06/11</div>
                  </div>
                  <div className=" date_box">
                        <span className="f_10">星期二</span>
                        <div className="f_16">06/11</div>
                  </div>
                  <div className="date_1 date_box">
                        <span className="f_10">星期二</span>
                        <div className="f_16">06/11</div>
                  </div>
                  <div className=" date_box">
                        <span className="f_10">星期二</span>
                        <div className="f_16">06/11</div>
                  </div>
                  <div className=" date_box">
                        <span className="f_10">星期二</span>
                        <div className="f_16">06/11</div>
                  </div>
                  <div className=" date_box">
                        <span className="f_10">星期二</span>
                        <div className="f_16">06/11</div>
                  </div>
                  <div className="date_box">
                        <span className="f_10">星期二</span>
                        <div className="f_16">06/11</div>
                  </div>
                </div>
          </div>
          <div className="time_content">
          <div>选择预约日期(必选)</div>
                <div className="time_bottom">
                  <div className=" time_box">
                        
                        <div className="f_16">06/11</div>
                  </div>
                  <div className=" time_box">
                       
                        <div className="f_16">06/11</div>
                  </div>
                  <div className="time_1 time_box">
                      
                        <div className="f_16">06/11</div>
                  </div>
                  <div className=" time_box">
                       
                        <div className="f_16">06/11</div>
                  </div>
                  <div className=" time_box">
                      
                        <div className="f_16">06/11</div>
                  </div>
                  <div className=" time_box">
                      
                        <div className="f_16">06/11</div>
                  </div>
                  <div className="time_box">
                      
                        <div className="f_16">06/11</div>
                  </div>
                </div>

          </div>
          {/* 选择框 */}
          <div>
      <WhiteSpace size="lg" />
      <List style={{ backgroundColor: 'white' }} className="picker-list">
       
       
        <Picker data={district} cols={1} className="forss"  
        onChange={v => this.setState({ pickerValue: v })}    
        onOk={(e) =>  console.log(e[0])}
         
        //   this.setState=({
        //   chooseTreatment:this.state.pickerValue
        // })
      // }  
        extra={this.state.pickerValue }
        >
          <List.Item arrow="horizontal" >
             选择诊疗项目
          </List.Item>
         
        </Picker>
      </List>
      <WhiteSpace size="lg" />
      <List style={{ backgroundColor: 'white' }} className="picker-list">
       
       
        <Picker data={district} cols={1} className="forss"  
        onChange={v => this.setState({ pickerValue2: v })}    
        onOk={(e) =>  console.log(e[0])}
         
        //   this.setState=({
        //   chooseTreatment:this.state.pickerValue
        // })
      // }  
        extra={this.state.pickerValue2 }
        >
          <List.Item arrow="horizontal" >
             选择诊疗医生
          </List.Item>
        </Picker>
      </List>
      <Button type="primary"  onClick={this.showModal('modal2')}  style={{width:"90%",marginLeft:'5%',marginTop:'30px'}}>提交预约</Button><WhiteSpace />

        
        
        <Modal
          popup
          visible={this.state.modal2}
          maskClosable={false}
          onClose={this.onClose('modal2')}
          animationType="slide-up"
        >
          <List className="popup-list">
           
            <div className="alertContent">
                <img src={success} />
                  <div style={{color:"#000000",fontSize:'15px;'}}>您已成功预约</div>
                  <div className="chooseTimeshow">就诊时间 2018-6-13 8:00</div>
            </div>
            <Button type="primary" onClick={this.onClose('modal2')}   style={{marginBottom:'30px'}}>确定</Button>
          </List>
        </Modal>





    </div>

            
      </div>
    );
  }
}
const BasicInputExampleWrapper = createForm()(BasicInputExample);
export default BasicInputExampleWrapper