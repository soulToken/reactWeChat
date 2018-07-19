
import React from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import TabBarExample from '../tooBar/tooBar'
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '1000px', backgroundColor: '#fff' }}>
            Content of first tab
        </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            Content of second tab
        </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            Content of third tab
        </div>
        </Tabs>
      </StickyContainer>
      <WhiteSpace />
    </div>
    <TabBarExample></TabBarExample>
  </div>

);

export default TabExample