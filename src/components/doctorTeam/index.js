import React from 'react';
import ReactDOM from 'react-dom'
import { Route } from "react-router-dom";
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView, Button,Toast } from 'antd-mobile';
import bannerUrl from '../../static/images/homepage_banner@3x.png';
import Detail from './detail/index'
import {GetRequest} from '../../util/index'
import {getClinicDoctorList} from '../../api/api'
import './index.css'

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
    id:'1'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
    id:'2'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
    id:'3'
  },
];
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
  }
  return dataArr;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      data:[],
      useBodyScroll: true,
      prop:props,
      getClinicDoctorList:getClinicDoctorList
    };
  }


  componentDidUpdate() {
   
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }


  componentDidMount() {
      this.genDataList()
  }
  //获取列表数据决口
  genDataList = (pos=0,count=5,fresh) =>{
    var self=this;
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    var param="position="+pos+"&count="+count
    this.state.getClinicDoctorList(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 

              //判断是否是刷新操作
              if(fresh){
                var newData=obj.result;
              }else{
                var newData=self.state.data.concat(obj.result);
              }
                 self.setState({
                   data:newData,
                   dataSource: self.state.dataSource.cloneWithRows(newData),
                   height: hei,
                   refreshing: false,
                   isLoading: false,
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


  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    this.genDataList(1,5,1)
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    this.genDataList(this.state.data.length)
    // setTimeout(() => {
    //   // this.rData = [...this.rData, ...genData(++pageIndex)];
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(this.state.data),
    //     isLoading: false,
    //   });
    // }, 1000);
  };
  //执行的一个点击事件 判断跳转到 医生详情页面
  handleClick=(e)=>{
        this.props.history.push(`/doctorTeam/${e}`)      
  }

  _renderRow(row, sectionId, rowId) {
    return (
      <div key={row.doctorId}
          style={{
            paddingLeft:'12px',
            paddingRight:'12px',
            background:'rgba(255,255,255,1)',
            boxShadow:'0px 1px 3px 1px rgba(0,0,0,0.15)',
            borderRadius:'14px'
          }}
        >
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px',flexDirection:'row' }}>
            <img style={{ height: '85px', width: '85px', marginRight: '17px',borderRadius:'50%' }} src={row.headUrl} alt="" />
            <div style={{ flex:'1',width:'0'}}>
              <div  className="team_right">
                    <div>
                        <div className="doctor_name">{row.doctorName}</div>
                        <div className="doctor_type">{row.positio}</div>
                    </div>
              
                    {/* (e)=>{
                        console.log(this.state.prop)
                        var id=e.currentTarget.getAttribute("data-obj")
                          debugger;
                        // this.state.prop.history.location.push(`/doctorTeam/${id}`)
              } */}

                    <div className="checkedDetail"  data-obj={row.id}  onClick={this.handleClick.bind(this,row.doctorId)}>查看详情</div>
              
                </div>
              <div className="twoEllipsis2" style={{  marginTop:'10px',WebkitBoxOrient: 'vertical'}}>
              {/* ￥{rowID} */}
              {row.selfDescription}
              </div>
            </div>
          </div>
        </div>
        
    )
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    )
    return (
    <div
    style={{
        paddingLeft:'12px',
        paddingRight:'12px',
        paddingTop:'10px',
        backgroundColor:'rgb(245, 245, 249)'
    }}
    >
      
      <ListView
      className="service_box"
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        onEndReachedThreshold={120}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? "加载中..." : '暂无更多数据'}
        </div>)}
        renderRow={
          this._renderRow.bind(this)
        }
     
        renderSeparator={separator}
        useBodyScroll={this.state.useBodyScroll}
        style={this.state.useBodyScroll ? {} : {
          height: this.state.height,
          border: '1px solid #ddd',
          margin: '5px 0',
        }}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        onEndReached={this.onEndReached.bind(this)}
        pageSize={5}
      />
    </div>);
  }
}
const Topic = ({ match }) => (
    <div>
      <h3>我是医生团队详情</h3>
    </div>
  );

class Iteme extends React.Component {
    constructor(props) {
      super(props);
      const param=GetRequest(this.props.location.search)
      this.state = {
        disabled: false,
        match: this.props.match.path,
        history: this.props.history
      }
      if(param.settingCode&&param.openId){
        window.sessionStorage.setItem('paramInfo',JSON.stringify(param))
      }
  
    }
    render() {
      return (
        <div>
  
          {/* <Switch> */}
  
          <Route exact path={`${this.state.match}`} component={App} />
          <Route path={`${this.state.match}/:id`} component={Detail} />
          {/* </Switch> */}
  
  
        </div>);
    }
  }
  
  
  
  
  export default Iteme 