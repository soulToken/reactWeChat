import React from 'react';
import ReactDOM from 'react-dom';
import url from '../../../static/images/doctor_team_background@3x.png'
import hearUrl from '../../../static/images/doctor_team_portrait@3x.png'
import person from '../../../static/svg/doctor_team_introduction.svg'
import honor from '../../../static/svg/doctor_team_honor.svg'
import {getClinicDoctorDetail} from '../../../api/api'
import {Toast} from 'antd-mobile'
import './index.css'

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            doctorId:this.props.match.params.id,
            getClinicDoctorDetail:getClinicDoctorDetail,
            headUrl:null,
            doctorName:null,
            positio:null,
            selfDescription:null,
            honorList:[]
        }
    }
    componentDidMount() {
        this.getDetail()
    }

    getDetail=()=>{
        var self=this;
        var param="doctorId="+this.state.doctorId
        this.state.getClinicDoctorDetail(param).then(function(res){
            if (res.ok) {
              res.json().then((obj)=> {
                  if(obj.resultCode==="1000"){ 
                            self.setState({
                                headUrl:obj.result.headUrl,
                                doctorName:obj.result.doctorName,
                                positio:obj.result.positio,
                                selfDescription:obj.result.selfDescription,
                                honorList:obj.result.honorList
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
    render(){
        return (
            <div>
                <div className="detal_box" style={{width:'100%',
                            height:'214px',
                            background:'url('+url+') no-repeat center',
                            backgroundSize:'100%,100%'
                            }}>
                            <img src={this.state.headUrl} className="detail_head_URL" />
                            <div className="detail_detail">
                            {this.state.doctorName} 
                            
                            <span style={{fontSize:'14px',marginLeft:'10px'}}> ({this.state.positio})</span>
                            
                            </div>
                </div>
                <div style={{paddingLeft:'12px',paddingRight:'12px'}}>
                    <div className="personIntroduce">
                           <div className="flex_center">
                               <img src={person}/>
                               <span style={{marginLeft:'15px',fontSize:'16px'}}>个人介绍</span>
                           </div>
                           <div className="in_de" style={{marginTop:'18px'}}>
                            {this.state.selfDescription}
                           </div>
                    
                    
                    </div>

                     <div className="personIntroduce">
                           <div className="flex_center" style={{marginBottom:'18px'}}>
                               <img src={honor}/>
                               <span style={{marginLeft:'15px',fontSize:'16px'}}>获奖荣誉</span>
                           </div>

                           {this.state.honorList.map((number,index) =>
                                    <div className="in_de" key={index}  >
                                    {number.authContent}
                                    </div>
                            )}
                          
                    
                    
                    </div>

                </div>
               
            </div>
        )
    }
}
export default App