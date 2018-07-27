import React from 'react';
import ReactDOM from 'react-dom'
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView, Button } from 'antd-mobile';
import bannerUrl from '../../static/images/homepage_banner@3x.png';
import './index.css'


// const data = [
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
//     title: 'Meet hotel',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   }
// ];

const NUM_ROWS = 5;
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
      data:[],
      height: document.documentElement.clientHeight,
      useBodyScroll: true,
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


  this.setState({
    data:  [
        {
          img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
          title: 'Meet hotel',
          des: '不是所有的兼职汪都需要风吹日晒',
          id:1
        },
        {
          img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
          title: 'Meet hotel',
          des: '不是所有的兼职汪都需要风吹日晒',
          id:2
        },
        {
          img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
          title: 'Meet hotel',
          des: '不是所有的兼职汪都需要风吹日晒',
          id:3
        }
      ]
  })
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
        height: hei,
        refreshing: false,
        isLoading: false,
      });
      console.log(this.state)
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
    var self=this;
    console.log('reach end', event);
    var data=[
      {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
        id:6
      }
    ].concat(this.state.data)
    this.setState({ 
      isLoading: true ,
      data:data
    });
    setTimeout(() => {
    
      this.rData = [...this.rData, ...genData(++pageIndex)];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
      console.log(this.state)
    }, 1000);
  
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
    let index = this.state.data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = this.state.data.length - 1;
      }
      const obj = this.state.data[index--];
      return (
        <div key={rowID}
          style={{
            
            backgroundColor: 'white',
          }}
        >
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px',flexDirection:'row' }}>
            <img style={{ height: '117px', width: '117px', marginRight: '17px' }} src={obj.img} alt="" />
            <div style={{ flex:'1',width:'0'}}>
              <div className="twoEllipsis" style={{WebkitBoxOrient: 'vertical'}}>{obj.des}-{rowData}</div>
              <div style={{  marginTop:'10px'}}><span className="money" style={{ fontSize: '30px', color: '#FF6E27' }}>￥{rowID} id是 {obj.id}</span></div>
            </div>
          </div>
        </div>
      );
    };
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
        renderHeader={() => <div  style={{height:'228px',width:'100%'}}><img style={{height:'100%',width:'100%'}} src={bannerUrl}/></div>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
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



export default App