import React from 'react';
import ReactDOM from 'react-dom';
import './sass/Normalizer.css'
import Navigation from './Navigation'
import * as serviceWorker from './serviceWorker';
import { LoginPanel, UserPanel } from './UserPanel'
import { BrowserRouter as Router, Route } from 'react-router-dom'


const routing = (
    <header>
        <Router>
            <Route path="/">
                <Navigation />
                <LoginPanel />
                <UserPanel />
            </Route>
        </Router>
    </header>
)


ReactDOM.render( routing , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
