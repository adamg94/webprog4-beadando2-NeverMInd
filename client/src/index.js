import React from 'react';
import ReactDOM from 'react-dom';
import './sass/Normalizer.css'
import Navigation from './Navigation'
import Home from './Home'
import Insert from './Insert'
import List from './List'
import Register from './Register'
import * as serviceWorker from './serviceWorker';
import LoginPanel from './LoginPanel'
import { BrowserRouter as Router, Route } from 'react-router-dom'




const routing = (
    <main>
         
       <Router>
            <Route exact path="/">
                <Navigation />
                <Home />
                <LoginPanel />    
           </Route>
           <Route exact path="/insert">
                <Navigation />  
                <Insert />
                <LoginPanel />
           </Route>
           <Route exact path="/list">
                <Navigation />  
                <LoginPanel />
                <List />
                
           </Route>
           <Route exact path="/register">
                <Navigation />
                <Register />
           </Route>
       </Router>
    </main>
)


ReactDOM.render( routing , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
