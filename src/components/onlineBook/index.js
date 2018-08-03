
import React from 'react';
import { List, Switch, Calendar ,InputItem, WhiteSpace,Button ,Modal,WingBlank } from 'antd-mobile';
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
import { createForm } from 'rc-form';
import './index.css'
import success from '../../static/svg/online_booking_time_success.svg'
import fail from '../../static/svg/online_booking_time_fail.svg' 
import {getClinicAppointmentTimes,getClinicDoctorList,getClinicServerIteamList,subscriberAppointmentInfo,getUserBaseinfo} from '../../api/api'
import {getDateArr} from '../../util/index'
import { Picker,Toast} from 'antd-mobile';

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
class BasicInputExample extends React.Component {
   
    constructor(props) {
      super(props);
      this.state = {
        en: false,
        show: false,
        config: {},
        startTime:'',
        name:null,
        phone:null,
        chooseTreatment:'还没选择呢',
        pickerValue2:'默认医生',
        modal1: false,
        modal2: false,
        chooseTime:[], //可选择的时间段
        chooseDate:[],
        doctorList:[],
        serviceList:[],
        currentChooseTime:null,//当前选择的时间段
        currentChooseDate:null,//当前选择的日期
        currchooseDateIndex:null,
        getClinicAppointmentTimes:getClinicAppointmentTimes,
        getClinicDoctorList:getClinicDoctorList,
        getClinicServerIteamList:getClinicServerIteamList,
        subscriberAppointmentInfo:subscriberAppointmentInfo,
        getUserBaseinfo:getUserBaseinfo,
        getDateArr:getDateArr,
      };
    }
  componentDidMount() {
    // this.autoFocusInst.focus();
    this.canChooseTime();
    var timeDate=this.state.getDateArr(6);
    var name=JSON.parse(sessionStorage.getItem('loginInfo')).name;
    var phone=JSON.parse(sessionStorage.getItem('loginInfo')).mobile;
    this.setState({
      chooseDate:timeDate,
      name:name,
      phone:phone
    })
    //获取医生列表
    this.getDoctorList();
    //获取服务列表
    this.getServiceList()
  }
  //获取医生列表
  getDoctorList=()=>{
    var self=this;
    this.state.getClinicDoctorList().then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
                  var data=[]
                    obj.result.map(function(item,index){
                          var a={}
                          a.label=item.doctorName;
                          a.value=item.doctorId;
                          data.push(a)
                    })
                    self.setState({
                      doctorList:data
                    })
            }else{
             
                Toast.fail(obj.resultMsg, 1);
            }
        })
    }
    }).catch(function(){
      Toast.fail("网络错误", 1);
    })
  }
  getServiceList=()=>{
    var self=this;
    this.state.getClinicServerIteamList().then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
                  var data=[]
                    obj.result.map(function(item,index){
                          var a={}
                          a.label=item.clisName;
                          a.value=item.id;
                          data.push(a)
                    })
                    self.setState({
                      serviceList:data
                    })
            }else{
                Toast.fail(obj.resultMsg, 1);
            }
        })
    }
    }).catch(function(){
      Toast.fail("网络错误", 1);
    })
  }
  //可选择的时间段
  canChooseTime=()=>{
    var self=this;
    this.state.getClinicAppointmentTimes().then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
                self.setState({
                  chooseTime:obj.result
                })
               
            }else{
             
                Toast.fail(obj.resultMsg, 1);
            }
        })
    }
    }).catch(function(){
      Toast.fail("网络错误", 1);
    })
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
  //选择
  choose=(item,index)=>{
      this.setState({
        currentChooseTime:item
      }) 
  }
  chooseCurrentDate=(item,index)=>{
        this.setState({
          currentChooseDate:item,
          currchooseDateIndex:index
        }) 
  }
  //选择医生
  chooseDoctor=(v)=>{
     var data=this.state.doctorList.filter(function(item,index){
           return  item.value==v[0]
     })[0].label
     this.setState({
       pickerValue2:data,
       doctorId:v[0]
     })
  }
  //选择服务
  chooseService=(v)=>{
                var data=this.state.serviceList.filter(function(item,index){
                  return  item.value==v[0]
            })[0].label
            this.setState({
              pickerValue:data,
              appointmentServeritemId:v[0]

            })
  }
  //提交
  submit=()=>{
    if(!this.state.currentChooseDate){
      Toast.info('请选择预约日期 !!!', 1);
      return 
    }
    if(!this.state.currentChooseTime){
      Toast.info('请选择预约时间点 !!!', 1);
      return 
    }
    var doctorId="";
     if(this.state.doctorId){
      var doctorId=parseInt(this.state.doctorId);
     }
  
     var doctorName=""
     if(this.state.pickerValue2&&this.state.pickerValue2!="默认医生"){
      var doctorName=this.state.pickerValue2;
     }
      const appointmentDate=this.state.currentChooseDate.time;
      const appointmentTime=this.state.currentChooseTime;
      var appointmentServeritem="";
      if(this.state.pickerValue){
        var appointmentServeritem=this.state.pickerValue;
      }
      const userName=this.state.name;
      const mobile=this.state.phone;
      var appointmentServeritemId=""
      if(this.state.appointmentServeritemId){
        var appointmentServeritemId=parseInt(this.state.appointmentServeritemId);
      }
      var param="doctorId="+doctorId+"&doctorName="+doctorName+"&appointmentDate="+appointmentDate+"&appointmentTime="+appointmentTime+"&appointmentServeritem="+appointmentServeritem+"&appointmentName="+userName+"&appointmentMobile="+mobile+"&appointmentServeritemId="+appointmentServeritemId
    
      this.subscribe(param)
    }
  subscribe=(param)=>{
    var self=this;
    this.state.subscriberAppointmentInfo(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
               self.setState({
                modal2:true
               })
            }else{
                Toast.fail(obj.resultMsg, 1);
            }
        })
    }
    }).catch(function(){
      Toast.fail("网络错误", 1);
    })
  }
  success=()=>{
    this.setState({
      modal2:false
    })
    this.props.history.replace("/")
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
            editable={false}
            value={this.state.name}
            ref={el => this.autoFocusInst = el}
          >姓名:</InputItem>
          <div className="line"></div>
          <InputItem
            {...getFieldProps('phone')}
            type="phone"
            clear
            editable={false}
            value={this.state.phone}
            placeholder="请输入联系方式"
            ref={el => this.inputRef = el}
          >电话:</InputItem>
        
        </List>
        <div className="data_content">
                <div>选择预约日期(必选)</div>
                <div className="date_bottom">
                

                      {this.state.chooseDate.map((item,index) =>

                          <div  key={index} className={this.state.currchooseDateIndex===index?'date_1':'date_box'}   onClick={this.chooseCurrentDate.bind(this,item,index)}>
                                <span className="f_10">{item.valye}</span>
                                <div className="f_16">{item.label}</div>
                          </div>
                      )}
                
                </div>
          </div>
          <div className="time_content">
          <div>选择预约时间(必选)</div>
                <div className="time_bottom">
                  
                {this.state.chooseTime.map((item,index) =>
                      
                    <div  className={this.state.currentChooseTime===item?'time_1':'time_box'} key={index}  onClick={this.choose.bind(this,item,index)}  > 
                          <div className="f_16">{item}</div>
                    </div>
 
                )}


                
                </div>

          </div>
          {/* 选择框 */}
          <div>
      <WhiteSpace size="lg" />
      {this.state.serviceList.length > 0 &&
          <List style={{ backgroundColor: 'white' }} className="picker-list">
       
       
      
          <Picker data={this.state.serviceList} cols={1} className="forss"  
          onChange={this.chooseService.bind(this)}    
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
      }
    
      <WhiteSpace size="lg" />

         {this.state.doctorList.length > 0 &&
      <List style={{ backgroundColor: 'white' }} className="picker-list">
       
       
        <Picker data={this.state.doctorList} cols={1} className="forss"  
        onChange={this.chooseDoctor.bind(this)}    
        onOk={(e) =>  console.log(e[0])}
         
        //   this.setState=({
        //   chooseTreatment:this.state.pickerValue
        // })
      // } 
        // value={this.state.pickerValue2 }
        extra={this.state.pickerValue2 }
        >
          <List.Item arrow="horizontal" >
             选择诊疗医生
          </List.Item>
        </Picker>
      </List>
      }

      <Button type="primary"  onClick={this.submit.bind(this)}  style={{width:"90%",marginLeft:'5%',marginTop:'30px'}}>提交预约</Button><WhiteSpace />

        
        
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
                  <div style={{color:"#000000",fontSize:'15px'}}>您已成功预约</div>
                  <div className="chooseTimeshow">就诊时间 
                  
                  {this.state.currentChooseDate &&
                      <span> {this.state.currentChooseDate.label}号 </span>
                  }
                  {this.state.currentChooseTime}
                  </div>
            </div>
            <Button type="primary" onClick={this.success.bind(this)}   style={{marginBottom:'30px'}}>确定</Button>
          </List>
        </Modal>





    </div>

            
      </div>
    );
  }
}
const BasicInputExampleWrapper = createForm()(BasicInputExample);
export default BasicInputExampleWrapper