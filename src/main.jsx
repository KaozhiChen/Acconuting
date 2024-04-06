import React from 'react';
import ReactDOM from 'react-dom/client';
import './theme.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/index.jsx';
import { Provider } from 'react-redux';
import store from './store/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
