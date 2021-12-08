import React from 'react';
import {Router} from '@reach/router';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

function App(){
    return (
        <Router>
            <Login path = '/' />
            <Signup path = '/signup'/>
            <Home path ='/home' />
        </Router>
    )
}

export default App;