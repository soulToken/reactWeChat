import React from 'react';
import './index.css';
import url from '../../static/images/homepage_banner@3x.png'
import phone from '../../static/svg/clinic_introduction_telephone.svg'
import address from '../../static/svg/clinic_introduction_address.svg'
import navigation from '../../static/svg/clinic_introduction_navigation.svg'

import { Toast } from 'antd-mobile';
import {getClinicBaseinfo,getSignature4Js} from '../../api/api'
import {GetRequest} from '../../util/index'
//图片放大组件
import Zmage from 'react-zmage'


class App extends React.Component{
    constructor(props) {
      super(props);
      document.title="诊所介绍"
      const param=GetRequest(this.props.location.search)
        this.state={
            getClinicBaseinfo:getClinicBaseinfo,
            getSignature4Js:getSignature4Js,
            obj:null,
            headUrl:'',
            show:false,
            edtPhone:null,
            city:null,
            area:null,
            street:null,
            address:null,
            clinicIntroduce:null,
            clinicEnvironmentList:[],
            lat:null,
            lon:null,
            clinicName:null
        }
        if(param.settingCode&&param.openId){
            window.sessionStorage.setItem('paramInfo',JSON.stringify(param))
          }
    }
  componentDidMount() {
      var self=this;
      Toast.loading('Loading...', 0, () => {
      
      },true);
        this.state.getClinicBaseinfo().then((res)=>{
            if (res.ok) {

                res.json().then((obj)=> {
                    if(obj.resultCode==="1000"){
                            Toast.hide()
                            self.setState({
                                headUrl:obj.result.headUrl,
                                edtPhone:obj.result.edtPhone,
                                city:obj.result.city,
                                area:obj.result.area,
                                street:obj.result.street,
                                address:obj.result.address,
                                clinicIntroduce:obj.result.clinicIntroduce,
                                clinicEnvironmentList:obj.result.clinicEnvironmentList,
                                lat:obj.result.lat,
                                clinicName:obj.result.clinicName,
                                lon:obj.result.lon,
                                show:true
        
                            })
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
//打开地图
getMap=()=>{
    var self=this;
    this.state.getSignature4Js().then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
                if(obj.result){
                      // console.log()
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
                  latitude: self.state.lat, // 纬度，浮点数，范围为90 ~ -90
                  longitude: self.state.lon, // 经度，浮点数，范围为180 ~ -180。
                  name: self.state.clinicName, // 位置名
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
    render(){
        return(
            <div>
                     {this.state.show ? (
                            



            <div className="introduce_Box">
         
            <div className="introduce_top">
               {this.state.headUrl &&
                    <img className="introduce_banner"  src={this.state.headUrl} />
                }
                        <div className="introduce_bottom">
                            <div className="introduce_con">
                                <div className="introduce_con_c" onClick={()=>{
                                    
                                    console.log(this.state.edtPhone);
                                    if(this.state.edtPhone){
                                        window.location.href = 'tel://' + this.state.edtPhone;
                                    }
                                    
                                    }}>
                                            <img  src={phone} />
                                            <span className="phoneNum">
                                            {this.state.edtPhone &&
                                                this.state.edtPhone
                                            }
                                            </span>
                                </div>
                                <div className="introduce_line"></div>
                                <div className="introduce_con_c">
                                            <img  src={address} />
                                            <span className="intruduce_address">
                                                {this.state.city+this.state.area+this.state.street+this.state.address}
                                            </span>
                                            <img  src={navigation} onClick={this.getMap.bind(this)} />
                                </div>
                            </div>
                        </div>
                </div>
                <div className="introduce_title">诊所介绍</div>
                <div  className="clinic_introduce_content">
                   {this.state.clinicIntroduce}
                </div>
                <div className="under_line"></div>
                <div className="introduce_title2">诊所环境</div>
                {this.state.clinicEnvironmentList.map((index,item) =>
     
                    <div className="introduce_pic" key={item}>
                        <img src={this.state.clinicEnvironmentList[item].fileUrl} />
                    </div>
 
                 )}
                
                    
                
            </div>
        
      ) : (
        <div></div>
      )}
            </div>
        )
    }
}
export default App
