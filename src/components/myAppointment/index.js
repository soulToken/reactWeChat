
import React from 'react';
import ReactDOM from 'react-dom'
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import TabBarExample from '../tooBar/tooBar'
import { PullToRefresh, Button ,Modal,Toast} from 'antd-mobile';
import url from '../../static/svg/make_an_appointment_hospital.svg'
import {queryAppointmentList} from '../../api/api'
import './index.css'
import { Item } from '../../../node_modules/antd-mobile/lib/tab-bar';
import {modifyAppointmentStatus} from '../../api/api'
const alert = Modal.alert;
function renderTabBar(props) {
  return (<Sticky>
    {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>);
}
const tabs = [
  { title: '待就诊' },
  { title: '历史预约' },
];




function genData() {
  const dataArr = [];
  for (let i = 0; i < 30; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

class Fresher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      down: false,
      height: document.documentElement.clientHeight-94,
      data: [],
      show:false,
      queryAppointmentList:queryAppointmentList,
    };
    console.log(this.props.data)
  }

  componentDidMount() {
    this.getList()
  }
  getList=(pos=0,count=5,status=0)=>{
    var self=this;
    Toast.loading('Loading...', 0, () => {
      console.log('Load complete !!!');
    });
    var param="position="+pos+"&count="+count+"&appointmentStatus="+status
    // const hei = this.state.height-94;
    this.state.queryAppointmentList(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
                Toast.hide()
                var newData=self.state.data.concat(obj.result);
                self.setState({
                  data:newData,
                  // height: hei
                  refreshing:false,
                  show:true
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
  canCel=()=>{
    alert('确定要取消预约？', '', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => console.log('ok') },
    ])
  }
  getNewList=()=>{
    this.setState({ refreshing: true });
    this.getList(this.state.data.length,5,0)
  }
  render() {
    return (
      <div>
     
      <PullToRefresh
        id="fresh"
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
          // WebkitOverflowScrolling:'touch'
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        onRefresh={this.getNewList.bind(this)}
      >

      <div>

           {this.state.data.length>0 ? (
             <div>
        {this.state.data.map((item,index) => (
                
          <div key={index}  className="order_box">
                <div className="order_detail">
                    <div className="order_detail_top">
                          <div className="order_detail_top_left">
                            {item.clinicName}
                          </div>
                          {/* <div className="order_detail_top_right" onClick={this.canCel.bind(this)}>取消预约</div>    */}
                    </div>
                    <div className="order_detail_bottom" >
                                <img src={item.headUrl} className="order_detail_bottom_left" />
                                <div className="order_detail_bottom_right">
                                      <div>科室：{item.classifyStr}</div>
                                      <div>就诊人：{item.nickName}</div>
                                      <div>预约时间：{item.appointmentDate} {item.appointmentTime}</div>
                                </div>
                    </div>
                </div>
          </div>
        ))}
        </div>
      ) : (
        <div>
             {this.state.show  &&
                <div  style={{textAlign:'center',marginTop:'50px'}}> 暂无数据</div>
             }
        </div>
       

       
      )}  
      </div>

      </PullToRefresh>
    </div>);
  }
}



class Fresher2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      down: false,
      height: document.documentElement.clientHeight-94,
      data: [],
      show:false,
      id:null,
      queryAppointmentList:queryAppointmentList,
      modifyAppointmentStatus:modifyAppointmentStatus
    };
    console.log(this.props.data)
  }

  componentDidMount() {
    this.getList()
  }
  changeStatus=(id)=>{
    var self=this;
    var param="id="+id+"&appointmentStatus="+4
    this.state.modifyAppointmentStatus(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              Toast.info('取消预约成功!!!', 1);
              self.getList(0,5,1,1)
            }else{
                Toast.fail(obj.resultMsg, 1);
            }
        })

    }
    }).catch(function(){
      Toast.hide()
      Toast.fail("网络错误", 1);
    })
  }
  getList=(pos=0,count=5,status=1,fresh)=>{
    var self=this;
    
   
    var param="position="+pos+"&count="+count+"&appointmentStatus="+status
    // const hei = this.state.height-94;
    this.state.queryAppointmentList(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
              Toast.hide()
              if(fresh){
                var newData=obj.result
              }else{
                var newData=self.state.data.concat(obj.result);
              } 
                self.setState({
                  data:newData,
                  // height: hei
                  refreshing:false,
                  show:true
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
  canCel=(id)=>{
    var self=this;
    alert('确定要取消预约？', '', [
      { text: '取消', onPress: () =>{

      }  },
      { text: '确定', onPress: () =>{
        self.changeStatus(id)
      } },
    ])
  }
  getNewList=()=>{
    this.setState({ refreshing: true });
    this.getList(this.state.data.length,5,1)
  }
  render() {
    return (
      <div>
     
      <PullToRefresh
        id="fresh"
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
          // WebkitOverflowScrolling:'touch'
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        onRefresh={this.getNewList.bind(this)}
      >

      <div>

           {this.state.data.length>0 ? (
             <div>
        {this.state.data.map((item,index) => (
                
          <div key={index}  className="order_box">
                <div className="order_detail">
                    <div className="order_detail_top">
                          <div className="order_detail_top_left">
                            {item.clinicName}
                          </div>
                          <div className="order_detail_top_right" onClick={this.canCel.bind(this,item.id)}>取消预约</div>   
                    </div>
                    <div className="order_detail_bottom" >
                                <img src={item.headUrl} className="order_detail_bottom_left" />
                                <div className="order_detail_bottom_right">
                                      <div>科室：{item.classifyStr}</div>
                                      <div>就诊人：{item.nickName}</div>
                                      <div>预约时间：{item.appointmentDate} {item.appointmentTime}</div>
                                </div>
                    </div>
                </div>
          </div>
        ))}
        </div>
      ) : (
        <div>
             {this.state.show  &&
                <div  style={{textAlign:'center',marginTop:'50px'}}> 暂无数据</div>
             }
        </div>
       

       
      )}  
      </div>

      </PullToRefresh>
    </div>);
  }
}









class TabExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index:null
    };
    document.title="个人预约"
  }
  change=(el,index)=>{
     this.setState({
       index:index
     })
  }
  render(){
    return(
      <div>
      <div style={{ position: 'absolute', width: '100%', bottom: '50px', top: '0', zIndex: '10', overflow: 'auto',background:'#f5f5f5' }}>
        <WhiteSpace />
        <StickyContainer>
          <Tabs tabs={tabs}
            initalPage={'t2'}
            renderTabBar={renderTabBar}
            // onTabClick={
            //     (el,index)=>{
            //         console.log(el,index)
            //     }
            // }
            onChange={
              
             this.change.bind(this)
            }
          >
          <div > 
              <Fresher2 ></Fresher2>
          </div>
            <div >
            {this.state.index > 0 &&
         <Fresher></Fresher>
          }
           
          </div>
          
          </Tabs>
        </StickyContainer>
        <WhiteSpace />
      </div>
      <TabBarExample></TabBarExample>
    </div>
    )
  }
}
export default TabExample