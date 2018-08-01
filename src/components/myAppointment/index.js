
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
      height: document.documentElement.clientHeight,
      data: [],
    };
    console.log(this.props.data)
  }

  componentDidMount() {
    // console.log(ReactDOM.findDOMNode(this.ptr).offsetTop)
    // const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;

    console.log(document.getElementById('fresh').offsetTop)
    const hei = this.state.height-100;
    setTimeout(() => this.setState({
      height: hei,
      data: genData(),
    }), 0);
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
          WebkitOverflowScrolling:'touch'
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          debugger;
          this.setState({ refreshing: true });
          setTimeout(() => {
            this.setState({ refreshing: false });
          }, 1000);
        }}
      >
        {this.state.data.map(i => (
          <div key={i} style={{ textAlign: 'center', padding: 20 }}>
            {this.state.down ? 'pull down' : 'pull up'} {i}
          </div>
        ))}
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
      height: document.documentElement.clientHeight,
      data: [],
      queryAppointmentList:queryAppointmentList,
    };
    console.log(this.props.data)
  }

  componentDidMount() {
    // console.log(ReactDOM.findDOMNode(this.ptr).offsetTop)
    // const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    this.getList()
  }
  getList=(pos=0,count=5,status=1)=>{
    var self=this;
    var param="position="+pos+"&count="+count+"&appointmentStatus="+status
    const hei = this.state.height-100+6;
    this.state.queryAppointmentList(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
                var newData=self.state.data.concat(obj.result);
                self.setState({
                  data:newData,
                  height: hei
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
          WebkitOverflowScrolling:'touch'
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        onRefresh={() => {
         
          this.setState({ refreshing: true });
          setTimeout(() => {
            this.setState({ refreshing: false });
          }, 1000);
        }}
      >
        {this.state.data.map((item,index) => (
          
          <div key={index}  className="order_box">
                <div className="order_detail">
                    <div className="order_detail_top">
                          <div className="order_detail_top_left">
                          惠州市恒信口腔惠州分院
                          </div>
                          <div className="order_detail_top_right" onClick={this.canCel.bind(this)}>取消预约</div>   
                    </div>
                    <div className="order_detail_bottom" >
                                <img src={url} className="order_detail_bottom_left" />
                                <div className="order_detail_bottom_right">
                                      <div>科室：口腔科门诊</div>
                                      <div>就诊人：张晓明</div>
                                      <div>预约时间：2018-06-13 08:00</div>
                                </div>
                    </div>
                </div>
          </div>
        ))}
      </PullToRefresh>
    </div>);
  }
}











const TabExample = () => (
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
            (el, index) => {
              console.log(el, index)
            }
          }
        >
        <div > 
            <Fresher2  data={{good:1}}></Fresher2>
        </div>
          <div >
          <Fresher2></Fresher2>
        </div>
        
        </Tabs>
      </StickyContainer>
      <WhiteSpace />
    </div>
    <TabBarExample></TabBarExample>
  </div>
);
export default TabExample