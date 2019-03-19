import React from "react";
import "./index.less";
class Loading extends React.Component {

  render() {
    return (
        <div className="spinner">
            <div className="spinner-container container1">
                <div className="circle1">&nbsp;</div>
                <div className="circle2">&nbsp;</div>
                <div className="circle3">&nbsp;</div>
                <div className="circle4">&nbsp;</div>
            </div>
            <div className="spinner-container container2">
                <div className="circle1">&nbsp;</div>
                <div className="circle2">&nbsp;</div>
                <div className="circle3">&nbsp;</div>
                <div className="circle4">&nbsp;</div>
            </div>
            <div className="spinner-container container3">
                <div className="circle1">&nbsp;</div>
                <div className="circle2">&nbsp;</div>
                <div className="circle3">&nbsp;</div>
                <div className="circle4">&nbsp;</div>
            </div>
        </div>
    );
  }
}

export default Loading;