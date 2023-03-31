import React from 'react';
import ReactDOM from 'react-dom/client';
import { Hashrouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import { createHashHistory } from 'history';

const root = ReactDOM.createRoot(document.getElementById('root'));
const history = createHashHistory();

root.render(
  <Router history={history}>
    <App />
  </Router>
);