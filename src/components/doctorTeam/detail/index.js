import React from 'react';
import ReactDOM from 'react-dom';
import url from '../../../static/images/doctor_team_background@3x.png'
import hearUrl from '../../../static/images/doctor_team_portrait@3x.png'
import person from '../../../static/svg/doctor_team_introduction.svg'
import honor from '../../../static/svg/doctor_team_honor.svg'
import './index.css'

class App extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div>
                <div className="detal_box" style={{width:'100%',
                            height:'214px',
                            background:'url('+url+') no-repeat center',
                            backgroundSize:'100%,100%'
                            }}>
                            <img src={hearUrl} className="detail_head_URL" />
                            <div className="detail_detail">
                            杨铁铸 
                            
                            <span style={{fontSize:'14px',marginLeft:'10px'}}> (主任医师)</span>
                            
                            </div>
                </div>
                <div style={{paddingLeft:'12px',paddingRight:'12px'}}>
                    <div className="personIntroduce">
                           <div className="flex_center">
                               <img src={person}/>
                               <span style={{marginLeft:'15px',fontSize:'16px'}}>个人介绍</span>
                           </div>
                           <div className="in_de" style={{marginTop:'18px'}}>
                           擅长中医诊疗、中医用药。善于使用艾灸、针 灸针对性治疗各种疾病。尤其擅长治疗感冒、 咳嗽、肺热、头痛失眠等症状。
                           </div>
                    
                    
                    </div>

                     <div className="personIntroduce">
                           <div className="flex_center" style={{marginBottom:'18px'}}>
                               <img src={honor}/>
                               <span style={{marginLeft:'15px',fontSize:'16px'}}>获奖荣誉</span>
                           </div>
                           <div className="in_de" >
                           2017年12月获得深圳市十佳医生称号
                           </div>
                           <div className="in_de" >
                           2017年12月获得深圳市十佳医生称号
                           </div>
                           <div className="in_de" >
                           2017年12月获得深圳市十佳医生称号
                           </div>
                    
                    
                    </div>

                </div>
               
            </div>
        )
    }
}
export default App