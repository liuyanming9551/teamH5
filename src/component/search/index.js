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
            isActive:[]
        }
    }

    componentDidMount() {
        const {data} = this.props;
        const {isActive} = this.state;
        let activeClass = [];
        data.map((item,index)=>{
            activeClass.push(`isActive${index}`)
        })
        this.setState({
            isActive:[...isActive,...activeClass]
        })
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
    onActive = (e) => {
        console.log(e)
    }
    selectPlaneClick = (e) => {
        e.stopPropagation();
    }
    onReset = () => {
        const {onReset} = this.props;
        onReset()
    }
    handleConfirm = () => {
        const {onOk} = this.props;
        this.hideMask()
        onOk()
    }
    getLabelValue = (options,index,itemOne) =>{
        const {onClickBtn} = this.props;
        onClickBtn(options)
        if(itemOne)
        this.setState({
            isActive:`${options.value}${index}`
        })
        console.log(options,index,itemOne)
    }


    render() {
        const {inProp, selectShows,isActive} = this.state;
        const {data} = this.props;
        console.log(isActive)
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
                                                                <span key={indexTwo} onClick={()=>this.getLabelValue(itemTwo,indexTwo,itemOne.id)} className={isActive === `${itemTwo.value}${indexTwo}`?"active":""}>{itemTwo.value}</span>
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

export default Search