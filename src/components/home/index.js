
import React, { Component } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import { Grid } from 'antd-mobile';
import TabBarExample from '../tooBar/tooBar';
import { Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import banner from '../../static/images/homepage_banner@3x.png';
import { Flex, WhiteSpace ,Modal, List, Button,Toast} from 'antd-mobile';
import ReactSVG from 'react-svg'
import clinic from '../../static/svg/homepage_clinic.svg'
import location from '../../static/svg/homepage_location.svg'
import doctor from '../../static/svg/hompage_doctor.svg'
import activity from '../../static/svg/homepage_activity.svg'
import wifi from '../../static/svg/homepage_wifi.svg'
import mall from '../../static/svg/homepage_mall.svg'
import {getClinicWIFI,getClinicBanner,getSignature4Js,getClinicBaseinfo} from '../../api/api'
import  {GetRequest} from '../../util/index'


const PlaceHolder = ({ className = '', ...restProps }) => (
  <div  onClick={ (e) => {
      var a={...restProps};
      const name=e.currentTarget.getAttribute('name2');
      //根据不同情况跳转到 不同路由
      if(name=='预约'){
        // a.prop.history.push('/onlineBook')
      }else if(name=='诊所介绍'){
        a.prop.history.push('/clinicIntroduce')
      }else if(name=='诊所地址'){
          console.log('跳转到诊所地址路由')
      }else if(name=='服务项目'){
        a.prop.history.push('/serviceItems')
      }else if(name=='医生团队'){
        a.prop.history.push('/doctorTeam')
      }else if(name=='诊所活动'){
        a.prop.history.push('/activity')
      }else if(name=='免费无线'){
        console.log('免费无线')
      }else if(name=='诊所商城'){
        console.log('诊所商城')
      }    
  } } className={`${className} placeholder`} {...restProps}  style={{display:'flex',flexDirection:'row',alignItems:'center',alignContent:'center',justifyContent:'center',color:'#808080'}}> 
      
      <ReactSVG
        path={`${restProps.url}`}
        evalScripts="always"
        onInjected={svg => {
          console.log('onInjected', svg)
        }}
        renumerateIRIElements={false}
        svgClassName="svg-class-name"
        svgStyle={{ width: 34 ,height:34}}
        className="wrapper-class-name"
        // onClick={() => {
        //   console.log('wrapper onClick')
        // }}
       />

       <span style={{fontSize:'18px'}}>   
        {`${restProps.name}`}
       
       </span>
  </div>
);

class FlexExample  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      GetRequest:GetRequest,
      modal1: false,
      getClinicWIFI:getClinicWIFI,
      getSignature4Js:getSignature4Js,
      getClinicBaseinfo:getClinicBaseinfo,
      wifiImg:null,
      lat:null,
      lon:null,
    }
    
    console.log(this.state.GetRequest(this.props.prop.location.search))
  }
  componentDidMount(){
    // this.state.mock('',{settingCode:1010100010})
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  getPosition=()=>{
    var self=this;
    this.state.getClinicBaseinfo().then((res)=>{
      if (res.ok) {
          res.json().then((obj)=> {
              if(obj.resultCode==="1000"){
                      Toast.hide()
                      self.setState({
                        lat:obj.result.lat,
                        lon:obj.result.lon
                      })
                      self.getMap(obj.result.lat,obj.result.lon,obj.result.clinicName)

              }else{
                  Toast.fail(obj.resultCode, 1);
              }
             
  
          })
  
      }
  }
  ).catch((res)=>{
      Toast.fail("网络错误", 1);
  })
 
  }
  wifi=()=>{
    // this.setState({
    //   modal1:true
    // })
    if(this.state.wifiImg){
      this.setState({
      modal1:true
    })
    }else{
        this.getWifi()
    }
   
  }
  getWifi=()=>{
    var self=this;
    this.state.getClinicWIFI().then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              Toast.hide()
              if(obj.result&&obj.result.wifiImg){
                self.setState({
                  wifiImg:obj.result.wifiImg,
                  modal1:true
                 })
              }
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
  getMap=(lat,lon,name)=>{
    var self=this;
    this.state.getSignature4Js().then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              // console.log()
              if(obj.result){
                window.wx.config({
                  debug : false,
                  appId : obj.result.appId,
                  timestamp : obj.result.timestamp,
                  nonceStr : obj.result.noncestr,
                  signature : obj.result.signature,
                  jsApiList : [ 'checkJsApi', 'onMenuShareTimeline',
                          'onMenuShareAppMessage', 'getLocation', 'openLocation',
                          'hideOptionMenu' ]
              });
              window.wx.ready(function() {
                  // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
                  window.wx.checkJsApi({
                      jsApiList : [ 'getNetworkType', 'previewImage','openLocation','getLocation' ],
                      success : function(res) {
                          // 以键值对的形式返回，可用的api值true，不可用为false
                          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                      }
                  });
                  window.wx.hideOptionMenu();
                  // 2. 分享接口
                  window.wx.getLocation({
                      type : 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                      success : function(res) {
                          // alert(JSON.stringify(res));
                          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                          // $("#latitude").val(latitude);
                          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                          // $("#longitude").val(longitude);
                          var speed = res.speed; // 速度，以米/每秒计
                          // $("#speed").val(speed);
                          var accuracy = res.accuracy; // 位置精度
                          // alert(latitude,longitude)
                          // $("#accuracy").val(accuracy);
                      },
                      cancel : function(res) {
                          alert('用户拒绝授权获取地理位置');
                      }
                  });
                  window.wx.openLocation({
                    latitude: lat, // 纬度，浮点数，范围为90 ~ -90
                    longitude: lon, // 经度，浮点数，范围为180 ~ -180。
                    name: name, // 位置名
                    address: '', // 地址详情说明
                    scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
                    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                    });
                })
                  window.wx.error(function(res){
                      // alert(res)
                  });
              }
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
  //判断去绑定还是去 预约
  bindOrYuyue=()=>{
    var loginInfo=JSON.parse(sessionStorage.getItem("loginInfo")) 
        if(loginInfo&&loginInfo.mobile){
          this.props.prop.history.push('/onlineBook')
        }else{
          this.props.prop.history.push('/bind')
        }
  }
  render(){
      return (
        <div className="flex-container" style={{marginTop:'15px'}}>
          <Flex>
            <Flex.Item><PlaceHolder prop={this.props.prop} onClick={this.bindOrYuyue.bind(this)} className="good" name=" " name2="预约" /></Flex.Item>
            <Flex.Item>
                  <PlaceHolder prop={this.props.prop}  url={clinic} name="诊所介绍"  name2="诊所介绍"/>
                  <PlaceHolder prop={this.props.prop}   onClick={this.getPosition.bind(this)}  url={location} name="诊所地址" name2="诊所地址" /> 
            </Flex.Item>
          </Flex>
          <WhiteSpace style={{marginBottom:'5px'}}></WhiteSpace>
          <Flex>
            <Flex.Item><PlaceHolder prop={this.props.prop} className="good2" name=" " name2="服务项目"/></Flex.Item>
            <Flex.Item>
                  <PlaceHolder prop={this.props.prop} url={doctor}  name="医生团队" name2="医生团队"/>
                  <PlaceHolder prop={this.props.prop} url={activity} name="诊所活动" name2="诊所活动" /> 
            </Flex.Item>
          </Flex>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <Flex.Item><PlaceHolder prop={this.props.prop} url={wifi}  onClick={this.wifi.bind(this)} name="免费无线" name2="免费无线"/></Flex.Item>
            <Flex.Item>
                  <PlaceHolder prop={this.props.prop} url={mall} name="诊所商城" name2="诊所商城"/> 
            </Flex.Item>
          </Flex>
          <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="长按识别二维码"
          footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: 140 }}>
                <img style={{height:"100%"}} src={this.state.wifiImg} />
          </div>
        </Modal>



        </div>
        )
   }
}




