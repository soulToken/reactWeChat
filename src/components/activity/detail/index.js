import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import {Toast} from 'antd-mobile'
import {getClinicActivityDetail} from '../../../api/api'

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            getClinicActivityDetail:getClinicActivityDetail,
            id:this.props.match.params.id,
            result:null,
        }
        document.title="活动详情"
    }
    componentDidMount(){
        this.getDetail()
    }
    getDetail=()=>{
        var self=this;
        var param="id="+this.state.id
        this.state.getClinicActivityDetail(param).then(function(res){
            if (res.ok) {
              res.json().then((obj)=> {
                  if(obj.resultCode==="1000"){ 
                          self.setState({
                              result:obj.result.activityDetail
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
            <div style={
                {
                  paddingLeft:'15px',
                  paddingRight:'15px'
                }
              }>
                {this.state.result ? (
                       <div    dangerouslySetInnerHTML={{
                        __html: this.state.result
                      }}>
                      </div>
              ) : ( 
                 <div style={{textAlign:'center',marginTop:'100px'}}>
                 
                            {this.state.show ? (
                                <div style={{textAlign:'center',marginTop:'100px'}}>
                                暂无相关数据
                              </div>
                                
                          ) : ( 
                            <div style={{textAlign:'center',marginTop:'100px'}}>
                          
                               </div>
                            
                          )}
                 
                 </div>
              )}
              </div>
        )
    }
}
export default App