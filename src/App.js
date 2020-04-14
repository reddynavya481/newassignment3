import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
// import { localStorageGetItem, localStorageSetItem } from './services/utils';
import Register from './components/Register/Register'
import Register from './components/Dashboard/Dashboard'
import Register from './components/Dashboard/Stopics'
class App extends Component {
    render(){
      return (
        <div className="App">
        
          <Router>
          <Redirect from="/" to="/register" />
          <Route exact path='/register'><Register /></Route>
          </Router>
        </div>
      );
    }
  }

  export default App;
