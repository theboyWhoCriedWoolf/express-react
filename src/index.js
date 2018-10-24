// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import FontFaceObserver from 'fontfaceobserver';
import 'sanitize.css/sanitize.css';

// Import root app
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

// Import CSS reset and Global Styles
import './global-styles.css';

// Observe loading of Roboto (to remove Roboto, remove the <link> tag in
// the index.html file and this observer)
const robotoObserver = new FontFaceObserver('Roboto', {});

// When Roboto is loaded, add a font-family using Open Sans to the body
robotoObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const MOUNT_NODE = document.getElementById('root');

const render = () => {
  ReactDOM.render(<App />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable React
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
