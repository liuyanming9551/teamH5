import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransition} from "react-transition-group";
import {Button, WhiteSpace, WingBlank} from "antd-mobile";
import './index.less';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectShows: false,
            inProp: false,
            isActive:[],
            isSelectItem:[]
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.showMask) {
            this.showMask()
        }
    }
    showMask = () => {
        const {inProp} = this.state;
        this.setState({
            inProp: !inProp,
            selectShows: true
        })
    }
    hideMask = () => {
        const {inProp} = this.state;
        const {onClose} = this.props
        this.setState({
            selectShows: false,
            inProp: !inProp
        })
        onClose({
            showMask: false
        })
    }

    selectPlaneClick = (e) => {
        e.stopPropagation();
    }
    onReset = () => {
        this.setState({
            isActive:[],
            isSelectItem:[]
        })

    }
    handleConfirm = () => {
        const {isSelectItem} = this.state;
        const {onOk} = this.props;
        this.hideMask()
        onOk(isSelectItem)
    }
    getLabelValue = (options,index,itemOne) =>{
        const {isActive,isSelectItem} = this.state;
        isActive[itemOne-1] = `${options.value}${index}`;
        isSelectItem[itemOne-1] = options;
        this.setState({
            isActive,
            isSelectItem
        })
    }


    render() {
        const {inProp, selectShows,isActive} = this.state;
        const {data} = this.props;
        return (
            <div>
                <div className='selectInner' style={selectShows ? {display: 'block'} : {display: 'none'}}
                     onClick={this.hideMask}>
                    <CSSTransition
                        in={inProp}
                        timeout={300}
                        classNames="alert"
                    >
                        <div className='selectInfoWrap' onClick={this.selectPlaneClick}>
                            <div className='selectInfoBox'>
                                {
                                    data.map((itemOne,indexOne)=>{
                                        return (
                                            <div className='searchItem' key={indexOne}>
                                                <div className='searchLabel'>
                                                    {itemOne.labelTips}
                                                </div>
                                                <div className='searchOptions'>
                                                    {
                                                        itemOne.dataList.map((itemTwo,indexTwo) =>{
                                                                return(
                                                                    <span key={indexTwo} onClick={()=>this.getLabelValue(itemTwo,indexTwo,itemOne.id)} className={isActive[itemOne.id-1] === `${itemTwo.value}${indexTwo}`?"active":""}>{itemTwo.value}</span>

                                                                )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className='searchActiveBox'>
                                    <WhiteSpace size='lg'/>
                                    <WingBlank size='lg' style={{overflow: "hidden"}}>
                                        <Button type='ghost' size="small" inline style={{float: "left", width: "48%"}}
                                                onClick={this.onReset}>重置</Button>
                                        <Button type="primary" size="small" inline
                                                style={{float: "right", width: "48%"}}
                                                onClick={this.handleConfirm}>确认</Button>
                                    </WingBlank>
                                    <WhiteSpace size='lg'/>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                </div>
            </div>
        )
    }
}
Search.defaultProps = {
    data:[]
};
Search.propTypes = {
    data:PropTypes.array,
    showMask:PropTypes.bool,
    onClose:PropTypes.func,
    onOk:PropTypes.func,
};
export default Search