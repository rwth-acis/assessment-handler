import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button'
//import './callbacks/openidconnect-popup-signin-callback.js'
import 'openidconnect-signin/openidconnect-signin.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <openidconnect-signin id="signin_popup"
                        scope="openid profile"
                        clientid="a4b3f15a-eaec-489a-af08-1dc9cf57347e"
                        authority="https://api.learning-layers.eu/o/oauth2"
                        providername="Layers"
                        popupredirecturi="popup-signin-callback.html"
                        popuppostlogoutredirecturi="popup-signout-callback.html"
                        silentredirecturi="silent-callback.html"></openidconnect-signin>
      </header>
    </div>
  );
}

export default App;
