import React from 'react';
import ReactSVG from 'react-svg'
import svg1 from '../../../static/svg/消息.svg'
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];
const a="<p>asdsadsadad</p>"
class ImagePickerExample extends React.Component {

    constructor(props) {
        super(props);
    
          this.state = {
            files: data,
            multiple: false,
         
    }}
    
    componentDidMount(){
        console.log(this.props)
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
        <div  dangerouslySetInnerHTML={{
              __html: a
            }}>    
        </div>
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

export default ImagePickerExample