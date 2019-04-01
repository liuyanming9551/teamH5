import React from 'react';
import Loadable from 'react-loadable';
import {Icon} from "antd-mobile";


const LoadableComponent = Loadable({
    loader: () => import('./'),
    loading(){
        return (
            <div style={{textAlign:"center", lineHeight:'80vh'}}>
                <Icon type="loading" />
            </div>
        )
    }
});

export default () => <LoadableComponent/>