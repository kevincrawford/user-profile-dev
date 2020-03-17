import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import HttpsRedirect from 'react-https-redirect';
import ReduxToastr from 'react-redux-toastr';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadUser } from './app/common/ui/auth/AuthActions';
import App from './app/App';
import store from './app/store/Store';
import RouterStateHandler from './app/common/util/RouterStateHandler';
import setAuthToken from './app/common/util/setAuthToken';
import * as serviceWorker from './serviceWorker';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './styles/theme.scss';
import './styles/index.scss';

const rooEl = document.getElementById('root');

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const AppRoot = () => {
  useEffect(() => {
    // console.log('index: useEffect');
    store.dispatch(loadUser());
  }, []);

  return (
    <HttpsRedirect>
      <Provider store={store}>
        <BrowserRouter>
          <RouterStateHandler>
            <ReduxToastr position='bottom-right' transitionIn='fadeIn' transitionOut='fadeOut' />
            <App />
          </RouterStateHandler>
        </BrowserRouter>
      </Provider>
    </HttpsRedirect>
  );
};

if (module.hot) {
  module.hot.accept('./app/App', () => {
    setTimeout(ReactDOM.render(<AppRoot />, rooEl));
  });
}

ReactDOM.render(<AppRoot />, rooEl);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
