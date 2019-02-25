import React, { Component } from 'react';
import "./App.css";
import Tabbar from "./component/Tabbar";

// import Newpersonalpk from "./component/pages/PK/Newpersonalpk"
// import {BrowserRouter,Router,} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="App">
          <Tabbar></Tabbar>
         {/* <BrowserRouter> */}
            {/* <Router path='/Newpersonalpk'></Router> */}
         {/* </BrowserRouter> */}
          
      </div>
    );
  }
}

export default App;
