import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './pages/login';
import App from './App';
import Drawer from "./components/drawer"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Switch,Route } from "react-router-dom";
import Staff from './pages/staff';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, orange } from '@material-ui/core/colors';
import Vehicle from './pages/vehicle';
import ShortCode from './pages/shortCode'
import Myrecords from './components/myRecords';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
const outerTheme = createMuiTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
    primary: {
      main: '#16c2f2',
    },
  },
});
ReactDOM.render(
  <ThemeProvider theme={outerTheme}>
  <React.StrictMode>
    <BrowserRouter>
      {/* <IndexRoute component = {App} /> */}
      <Switch>
      <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/staff" component={Staff} />
        <Route exact path="/vehicle" component={Vehicle} />
        <Route exact path="/shortcode" component={ShortCode} />
        <Route exact path="/myrecords" component={Myrecords} />
        {/* <Route path="/order/:shop/:address" component={OrderPage} />
        <Route path="/order" component={OrderPage} /> */}

        {/* <Redirect path="*" to="/" /> */}
      </Switch>
    </BrowserRouter>
  </React.StrictMode>
  </ThemeProvider>
  ,
  document.getElementById('root')
);
serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
