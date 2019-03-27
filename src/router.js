import React,{Component} from 'react';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import {BrowserRouter,Route,Switch} from "react-router-dom";

import Home from './route/home';
//
import My from './route/my';
import ChangeDetail from './pages/My/useInfo/changeDetail';
//PK
import Pk from './route/pk';
import Newpersonalpk from "./pages/Pk/Newpersonalpk";
import Personalselect from "./pages/Pk/Personalselect";
import PersonalLook from "./pages/Pk/PersonalLook";
//sport
import Sport from './route/sport';
import ExtraSport from "./pages/Sport/adjustment";
import MySport from "./pages/Sport/mySport/index";
import SportCheck from "./pages/Sport/sportCheck";
import ViewSport from './pages/Sport/mySport/viewMySport';
import CreateSport from './pages/Sport/mySport/createSport';
import SearchSport from './pages/Sport/mySport/searchSport';
import CreateAdjustment from './pages/Sport/adjustment/createAdjustment';
import adjustmentDetail from './pages/Sport/adjustment/adjustmentDetail';
import CheckDetail from './pages/Sport/sportCheck/checkDetail';
//team
import Team from './route/team';

//登录
import Login from "./pages/login";
import AddUserInfo from "./pages/login/addUserInfo";

// 查看他人信息
import His from './route/his';

import store from './store';
// const Loading = () => {
//     return <div>Loading......</div>
// };
// const Home = Loadable({
//     // 要load的component，用import的方式插入componenr
//     loader() {
//         return import('./route/home');
//     },
//     // 如果loading較慢時，要render的component
//     loading: Loading,
// });
// const My = Loadable({
//     loader(){
//         return import('./route/my');
//     },
//     loading:Loading
// })
// const Pk = Loadable({
//     loader(){
//         return import('./route/pk');
//     },
//     loading:Loading
// })
// const Sport = Loadable({
//     loader(){
//         return import('./route/sport');
//     },
//     loading:Loading
// })
// const Team = Loadable({
//     loader(){
//         return import('./route/team');
//     },
//     loading:Loading
// })
// const Login = Loadable({
//     loader(){
//         return import('./pages/login');
//     },
//     loading:Loading
// })
export default class Router extends Component{
    render(){
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/my" component={My} />
                        <Route exact path="/my/changeDetail" component={ChangeDetail} />
                        <Route exact path="/pk" component={Pk} />
                        <Route exact path="/pk/newpersonalpk" component={Newpersonalpk} />
                        <Route exact path="/pk/personalselect" component={Personalselect} />
                        <Route exact path="/pk/personallook" component={PersonalLook} />
                        <Route exact path="/team" component={Team} />
                        <Route exact path="/sport" component={Sport} />
                        <Route exact path="/sport/mySport" component={MySport} />
                        <Route exact path="/sport/viewSport/:code" component={ViewSport} />
                        <Route exact path="/sport/createSport" component={CreateSport} />
                        <Route exact path="/sport/searchSport" component={SearchSport} />
                        <Route exact path="/sport/extrasport" component={ExtraSport} />
                        <Route exact path="/sport/createAdjustment" component={CreateAdjustment} />
                        <Route exact path="/sport/adjustmentDetail" component={adjustmentDetail} />
                        <Route exact path="/sport/check" component={SportCheck} />
                        <Route exact path="/sport/checkDetail/:code" component={CheckDetail} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/addUserInfo" component={AddUserInfo} />
                        <Route exact path="/his" component={His} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}