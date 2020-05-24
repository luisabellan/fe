import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form.js';
import Home from './components/Home.js';
import {Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route path ="/form" component={Form} />
    </div>
  );
}

export default App;
