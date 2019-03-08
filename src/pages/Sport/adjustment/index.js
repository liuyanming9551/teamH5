import React, {Component} from 'react';
import Main from "./../../../layouts/main";
import AdjustmentList from "./adjustmentList";

export default class Adjustment extends Component{
    render() {
        let propsData = this.props;
        return(
            <Main location = {propsData}>
                <AdjustmentList location = {propsData} />
            </Main>
        )
    }
}