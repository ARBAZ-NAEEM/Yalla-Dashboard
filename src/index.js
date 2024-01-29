import React from 'react';
import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './assets/css/header.css'
import './assets/css/sidebar.css'
import './assets/css/style.css'
import './assets/css/themify-icons/themify-icons.css'
// import './assets/css/stylesss.css'
import './assets/css/footer.css'
import 'font-awesome/css/font-awesome.min.css';
import {createStore, applyMiddleware} from 'redux';
// import allReducers from './Redux/reducers'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import allReducers from './redux/reducers';
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const myStore = createStore( allReducers, composeWithDevTools(
  applyMiddleware(thunk)
)) 
root.render(
  <Provider store={myStore}>
    <App />
  </Provider>
);
