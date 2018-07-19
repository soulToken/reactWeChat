import React, { Component } from 'react';
import { List } from 'antd-mobile';
import { withRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import TabBarExample from '../tooBar/tooBar'
const Item = List.Item;
const Brief = Item.Brief;


const Topic = ({ match }) => (
  <div>
    <h3>我是33333</h3>
  </div>
);
class ListExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      match: this.props.match.path,
      history: this.props.history
    };
  }
  render() {
    return (
      <div>
        <div style={{ position: 'relative', bottom: '50px', top: '0', zIndex: '10' }}>
          <List renderHeader={() => 'Icon in the left'}>
            <Item
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              arrow="horizontal"
              onClick={() => {
                this.props.history.push('/my/money')
              }}
            >My wallet</Item>
            <Item
              thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
              onClick={() => {
                console.log('点击了第二个列表')
              }}
              arrow="horizontal"
            >
              My Cost Ratio
              </Item>
          </List>
        </div>
        <TabBarExample></TabBarExample>
      </div>);
  }
}

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

        <Route exact path={`${this.state.match}`} component={ListExample} />
        <Route path={`${this.state.match}/money`} component={Topic} />
        {/* </Switch> */}


      </div>);
  }
}




export default withRouter(Iteme) 