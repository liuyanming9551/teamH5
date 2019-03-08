import React,{Component} from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Home from './route/home';

import My from './route/my';
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
//team
import Team from './route/team';

//登录
import Login from "./pages/login";
import AddUserInfo from "./pages/login/addUserInfo";

import store from './store';
export default class Router extends Component{
    render(){
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/my" component={My} />
                        <Route exact path="/pk" component={Pk} />
                        <Route exact path="/pk/newpersonalpk" component={Newpersonalpk} />
                        <Route exact path="/pk/personalselect" component={Personalselect} />
                        <Route exact path="/pk/personallook" component={PersonalLook} />
                        <Route exact path="/team" component={Team} />
                        <Route exact path="/sport" component={Sport} />
                        <Route exact path="/sport/mySport" component={MySport} />
                        <Route exact path="/sport/viewSport" component={ViewSport} />
                        <Route exact path="/sport/createSport" component={CreateSport} />
                        <Route exact path="/sport/searchSport" component={SearchSport} />
                        <Route exact path="/sport/extrasport" component={ExtraSport} />
                        <Route exact path="/sport/createAdjustment" component={CreateAdjustment} />
                        <Route exact path="/sport/check" component={SportCheck} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/addUserInfo" component={AddUserInfo} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}