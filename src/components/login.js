import React from 'react'
//  头部导航栏组件信息
// import { NavBar, Icon } from 'antd-mobile';
// export default function(props){
//     return <div>


//          <NavBar
//       mode="light"
//       icon={<Icon type="left" />}
//       onLeftClick={() => console.log('onLeftClick')}
//       rightContent={[
//         <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
//         <Icon key="1" type="ellipsis" />,
//       ]}
//     >NavBar</NavBar>

//     <NavBar
//       mode="dark"
//       leftContent="Back"
//       rightContent={[
//         <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
//         <Icon key="1" type="ellipsis" />,
//       ]}
//     >NavBar</NavBar>
//         <button onClick={
//             ()=>{localStorage.setItem("login","1111");
//             props.history.push(props.location.state.from)}}>登陆</button>
//         <button> 退出</button>
//     </div> 
// }

//  底部tab兰
// import { TabBar } from 'antd-mobile';

// class TabBarExample extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedTab: 'redTab',
//       hidden: false,
//       fullScreen: false,
//     };
//   }

//   renderContent(pageText) {
//     return (
//       <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
//         <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
//         <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
//           onClick={(e) => {
//             e.preventDefault();
//             this.setState({
//               hidden: !this.state.hidden,
//             });
//           }}
//         >
//           Click to show/hide tab-bar
//         </a>
//         <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
//           onClick={(e) => {
//             e.preventDefault();
//             this.setState({
//               fullScreen: !this.state.fullScreen,
//             });
//           }}
//         >
//           Click to switch fullscreen
//         </a>
//       </div>
//     );
//   }
//   handleClick(){
//       debugger;
//   }
//   render() {
//     return (
//       <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
//         <TabBar
//           unselectedTintColor="#949494"
//           tintColor="#33A3F4"
//           barTintColor="white"
//           hidden={this.state.hidden}
//         >
//           <TabBar.Item

// onClick={this.handleClick.bind(this,'test')}
//             title="Life"
//             key="Life"
//             icon={<div style={{
//               width: '22px',
//               height: '22px',
//               background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
//             />
//             }
//             selectedIcon={<div style={{
//               width: '22px',
//               height: '22px',
//               background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
//             />
//             }
//             selected={this.state.selectedTab === 'blueTab'}
//             badge={1}
//             onPress={() => {
//                 debugger;
//               this.setState({
//                 selectedTab: 'blueTab',
//               });
//             }}
//             data-seed="logId"
//           >
//             {this.renderContent('Life')}
//           </TabBar.Item>
//           {/* <TabBar.Item
//             icon={
//               <div style={{
//                 width: '22px',
//                 height: '22px',
//                 background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
//               />
//             }
//             selectedIcon={
//               <div style={{
//                 width: '22px',
//                 height: '22px',
//                 background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
//               />
//             }
//             title="Koubei"
//             key="Koubei"
//             badge={'new'}
//             selected={this.state.selectedTab === 'redTab'}
//             onPress={() => {
//               this.setState({
//                 selectedTab: 'redTab',
//               });
//             }}
//             data-seed="logId1"
//           >
//             {this.renderContent('Koubei')}
//           </TabBar.Item> */}
//           <TabBar.Item
//             icon={
//               <div style={{
//                 width: '22px',
//                 height: '22px',
//                 background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
//               />
//             }
//             selectedIcon={
//               <div style={{
//                 width: '22px',
//                 height: '22px',
//                 background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
//               />
//             }
//             title="Friend"
//             key="Friend"
//             dot
//             selected={this.state.selectedTab === 'greenTab'}
//             onPress={() => {
//               this.setState({
//                 selectedTab: 'greenTab',
//               });
//             }}
//           >
//             {this.renderContent('Friend')}
//           </TabBar.Item>
//           <TabBar.Item
//             icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
//             selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
//             title="My"
//             key="my"
//             selected={this.state.selectedTab === 'yellowTab'}
//             onPress={() => {
//               this.setState({
//                 selectedTab: 'yellowTab',
//               });
//             }}
//           >
//             {this.renderContent('My')}
//           </TabBar.Item>
//         </TabBar>
//       </div>
//     );
//   }
// }
import { Grid } from 'antd-mobile';

const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));

const data1 = Array.from(new Array(9)).map(() => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}));


const GridExample = () => (
  <div>
    <div className="sub-title">Always square grid item </div>
    <Grid data={data} activeStyle={false} />

    <div className="sub-title">Grid item adjust accroiding to img size </div>
    <Grid data={data} square={false} className="not-square-grid" />

    <div className="sub-title">ColumnNum=3 </div>
    <Grid data={data} columnNum={3} />

    <div className="sub-title">No border</div>
    <Grid data={data} hasLine={false} />

    <div className="sub-title">Carousel</div>
    <Grid data={data} isCarousel onClick={_el => console.log(_el)} />

    <div className="sub-title">Custom content</div>
    <Grid data={data1}
      columnNum={3}
      renderItem={dataItem => (
        <div style={{ padding: '12.5px' }}>
          <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
          <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
            <span>I am title..</span>
          </div>
        </div>
      )}
    />
    <div className="sub-title">Custom GridCell Style</div>
    <Grid data={data1} columnNum={3} itemStyle={{ height: '150px', background: 'rgba(0,0,0,.05)' }} />
  </div>
);



export default GridExample