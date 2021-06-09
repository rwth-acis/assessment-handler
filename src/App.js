import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button'
//import './callbacks/openidconnect-popup-signin-callback.js'
import 'openidconnect-signin/openidconnect-signin.js'
import {_user} from 'openidconnect-signin/openidconnect-signin.js'
import Assessments, { } from "./pages/assessment/Assessments"
import SideMenu from './components/SideMenu'
import { ThemeProvider, CssBaseline, createMuiTheme, makeStyles } from '@material-ui/core';
import { AuthProvider } from 'oidc-react';
import { useAuth } from 'oidc-react';
import 'oidc-client';
import { Log, User, UserManager } from 'oidc-client';
import { ToastContainer, toast } from 'react-toastify';
import { AuthService } from './services/AuthService';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

/*const login = () => {
  AuthService Auth;
  Auth.login();
};*/




function App() {
  const classes = useStyles();
    // Similar to componentDidMount and componentDidUpdate:
    /*useEffect(() => {
      // Update the document title using the browser API
      AuthService.getUser().then(user => {
        if (user) {
          console.log(user);
          toast.success('User has been successfully loaded from store.');
          return (
            <ThemeProvider theme={theme}>
              <SideMenu />
              <div className={classes.appMain}>
                <header />
                <Assessments />
        
              </div>
              <CssBaseline/>
            </ThemeProvider>
                  
              
          );
        } else {
          toast.info('You are not logged in.');
          return (
          
            <ThemeProvider theme={theme}>
              <SideMenu />
              <div className={classes.appMain}>
                <header />
      
                <button className="btn btn-primary btn-login" style={{ margin: '10px' }} onClick={login}>
                  Activate Lasers
                </button>
      
              </div>
              <CssBaseline/>
            </ThemeProvider>
        );
        }
  
       
      });
    });*/
    return (
          
      <ThemeProvider theme={theme}>
              <SideMenu />
              <div className={classes.appMain}>
                <header />
                <Assessments />
        
              </div>
              <CssBaseline/>
            </ThemeProvider>
  );
    
  
    
}


export default App;
