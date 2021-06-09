import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button'
//import './callbacks/openidconnect-popup-signin-callback.js'
import Assessments, { } from "./pages/assessment/Assessments"
import SideMenu from './components/SideMenu'
import { ThemeProvider, CssBaseline, createMuiTheme, makeStyles,Paper } from '@material-ui/core';
import { AuthProvider } from 'oidc-react';
import { useAuth } from 'oidc-react';
import 'oidc-client';
import { Log, User, UserManager } from 'oidc-client';
import { ToastContainer, toast } from 'react-toastify';
import { AuthService } from './services/AuthService';
import Box from '@material-ui/core/Box';

var auth = new AuthService();
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
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    margin: theme.spacing(1)
  },
  field: {
    margin: theme.spacing(1)
  }
})

const login = () => {
  auth.login()
};




function App() {
  const classes = useStyles();
  const [Assessment, setAssessment] = useState(false);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // Update the document title using the browser API
      auth.getUser().then(user => {
        if (user) {
          console.log(user)
          console.log("here")
          setAssessment(true);

        } else {
            setAssessment(false);
        }
  
       
      });
    });
    
    var vue;
    if (Assessment) {
      vue = <Assessments />;
    } else {
      vue =<Box
      color="white"
      p={2}
      position="absolute"
      top={400}
      left="40%"
      zIndex="tooltip"
    >
      <Button  color="primary" className={classes.button} style={{ margin: '10px' }} onClick={login}>
      Sie sind nicht angemeldet. Klicken Sie auf diesen Text, um sich anzumelden
    </Button>
    </Box>;
    }
    return (
          
      <ThemeProvider theme={theme}>
        <SideMenu />
        <div className={classes.appMain}>
          <header />
          
          {vue}

        </div>
        <CssBaseline/>
      </ThemeProvider>
  );
  
    
}


export default App;
