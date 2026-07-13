// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { Toaster } from 'sonner'
// import { Provider } from 'react-redux'

// import store from './redux/store'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//       <App />
//       <Toaster />
//     </Provider>
//   </StrictMode>,
// )


// ---------------------------------------------------------------
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { Toaster } from 'sonner'

// import { Provider } from 'react-redux'
// import store from './redux/store.js'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//        <Toaster />
//     </Provider>
//   </React.StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// import { store, persistor } from './redux/store';
import { store, persistor } from "./redux/store";
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>

        <App />
        <Toaster />

      </PersistGate>

    </Provider>

  </React.StrictMode>
);