
import React from 'react';
import ReactDOM from 'react-dom'
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { Route } from "react-router-dom";
import { PullToRefresh, ListView, Button ,Toast} from 'antd-mobile';
import {getClinicServerIteamList,getClinicBanner} from '../../../api/api';
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
        data:[],
        bannerData:null,
        getClinicServerIteamList:getClinicServerIteamList,
        height: document.documentElement.clientHeight,
        getClinicBanner:getClinicBanner,
        useBodyScroll: true,
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
      this.getBanner()
      this.getList()
      
    // this.setState({
    //   data:  [
    //       {
    //         img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    //         title: 'Meet hotel',
    //         des: '不是所有的兼职汪都需要风吹日晒',
    //         id:1
    //       },
    //       {
    //         img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    //         title: 'Meet hotel',
    //         des: '不是所有的兼职汪都需要风吹日晒',
    //         id:2
    //       },
    //       {
    //         img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    //         title: 'Meet hotel',
    //         des: '不是所有的兼职汪都需要风吹日晒',
    //         id:3
    //       }
    //     ]
    // })
    //   const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
  
    //   setTimeout(() => {
    //     this.rData = genData();
    //     var data=this.state.data
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(data),
    //       height: hei,
    //       refreshing: false,
    //       isLoading: false,
    //     });
    //     console.log(this.state)
    //   }, 1500);
    }
  
  
    _renderRow(row, sectionId, rowId) {
      return (
        <div key={row.id}
        style={{
          
          backgroundColor: 'white',
        }}
      >
        <div  onClick={this.gotoDetail.bind(this,row.id)} style={{ display: '-webkit-box', display: 'flex', padding: '15px',flexDirection:'row' }}>
          <img style={{ height: '117px', width: '117px', marginRight: '17px' }} src={row.clisPic} alt="" />
          <div style={{ flex:'1',width:'0'}}>
            <div className="twoEllipsis" style={{WebkitBoxOrient: 'vertical'}}>{row.clisName}</div>
            <div style={{  marginTop:'10px'}}><span className="money" style={{ fontSize: '30px', color: '#FF6E27' }}>
           
            {row.clisPrice ? (
              <span>￥{row.clisPrice }</span>
            ) : (
              <span>暂无相关价格</span>
            )}
            
            </span></div>
          </div>
        </div>
      </div>
          
      )
    }
  
    getBanner=()=>{
      var self=this;
      var param="pageType=2"
      this.state.getClinicBanner(param).then(function(res){
        if (res.ok) {
          res.json().then((obj)=> {
              if(obj.resultCode==="1000"){ 
                Toast.hide()
                  self.setState({
                    bannerData:obj.result[0].bannerUrl
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
    //列表接口
    getList=(pos=0,count=5,fresh)=>{
      var self=this;
      const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
      var param="position="+pos+"&count="+count
      this.state.getClinicServerIteamList(param).then(function(res){
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
    //跳转到详情页面
    gotoDetail=(id)=>{
       this.props.history.push('/serviceItems/'+id)
    }
    onRefresh = () => {
      this.setState({ refreshing: true, isLoading: true });
      this.getList(1,5,1)
      // // simulate initial Ajax
      // setTimeout(() => {
      //   this.rData = genData();
      //   this.setState({
      //     dataSource: this.state.dataSource.cloneWithRows(this.state.data),
      //     refreshing: false,
      //     isLoading: false,
      //   });
      // }, 600);
    };
  
    onEndReached = (event) => {
      // load new data
      // hasMore: from backend data, indicates whether it is the last page, here is false
      if (this.state.isLoading && !this.state.hasMore) {
        return;
      }
      var self=this;
      console.log('reach end', event);
      this.getList(this.state.data.length)
      // var data=[
      //   {
      //     img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
      //     title: 'Meet hotel',
      //     des: '不是所有的兼职汪都需要风吹日晒',
      //     id:6
      //   }
      // ]
      // data=this.state.data.concat(data)
      // this.setState({ 
      //   isLoading: true ,
      //   data:data
      // });
      // setTimeout(() => {
      
      //   // this.rData = [...this.rData, ...genData(++pageIndex)];
      //   this.setState({
      //     dataSource: this.state.dataSource.cloneWithRows(data),
      //     isLoading: false,
      //   });
      //   console.log(this.state)
      // }, 1000);
    
    };
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
      );
      return (<div>
        
        <ListView
        className="service_box"
          // style={{
          //   height:'100%',
          //   overflow: 'auto',
          // } 
          // }
          //邻近值为 100 时 调用
          onEndReachedThreshold={100}
          key={this.state.useBodyScroll ? '0' : '1'}
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderHeader={() => <div  style={{height:'228px',width:'100%'}}><img style={{height:'100%',width:'100%'}} src={this.state.bannerData}/></div>}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? '加载中...' : '无更多数据'}
          </div>)}
          renderRow={this._renderRow.bind(this)}
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
  export default App