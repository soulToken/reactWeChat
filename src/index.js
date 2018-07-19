import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterMap from './router/routerMap';
//redux
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import {count,addGun,removeGun} from './redux/index'
import registerServiceWorker from './registerServiceWorker';
import {withRouter} from 'react-router-dom' ;
const store = createStore(count)
// import createHistory from 'history/createBrowserHistory';
// const history=createHistory();

console.log(store.getState())
function render(){ReactDOM.render(
    //配置路由   
    <Provider store={store}>
        <withRouter>
            <RouterMap  store={store} addGun={addGun} removeGun={removeGun}  />
        </withRouter>
    </Provider>
  , document.getElementById('root'));
}
render()
store.subscribe(function(){
  const state = store.getState();
  console.log("redux改变了")
})
registerServiceWorker();
