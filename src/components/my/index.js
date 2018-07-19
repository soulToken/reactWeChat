import React, { Component } from 'react';
import { List } from 'antd-mobile';
import { withRouter} from "react-router-dom";
const Item = List.Item;
const Brief = Item.Brief;
class ListExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled:false
        };
    }
  render() {
    return (
    <div style={{position:'relative',bottom:'50px',top:'0',zIndex:'10'}}>
      <List renderHeader={() => 'Icon in the left'}>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          arrow="horizontal"
          onClick={() => {
              console.log('点击了钱包')
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
     
    </div>);
  }
}

export default withRouter(ListExample) 