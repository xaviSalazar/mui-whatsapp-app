import * as React from 'react';
import { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListSubheader from '@mui/material/ListSubheader';
// import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Summary from './Summary';
import MessagingPage from './pages/MessagingPage';
import {socket} from './conection-manager/socketioManager'
// added now 
import {doCustomerAuth} from './redux/Authentification/Actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {useEffect} from 'react'
import Customers from './pages/Customers'
import Settings from './pages/Settings'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


const handleClick = (component_name, setActiveWindow) => {
    console.log(component_name)
    if(component_name === "Dashboard") {
        setActiveWindow(component_name)
    } else if (component_name === "Messaging-page") {
        setActiveWindow(component_name)
    } else if (component_name === "Customers-page") {
      setActiveWindow(component_name)
    } else if (component_name === "Settings-page") {
      setActiveWindow(component_name)
    }
}

const mdTheme = createTheme();

function DashboardContent() {

  const [open, setOpen] = React.useState(true);
  const [activeWindow, setActiveWindow] = useState("")
  const dispatch = useDispatch()
  let auth = useSelector(state => state.customerReducer.auth)
  let navigate = useNavigate()

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(doCustomerAuth()).then( async (response) => {
       if(! response.payload.data.success) {
        navigate('/login');    
       } 
    });

}, [])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* Barra superior */}
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {activeWindow}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        
        {/* EL NAVIGATION BARRA IZQUIERDA */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >Save
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            
            <ListItemButton onClick={(e) => handleClick("Dashboard", setActiveWindow)}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>

            <Divider sx={{ my: 1 }} />

            <React.Fragment>
            <ListSubheader component="div" inset>
            Apps
            </ListSubheader>
            <ListItemButton onClick={(e) => handleClick("Messaging-page", setActiveWindow)}>
            <ListItemIcon>
                <WhatsAppIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
            </ListItemButton>

            <ListItemButton onClick={(e) => handleClick("Customers-page", setActiveWindow)}>
            <ListItemIcon>
                <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
            </ListItemButton>

            <ListItemButton onClick={(e) => handleClick("Settings-page", setActiveWindow)}>
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            </ListItemButton>
        </React.Fragment>

          </List>
        </Drawer>
        
        {/* Donde va el componente */}
        

        {/* PAGES I WANT TO CHOOSE GOES HERE */}
          {activeWindow === "Dashboard" && <Summary />}
          {activeWindow === "Messaging-page" && <MessagingPage socket={socket}/>}
          {activeWindow === "Customers-page" && <Customers/>}
          {activeWindow === "Settings-page" && <Settings/>}

        
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
