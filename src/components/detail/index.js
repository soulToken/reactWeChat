import React from 'react';
import ReactSVG from 'react-svg'
import svg1 from '../../static/svg/消息.svg'
class ListExample extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   disabled: false,
    //   match: this.props.match.path,
    //   history: this.props.history
    // };
    // console.log(this.props.match.params.id)
  }
  render() {
    return (
      <div>

         <ReactSVG
    path={svg1}
    evalScripts="always"
    onInjected={svg => {
      console.log('onInjected', svg)
    }}
    renumerateIRIElements={false}
    svgClassName="svg-class-name"
    svgStyle={{ width: 200 }}
    className="wrapper-class-name"
    onClick={() => {
      console.log('wrapper onClick')
    }}



    />
              我是detail。。。。。。。。。。 {this.props.match.params.id}
      </div>);
  }
}
export default ListExample