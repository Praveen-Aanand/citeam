
import { useEffect, useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import firebase from "firebase";
import Button from '@material-ui/core/Button';
import { TimePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { UserData } from "../store";
import { set } from 'date-fns';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const [selectStart, setStart] = useState(new Date());
  const [selectEnd, setEnd] = useState('');
  const user = UserData.useState(s => s)
  const [commited, setCommited] = useState(false)
  const [cdata, setCdata] = useState({});
  const [kmres, setKmres] = useState('');
  const [kmree, setKmree] = useState('');
  const [code, setCode] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [codeList, setCodeList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const handleChangeC = (event) => {
    setCode(event.target.value);
  };
  const handleChangeV = (event) => {
    setVehicle(event.target.value);
  };
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
  useEffect(() => {

    firebase.firestore().collection('onboarding').doc(user.data.phoneNumber).get().then((doc) => {
      console.log(doc.data())
      if (doc.exists) {
        console.log("committed")
        setCommited(true)
        setCdata(doc.data())
      }
      else {
        var codeCatch = JSON.parse(window.localStorage.getItem('codeCatch'));
        var vehicleCatch = JSON.parse(window.localStorage.getItem('vehicleCatch'));
        // console.log(new Date(codeCatch?.exp) >= new Date())
        if (codeCatch !== null && new Date(codeCatch?.exp) >= new Date() && vehicleCatch !== null && new Date(vehicleCatch?.exp) >= new Date()) {
          console.log('catch')
          setCodeList(codeCatch.data)
          setVehicleList(vehicleCatch.data)
        } else {
          console.log('fetch')
          firebase.firestore().collection('config').doc('shortcode').get().then((doc) => {
            console.log(doc.data())
            if (doc.exists) {
              let temp = {
                exp: new Date().addDays(1),
                data: doc.data()
              }
              window.localStorage.setItem('codeCatch', JSON.stringify(temp))
              setCodeList(temp.data)
            }
          })
          firebase.firestore().collection('config').doc('vehicle').get().then((doc) => {
            console.log(doc.data())

            if (doc.exists) {
              let temp = {
                exp: new Date().addDays(1),
                data: doc.data()
              }
              window.localStorage.setItem('vehicleCatch', JSON.stringify(temp))
              setVehicleList(temp.data)
            }
          })

        }

      }
    })
  }, [commited])

  const StartRide = () => {
    var temp={
      date: new Date(new Date().toDateString()),
      startTime: selectStart,
      name: user.data.name,
      vehicle: vehicle,
      code: code,
      phone: user.data.phoneNumber,
      startKm:kmres
    };
    firebase.firestore().collection('onboarding').doc(user.data.phoneNumber).set(temp).then((data) => {
      
      setCommited(true)
    })
  }
  const FinishRide = () => {
    firebase.firestore().collection('log').add({
      name:cdata.name,
      date:cdata.date,
      startTime:cdata.startTime,
      startKm:cdata.startKm,
      vehicle:cdata.vehicle,
      code:cdata.code,
      phone:cdata.phone,
      endTime: selectEnd,
      endKm:kmree,
      duration:document.getElementById('duration').innerHTML,
      distance:document.getElementById('distance').innerHTML,
    }).then(() => {
      console.log("posted sss")
      firebase.firestore().collection('onboarding').doc(user.data.phoneNumber).delete().then(()=>{
        setCommited(false)
      });
    })
  }
  const CancleRide = () => {
   if(window.confirm("do you want to cancle ?")){
    firebase.firestore().collection('onboarding').doc(user.data.phoneNumber).delete().then(()=>{
      setCommited(false)
    });
   }
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
    <div>
      {
        !commited ?
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
             <h2 style={{textIndent:'10px'}}>Create Trip</h2>
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
              <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                  Short code
        </InputLabel>
                {codeList.length != 0 ? <Select
                  value={code }
                  onChange={handleChangeC}
                  label="Start Time"
                  displayEmpty
                  className={classes.selectEmpty}
                // inputProps={{ 'aria-label': 'Without label' }}
                >
                  {codeList?.list?.map((data) => {
                    return <MenuItem value={data.code}>{data.code} - <small> {data.branch}</small></MenuItem>
                  })}

                </Select> : null}
              </FormControl>

              <br />
              <FormControl className={classes.formControl}>

                <InputLabel shrink id="demo-simpl-label">
                  Vehicle
        </InputLabel>
                {vehicleList.length != 0 ? <Select
                  value={vehicle }
                  onChange={handleChangeV}
                  label="Start Time"
                  displayEmpty
                  className={classes.selectEmpty}
                // inputProps={{ 'aria-label': 'Without label' }}
                >
                  {vehicleList?.list?.map((data) => {
                    return <MenuItem value={data.regNum}>{data.regNum} - <small> {data.model}</small></MenuItem>
                  })}

                </Select> : null}
              </FormControl>
              <TextField
                label="Km reading"
                type="number"
                value={kmres}
                onChange={(e) => { console.log(e.target.value); setKmres(e.target.value.trim()) }}
              />
            </form>
            <Button variant="contained" color="primary" onClick={() => StartRide()}>
              Start Ride
           </Button>
          </MuiPickersUtilsProvider>
          :
          <div>
             <h2 style={{textIndent:'10px'}}>Complete Trip</h2>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="End Time"
                value={selectEnd || new Date()}
                onChange={handleDateChangeEnd}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </MuiPickersUtilsProvider>
            {selectEnd > cdata.startTime?.toDate() ?
              <div>
                <p >Duration : <small id="duration">{Math.floor(new Date(selectEnd - cdata?.startTime?.toDate()) / 1000 / 60 / 60)}h - {Math.floor(new Date(selectEnd - cdata?.startTime?.toDate()) / 1000 / 60) % 60}m</small></p>


              </div> : <p style={{ textAlign: 'center' }}>Set The End Time</p>}
              <TextField
        label="Km reading"
        type="number"
        value={kmree}
        onChange={(e) => { console.log(e.target.value); setKmree(e.target.value)}}
      />
      { kmree > cdata?.startKm ?
        <div>
          <p >Duration : <small id="distance">{kmree-cdata.startKm} Km</small></p>
        </div> : <p style={{ textAlign: 'center' }}>Set The  End KM reading</p>}

      <Button variant="contained" color="primary" onClick={() => FinishRide()}>
        Finish Ride
           </Button>
           <br/>
           <br/><br/>
           <br/>
           <br/>
           <Button variant="contained" color="red" onClick={() => CancleRide()}>
        Cancle Ride
           </Button>
          </div>
      }
    </div >
  );
}
