import React from 'react';
import ReactDOM from 'react-dom'
import { Route } from "react-router-dom";
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView, Button } from 'antd-mobile';
import bannerUrl from '../../static/images/homepage_banner@3x.png';
import Detail from './detail/index'
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
      useBodyScroll: true,
      prop:props
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

    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    }, 1500);
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(++pageIndex)];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };
  //执行的一个点击事件 判断跳转到 医生详情页面
  handleClick=(e)=>{
        this.props.history.push(`/doctorTeam/${e}`)      
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
    const row = (rowData, sectionID, rowID,highlightRow) => {
       
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID}
          style={{
            paddingLeft:'12px',
            paddingRight:'12px',
            background:'rgba(255,255,255,1)',
            boxShadow:'0px 1px 3px 1px rgba(0,0,0,0.15)',
            borderRadius:'14px'
          }}
        >
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px',flexDirection:'row' }}>
            <img style={{ height: '85px', width: '85px', marginRight: '17px',borderRadius:'50%' }} src={obj.img} alt="" />
            <div style={{ flex:'1',width:'0'}}>
              <div  className="team_right">
                    <div>
                        <div className="doctor_name">杨铁柱</div>
                        <div className="doctor_type">主治医生</div>
                    </div>
              
                    {/* (e)=>{
                        console.log(this.state.prop)
                        var id=e.currentTarget.getAttribute("data-obj")
                          debugger;
                        // this.state.prop.history.location.push(`/doctorTeam/${id}`)
              } */}

                    <div className="checkedDetail"  data-obj={obj.id}  onClick={this.handleClick.bind(this,obj.id)}>查看详情</div>
              
                </div>
              <div className="twoEllipsis2" style={{  marginTop:'10px',WebkitBoxOrient: 'vertical'}}>
              {/* ￥{rowID} */}
              擅长中医诊疗、中医用药。善于使 用艾灸、针灸针对性治疗疾……擅长中医诊疗、中医用药。善于使 用艾灸、针灸针对性治疗疾……擅长中医诊疗、中医用药。善于使 用艾灸、针灸针对性治疗疾……
              </div>
            </div>
          </div>
        </div>
      );
    };
    return (
    <div
    style={{
        paddingLeft:'12px',
        paddingRight:'12px',
        paddingTop:'10px'
    }}
    >
      
      <ListView
      className="service_box"
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={
           row
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
const Topic = ({ match }) => (
    <div>
      <h3>我是医生团队详情</h3>
    </div>
  );

class Iteme extends React.Component {
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
  
          <Route exact path={`${this.state.match}`} component={App} />
          <Route path={`${this.state.match}/:id`} component={Detail} />
          {/* </Switch> */}
  
  
        </div>);
    }
  }
  
  
  
  
  export default Iteme 