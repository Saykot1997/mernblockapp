import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ContextProvidor} from "./Context/Context"

ReactDOM.render(
    <ContextProvidor>
            <App />
    </ContextProvidor>     
,document.getElementById('root'));

