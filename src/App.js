import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button'
//import './callbacks/openidconnect-popup-signin-callback.js'
import 'openidconnect-signin/openidconnect-signin.js'
import Assessments, { } from "./pages/assessment/Assessments"
import SideMenu from './components/SideMenu'
import { ThemeProvider, CssBaseline, createMuiTheme, makeStyles } from '@material-ui/core';

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

function App() {
  const classes = useStyles();
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
