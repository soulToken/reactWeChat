
import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import * as apis from '../../api/api';
import Login from '../login';
import { HashRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import './tooBar.css';
//引入背景图
import home1 from '../../static/svg/homepage_home_1.svg';
import home1Select from '../../static/svg/homepage_home.svg';
import home2 from '../../static/svg/homepage_preconditioning_1.svg';
import home2Select from '../../static/svg/homepage_preconditioning.svg';
import home3 from '../../static/svg/homepage_personal_1.svg'
import home3Select from '../../static/svg/homepage_personal.svg'
const Home = (props) => (
  <div>
    <h2>Home</h2>

  </div>
);
const remove = (props) => {
  localStorage.removeItem("login");
}
const My = () => (
  <div>
    <h2>我的页面</h2>
    <button onClick={
      remove
    }><Link to="/">推出登陆</Link></button>
  </div>
);
const About = () => (
  <div>
    <h2>About</h2>
  </div>
);
const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);
class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: this.props.history.location.pathname === '/' || this.props.history.location.pathname === '/appointment' || this.props.history.location.pathname === '/my' ? false : true,
      fullScreen: false,
      history: this.props.history
    };
  }
  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0, zIndex: '3' ,background:'#fff'}}>
        <TabBar
          unselectedTintColor="#979797"
          tintColor="#0381FF"
          barTintColor="white"
          tabBarPosition="bottom"
          // noRenderContent="true"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="Life"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url('+home1+') center center /  21px 21px no-repeat'
            }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url('+home1Select+') center center /  21px 21px no-repeat'
            }}
            />
            }
            selected={this.state.history.location.pathname === '/'}
            // badge={1}
            onPress={() => {
              this.state.history.push("/")
            }}
            data-seed="logId"
          >
            {/* {this.renderContent('Life')} */}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url('+home2+') center center /  21px 21px no-repeat'
              }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url('+home2Select+') center center /  21px 21px no-repeat'
              }}
              />
            }
            title="我的预约"
            key="Friend"
            // dot
            selected={this.state.history.location.pathname === '/appointment'}
            onPress={() => {
              this.state.history.push("/appointment")
            }}
          >
            {/* {this.renderContent('Friend')} */}
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: home3}}
            selectedIcon={{ uri: home3Select }}
            title="我的"
            key="my"
            selected={this.state.history.location.pathname === '/my'}
            onPress={() => {
              this.state.history.push("/my")

            }}
          >
            {/* {this.renderContent('My')} */}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
export default withRouter(TabBarExample)