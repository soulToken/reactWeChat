import React from 'react';
import './index.css';
import url from '../../static/images/homepage_banner@3x.png'
import phone from '../../static/svg/clinic_introduction_telephone.svg'
import address from '../../static/svg/clinic_introduction_address.svg'
import navigation from '../../static/svg/clinic_introduction_navigation.svg'

import { Toast } from 'antd-mobile';
import {getClinicBaseinfo} from '../../api/api'
//图片放大组件
import Zmage from 'react-zmage'


class App extends React.Component{
    constructor(props) {
      super(props);
        this.state={
            getClinicBaseinfo:getClinicBaseinfo,
            obj:null,
            headUrl:'',
            edtPhone:null,
            city:null,
            area:null,
            street:null,
            address:null,
            clinicIntroduce:null,
            clinicEnvironmentList:[]
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
                                clinicEnvironmentList:obj.result.clinicEnvironmentList
        
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
    render(){
        return(
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
                                            <img  src={navigation} onClick={()=>{console.log("去调用地图")}} />
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
        )
    }
}
export default App
