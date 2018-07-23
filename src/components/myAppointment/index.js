
import React from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import TabBarExample from '../tooBar/tooBar'
import { PullToRefresh, Button } from 'antd-mobile';
import './index.css'

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
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

class Fresher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      down: true,
      height: 400,
      data: [],
    };
    console.log(this.props.data)
  }

  componentDidMount() {
    // const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: 400,
      data: genData(),
    }), 0);
  }

  render() {
    return (<div>
      <Button
        style={{ marginBottom: 15 }}
        onClick={() => this.setState({ down: !this.state.down })}
      >
        direction: {this.state.down ? 'down' : 'up'}
      </Button>
      <PullToRefresh
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
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










const TabExample = () => (


  <div>
    <div style={{ position: 'absolute', width: '100%', bottom: '50px', top: '0', zIndex: '10', overflow: 'auto' }}>
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
        <div style={{height:'400px'}}> 
                <Fresher  data={{good:1}}></Fresher>
        </div>
          <div >
          <Fresher></Fresher>
        </div>
        
        </Tabs>
      </StickyContainer>
      <WhiteSpace />
    </div>
    <TabBarExample></TabBarExample>
  </div>

);

export default TabExample