class Lunbo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      match: this.props.match.path,
      history: this.props.history,
      data: [],
      imgHeight: 176,
      getClinicBanner:getClinicBanner
    }
  }
  
  componentDidMount() {
    // simulate img loading
    this.getBanner()
   
  }
  getBanner=()=>{
    var self=this;
    var param="pageType=1"
    this.state.getClinicBanner(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              Toast.hide()
                self.setState({
                  data:obj.result
                 })
              
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
        <div className="top_zindex" style={{ position: 'absolute', top: '0', bottom: '50px', right: '0', left: '0', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <WingBlank>
            <Carousel
              autoplay={false}
              infinite
              autoplay="true"
            //   beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            //   afterChange={index => console.log('slide to', index)}
            >
              {this.state.data.map((val,index) => (
                <div
                  key={index}
                 
                  // href="http://www.alipay.com"
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    src={val.bannerUrl}
                    alt={index}
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </WingBlank>
          <FlexExample prop={this.props}></FlexExample>
            
        </div>
        <TabBarExample></TabBarExample>
      </div>
    );
  }
}



const Topic = ({ match }) => (
  <div>
    <h3>我是2222</h3>
  </div>
);
class Iteme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      match: this.props.match.path,
      history: this.props.history
    }
  }
  render() {
    return (
      <div>

        {/* <Switch> */}

        <Route exact path={`${this.state.match}`} component={Lunbo} />
        <Route  path={`${this.state.match}/detail`} component={Topic} />
        {/* </Switch> */}


      </div>);
  }
}
export default Iteme
