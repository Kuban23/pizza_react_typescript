import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// import './index.css';
import App from './App';
import { store } from './redux/store';

const rootElement = document.getElementById('root');
if (rootElement) {
   const root = ReactDOM.createRoot(rootElement);
   root.render(

      <BrowserRouter>
         <Provider store={store}>
            <App />
         </Provider>
      </BrowserRouter>
   );
};

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(

//    <BrowserRouter>
//       <Provider store={store}>
//          <App />
//       </Provider>

//    </BrowserRouter>

// );

