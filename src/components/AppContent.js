import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button'
//import './callbacks/openidconnect-popup-signin-callback.js'
import 'openidconnect-signin/openidconnect-signin.js'
import {_user} from 'openidconnect-signin/openidconnect-signin.js'
import Assessments, { } from "../pages/assessment/Assessments"
import SideMenu from './SideMenu'
import { ThemeProvider, CssBaseline, createMuiTheme, makeStyles } from '@material-ui/core';
import { AuthProvider } from 'oidc-react';
import { useAuth } from 'oidc-react';
import 'oidc-client';
import { Log, User, UserManager } from 'oidc-client';
import { ToastContainer, toast } from 'react-toastify';
import { AuthService } from '../services/AuthService';

var auth = new AuthService();


const login = () => {
  auth.login()
};




function AppContent() {
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // Update the document title using the browser API
      auth.getUser().then(user => {
        if (user) {
          console.log(user)
          console.log("here")
          toast.success('User has been successfully loaded from store.');
          return (
            
                <Assessments />
                  
              
          );
        } else {
          toast.info('You are not logged in.');
          return (
      
                <button className="btn btn-primary btn-login" style={{ margin: '10px' }} onClick={login}>
                  Activate Lasers
                </button>
        );
        }
  
       
      });
    });
    
    
  
    
}


export default AppContent;
