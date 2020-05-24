import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form.js';
import Home from './components/Home.js';
import About from './components/About.js';
import {Route} from "react-router-dom"
import HowItWorks from './components/HowItWorks';
import Reviews from './components/Reviews';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Home}/>
      <Route path ="/form" component={Form} />
      <Route path ="/about" component={About} />
      <Route path ="/how" component={HowItWorks} />
      <Route path ="/reviews" component={Reviews} />
      <Footer />
    </div>
  );
}

export default App;
