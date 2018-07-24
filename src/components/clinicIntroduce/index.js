import React from 'react';
import './index.css';
import url from '../../static/images/homepage_banner@3x.png'
import phone from '../../static/svg/clinic_introduction_telephone.svg'
import address from '../../static/svg/clinic_introduction_address.svg'
import navigation from '../../static/svg/clinic_introduction_navigation.svg'


class App extends React.Component{
    constructor(props) {
      super(props);
    
    }
    render(){
        return(
            <div className="introduce_Box">
                <div className="introduce_top">
                        <img className="introduce_banner"  src={url} />
                        <div className="introduce_bottom">
                            <div className="introduce_con">
                                <div className="introduce_con_c" onClick={()=>{console.log("拨打电话")}}>
                                            <img  src={phone} />
                                            <span className="phoneNum">0755-9876</span>
                                </div>
                                <div className="introduce_line"></div>
                                <div className="introduce_con_c">
                                            <img  src={address} />
                                            <span className="intruduce_address">深圳市南山区按时大苏打大苏打撒旦</span>
                                            <img  src={navigation} onClick={()=>{console.log("去调用地图")}} />
                                </div>
                            </div>
                        </div>
                </div>
                <div className="introduce_title">诊所介绍</div>
                <div  className="clinic_introduce_content">
                    恒信口腔医院是河源市批准注册的正规医疗机构 是广东省口腔医院的协作单位。河源口腔医院高起点 的规划，以口腔医院的标准配置设备，引进先进的代 表国际领先水平的牙科设备，是目前河源地区规模、 设备最为齐全的口腔医疗机构之一。营业面积
                </div>
                <div className="under_line"></div>
                <div className="introduce_title2">诊所环境</div>
                <div className="introduce_pic">
                    <img src={url} />
                </div>
                <div className="introduce_pic">
                    <img src={url} />
                </div>
                <div className="introduce_pic">
                    <img src={url} />
                </div>
            </div>
        )
    }
}
export default App
