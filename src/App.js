import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import Register from './components/Register/Register'
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
