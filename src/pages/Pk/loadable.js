import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../../component/loading';


const LoadableComponent = Loadable({
    loader: () => import('./'),
    loading(){
        return (
            <div style={{marginTop: "40vh"}}>
               <Loading /> 
            </div>
        )
    }
});

export default () => <LoadableComponent/>