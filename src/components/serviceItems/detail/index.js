import React from 'react';
import {Toast } from 'antd-mobile';
import {getClinicServerIteamDetail} from '../../../api/api'
class ImagePickerExample extends React.Component {
    constructor(props) {
      document.title="服务详情"
        super(props);
          this.state = {
            getClinicServerIteamDetail:getClinicServerIteamDetail,
            id:this.props.match.params.id,
            result:null,
            show:false,
         
    }
  } 
    componentDidMount(){
        this.getDetail()
    }
    getDetail=()=>{
      var self=this;
      var param="id="+this.state.id;
      Toast.loading('Loading...', 0, () => {
        
      });
      this.state.getClinicServerIteamDetail(param).then(function(res){
        if (res.ok) {
          res.json().then((obj)=> {
            Toast.hide()
              if(obj.resultCode==="1000"){ 
                      //判断是否是刷新操作
                   self.setState({
                      result:obj.result.serverDetail,
                      show:true
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
  render() {
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
    );
  }
}
export default ImagePickerExample