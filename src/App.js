import React, { Component } from 'react';
// import logo from './logo.svg';
import * as apis from './api/api';
import { HashRouter as Router, Route, Link,Switch } from "react-router-dom";
// import PropectedRouter from './router/PropectedRouter';
import {addGun} from './redux'
import Login from './components/login'
import Nofound from './components/errorPages/nofound'
import TabBarExample from './components/tooBar/tooBar'
import Home from './components/home/index'
import About from './components/myAppointment/index'
import My from './components/my/index'
import './App.css';
// const Home = (props) => (
//   <div>
//     <h2>Home</h2>
    
//   </div>
// );
// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>Rendering with React</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>Components</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//       </li>
//     </ul>

//     <Route path={`${match.url}/:topicId`} component={Topic} />
//     <Route
//       exact
//       path={match.url}
//       render={() => <h3>Please select a topic.</h3>}
//     />
//   </div>
// );

// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// );
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apis };
  }
  get() {
    this.props.store.dispatch(addGun())
    console.log(this.props.store.getState())
    this.state.apis.mock('account=""&token=""').then((res) => {
      console.log(res)
      if (res.ok) {
        res.text().then((data) => {
          console.log(data);
        })
      }
    }).catch((res) => {
      console.log(res.status);
    });
  }
  render() {
    const store=this.props.store
    return (
      <div className="App">
       
        <Router>
          <div>
          <Switch>
                <Route exact path="/" store={store} component={Home}/>
                <Route path="/appointment" component={About} />
                {/* <Route path="/topics" component={Topics} /> */}
                <Route path="/login" component={Login}></Route>
                <Route path="/my" component={My}   data={{'harry':'handsome'}}></Route>
                {/* <PropectedRouter path="/my" component={My}></PropectedRouter> */}
                 <Route  component={Nofound}></Route>
            </Switch>
            {/* <></> */}
          </div>
        </Router>
        <TabBarExample></TabBarExample>
      </div>
    );
  }
}
export default App;
