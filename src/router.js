import React,{Component} from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Home from './route/home';
import My from './route/my';
import Pk from './route/pk';
import Sport from './route/sport';
import Team from './route/team';
import store from './store';
import ExtraSport from "./pages/Sport/adjustment";
import MySport from "./pages/Sport/mySport/index";
import SportCheck from "./pages/Sport/sportCheck";
export default class Router extends Component{
    render(){
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/my" component={My} />
                        <Route exact path="/pk" component={Pk} />
                        <Route exact path="/sport" component={Sport} />
                        <Route exact path="/team" component={Team} />
                        <Route exact path="/sport/mysport" component={MySport} />
                        <Route exact path="/sport/extrasport" component={ExtraSport} />
                        <Route exact path="/sport/check" component={SportCheck} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}