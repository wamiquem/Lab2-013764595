import React, { Component } from 'react';
import './App.css';
import './Sidebar.css';
import Main from './components/Main';
import {HashRouter} from 'react-router-dom';
import store from './redux/store';
import { Provider } from "react-redux";


class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        {/* Use Browser Router to route to different pages */}
        <HashRouter>
          <div>
            {/* App Component Has a Child Component called Main*/}
            <Main/>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
