import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {Redirect,Link} from "react-router-dom";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LocalShippingRoundedIcon from '@material-ui/icons/LocalShippingRounded';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AppBar from "./AppBar"
import PersonIcon from '@material-ui/icons/Person';
import { UserData } from "../store";
import Vehicle from '../pages/vehicle'
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import firebase from 'firebase';
import Logo from "../pages/logo.jpeg"
import { intervalToDuration } from 'date-fns';
const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function SwipeableTemporaryDrawer() {
    const classes = useStyles();
    const user=UserData.useState(s=>s) 
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    useEffect(()=>{
        var firebaseConfig = {
            apiKey: "AIzaSyD7qXQvwIHRX2b0gxaP9YiSVhDoeEqnkec",
            authDomain: "staffmanagementuk.firebaseapp.com",
            projectId: "staffmanagementuk",
            storageBucket: "staffmanagementuk.appspot.com",
            messagingSenderId: "184460868593",
            appId: "1:184460868593:web:157086f090f8a45429a250",
            measurementId: "G-XZ4GZ4PGZ8"
          };
          // //console.log(this.props.match.params.pincode, this.props.match.params.parms)
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            firebase.analytics();
          } else {
            firebase.app(); // if already initialized, use that one
          }
        if (user) {
            
        } else {
           
              firebase.auth().onAuthStateChanged(async(user) => {
                if (user) {
                  console.log(user)
                  var data={};
                await firebase.firestore().collection('user').doc(user.phoneNumber).get().then(function (userdata){
                  if(userdata.exists){
                    data={
                      name:userdata.data().name,
                      role:userdata.data().role,
                      uid:user.uid,
                      phoneNumber:user.phoneNumber
                    }
                     UserData.update(s=>{
                       s.data=data
                     })
                  }
                  else{
                      console.log('login')
                    return <Redirect to={`/login`}/>
                  }
                  }).catch((err)=>{
                    console.log('login cc')
                    return <Redirect to={`/login`}/>
                  })
          
          
                  //console.log(user)
                } else {
                  //console.log(user)
                }
              });
        }
    },[])
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <h1 align="center">CITEAM</h1>
            {user.data?.role === 'admin'?<List>       
                <Link to={`./`}   >
                <ListItem button >
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Download Report"} />
                </ListItem>
                </Link>
                <Link to={`./staff`}   >
                <ListItem button>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Manage User"} />
                </ListItem>
                </Link>
                <Link to={`./vehicle`}   >
                <ListItem button>
                    <ListItemIcon>
                    <LocalShippingRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Vehicle Management"} />
                </ListItem>
                </Link>
                <Link to={`./shortcode`}   >
                <ListItem button>
                    <ListItemIcon>
                    <ListAltRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Short Code"} />
                </ListItem>
                </Link>
            </List>:
            <List>       
            <Link to={`./`}   >
            <ListItem button >
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Attendance"} />
            </ListItem>
            </Link>
            <Link to={`./myrecords`}   >
            <ListItem button>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={"My Records"} />
            </ListItem>
            </Link>
        </List>
            }
            <img src={Logo} style={{position:'absolute',bottom:'100px'}} width="100%"/>
        </div>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <AppBar onClick={toggleDrawer(anchor, true)} />
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
