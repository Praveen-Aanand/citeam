import React, { Component } from 'react';
import * as firebaseui from "firebaseui";
import firebase from "firebase";
import Logo from './logo.jpeg';
class Login extends Component {
  componentDidMount() {
    if (!firebase.apps.length) {
      var firebaseConfig = {
        apiKey: "AIzaSyD7qXQvwIHRX2b0gxaP9YiSVhDoeEqnkec",
        authDomain: "staffmanagementuk.firebaseapp.com",
        projectId: "staffmanagementuk",
        storageBucket: "staffmanagementuk.appspot.com",
        messagingSenderId: "184460868593",
        appId: "1:184460868593:web:157086f090f8a45429a250",
        measurementId: "G-XZ4GZ4PGZ8"
      };
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
    } else {
      firebase.app(); // if already initi alized, use that one
    }
    const uiConfig = {
      signInSuccessUrl: window.location.origin, //This URL is used to return to that page when we got success response for phone authentication.
      signInOptions: [{
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // The default selected country.
        defaultCountry: 'IN',
        recaptchaParameters: {
          size: 'invisible',
          badge: 'bottomleft'
        },
      }],
      tosUrl: window.location.origin
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }
  render() {
    return (
      <>
        <div style={{margin:'10px'}} align="center">
        <img src={Logo} width="150px"/>
        </div>
        <h1 style={{ fontSize:'15px',textAlign: 'center' }}>LOGIN</h1>
        <br /> 
        <div id="firebaseui-auth-container"></div>
      </> 
    )
  }
}

export default Login;