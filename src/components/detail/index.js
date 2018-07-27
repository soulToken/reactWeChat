import React from 'react';
import ReactSVG from 'react-svg'
import svg1 from '../../static/svg/消息.svg'
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];

class ImagePickerExample extends React.Component {
  state = {
    files: data,
    multiple: false,
  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;
    this.setState({
      multiple: index === 1,
    });
  }
  onAddImage=(e,index)=>{
    console.log(e,index)
  }

  render() {
    const { files } = this.state;
    return (
      <WingBlank>
        <SegmentedControl
          values={['切换到单选', '切换到多选']}
          selectedIndex={this.state.multiple ? 1 : 0}
          onChange={this.onSegChange}
        />
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onAddImageClick={this.onAddImage}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 5}
          multiple={this.state.multiple}
        />
      </WingBlank>
    );
  }
}
// class ListExample extends React.Component {
//   constructor(props) {
//     super(props);
//     // this.state = {
//     //   disabled: false,
//     //   match: this.props.match.path,
//     //   history: this.props.history
//     // };
//     // console.log(this.props.match.params.id)
//   }
//   render() {
//     return (
//       <div>

//          <ReactSVG
//     path={svg1}
//     evalScripts="always"
//     onInjected={svg => {
//       console.log('onInjected', svg)
//     }}
//     renumerateIRIElements={false}
//     svgClassName="svg-class-name"
//     svgStyle={{ width: 200 }}
//     className="wrapper-class-name"
//     onClick={() => {
//       console.log('wrapper onClick')
//     }}



//     />
//               我是detail。。。。。。。。。。 {this.props.match.params.id}
//       </div>);
//   }
// }
export default ImagePickerExample