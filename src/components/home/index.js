
import React, { Component } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import { Grid } from 'antd-mobile';
import TabBarExample from '../tooBar/tooBar'
import { Route } from "react-router-dom";
import './index.css'

const data = Array.from(new Array(8)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));
const data1 = Array.from(new Array(9)).map(() => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}));

const GridExample = (props) => (
  <div>
    <Grid data={data} columnNum={4} onClick={_el => console.log(props.history.push('/detail'))} />
  </div>
);
class Lunbo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      match: this.props.match.path,
      history: this.props.history,
      data: ['1', '2', '3'],
      imgHeight: 176,
    }
  }
  
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
  render() {
    return (

      <div>
        <div className="top_zindex" style={{ position: 'absolute', top: '0', bottom: '50px', right: '0', left: '0', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <WingBlank>
            <Carousel
              autoplay={false}
              infinite
              autoplay="true"
            //   beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            //   afterChange={index => console.log('slide to', index)}
            >
              {this.state.data.map(val => (
                <a
                  key={val}
                  href="http://www.alipay.com"
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                    }}
                  />
                </a>
              ))}
            </Carousel>
          </WingBlank>
          <GridExample   history={this.props.history}></GridExample>

        </div>
        <TabBarExample></TabBarExample>
      </div>
    );
  }
}



const Topic = ({ match }) => (
  <div>
    <h3>我是2222</h3>
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

        <Route exact path={`${this.state.match}`} component={Lunbo} />
        <Route  path={`${this.state.match}/detail`} component={Topic} />
        {/* </Switch> */}


      </div>);
  }
}
export default Iteme
