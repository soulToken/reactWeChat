import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import Detail from './detail/index'
import {getClinicActivityList} from '../../api/api'
import {Toast} from 'antd-mobile'
import { Route } from "react-router-dom";





/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView, Button } from 'antd-mobile';

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
    id:1
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
    id:2
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
    id:3
  },
];

class Demo extends React.Component {
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
      useBodyScroll: true,
      getClinicActivityList:getClinicActivityList,
      data:[]
    };
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    this.getList()
    // setTimeout(() => {
    //   this.rData = genData();
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(genData()),
    //     height: hei,
    //     refreshing: false,
    //     isLoading: false,
    //   });
    // }, 1500);
  }
  getList=(pos=0,count=5,fresh)=>{
    var self=this;
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    var param="position="+pos+"&count="+count
    this.state.getClinicActivityList(param).then(function(res){
      if (res.ok) {
        res.json().then((obj)=> {
            if(obj.resultCode==="1000"){ 
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
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    this.getList(1,5,1)
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    console.log(this.state.data.length)
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    this.getList(this.state.data.length)
  };
  getClick=(id)=>{
        this.props.history.push('/activity/'+id)
  }
  _renderRow(row, sectionId, rowId) {
    return (
      <div key={row.id}
          style={{
            paddingBottom:'15px',
            backgroundColor: 'white',
          }}
        >
          <div style={{ textAlign:'center',paddingTop:'20px',paddingBottom:'20px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
            {row.activityDesc}
          </div>
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px' }}    onClick={this.getClick.bind(this,row.id)}>
            <img style={{ height: '200px', width:'100%' }} src={row.activityPicture} alt="" />
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
    );
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID}
          style={{
            paddingBottom:'15px',
            backgroundColor: 'white',
          }}
        >
          <div style={{ textAlign:'center',paddingTop:'20px',paddingBottom:'20px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
            {obj.title}
          </div>
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px' }}    onClick={this.getClick.bind(this,obj.id)}>
            <img style={{ height: '200px', width:'100%' }} src={obj.img} alt="" />
          </div>
        </div>
      );
    };
    return (<div>
      <ListView
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        onEndReachedThreshold={150}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '无更多数据'}
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
        onEndReached={this.onEndReached}
        pageSize={5}
      />
    </div>);
  }
}





class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        disabled: false,
        match: this.props.match.path,
        history: this.props.history
      }
      }
      render() {
        return (
          <div>
            {/* <Switch> */}
            <Route exact path={`${this.state.match}`} component={Demo} />
            <Route path={`${this.state.match}/:id`} component={Detail} />
            {/* </Switch> */}
          </div>);
      }
  
  
}





export default App













