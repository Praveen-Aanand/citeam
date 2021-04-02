
import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import firebase from "firebase";
import Button from '@material-ui/core/Button';
import { TimePicker } from '@material-ui/pickers'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { UserData } from "../store";
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const [selectStart, setStart] = React.useState(new Date());
  const [selectEnd, setEnd] = React.useState(new Date());
  const user=UserData.useState(s=>s) 

  

  const Update = () => {
    firebase.firestore().collection('log').add({
      date:new Date(new Date().toDateString()),
      duration:document.getElementById('duration').innerHTML,
      endTime:selectEnd,
      startTime:selectStart,
      name:user.data.name,
      phone:user.data.phoneNumber,

    }).then(()=>{
      console.log("posted sss")
    })
  }
  const handleDateChangeStart = (date) => {
    console.log(date)
    setStart(date);
  };
  const handleDateChangeEnd = (date) => {
    console.log(date)
    setEnd(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form className={classes.root} noValidate autoComplete="off">
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Start Time"
          value={selectStart}
          onChange={handleDateChangeStart}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        /><br />

        {/* <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="End Time"
          value={selectEnd}
          onChange={handleDateChangeEnd}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        /><br />  */}

        {/* { selectEnd > selectStart ?
        <div>
          <p >Duration : <small id="duration">{Math.floor(new Date(selectEnd-selectStart) / 1000 / 60 / 60)}h - {Math.floor(new Date(selectEnd-selectStart) / 1000 / 60)%60}m</small></p>

          <Button variant="contained" color="primary" onClick={()=>Update()}>
          Update
           </Button>
        </div>: <p style={{textAlign:'center'}}>Set The Start and End Time</p>} */}
      </form>
    </MuiPickersUtilsProvider>
  );
}
