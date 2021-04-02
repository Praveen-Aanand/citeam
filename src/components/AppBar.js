import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { UserData } from "../store";
import firebase from "firebase";
import {Redirect} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textTransform:'capitalize',
    padding:'0px'
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
const user=UserData.useState(s=>s) 
const LogOut=()=>{
  firebase.auth().signOut().then(()=>{
    return <Redirect to={`/login`}/>
  })
}
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>props.onClick()}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {user.data?.name}
            <p style={{fontSize:'15px',padding:'0px',margin:'0px',fontWeight:'200'}}>{user.data?.phoneNumber}</p>
          </Typography>
          <Button color="inherit" onClick={()=>LogOut()}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
