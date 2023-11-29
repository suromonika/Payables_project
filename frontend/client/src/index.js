import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { fetchData, fetchCurrencyData } from './store/store';
import store from './store/store';
import App from './App';

//Fetching initial data when app starts

store.dispatch(fetchData());
store.dispatch(fetchCurrencyData());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
