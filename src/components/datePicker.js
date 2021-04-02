import 'date-fns';
import React, { useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import firebase from "firebase";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import CsvDownload from 'react-json-to-csv'
import Table from "./table"
export default function MaterialUIPickers() {
    const [selectedDateF, setselectedDateF] = React.useState(new Date(new Date().toDateString()));
    const [selectedDateT, setselectedDateT] = React.useState(new Date(new Date().toDateString()));
    const [data, setData] = React.useState([]);

    const handleDateChangeF = (date) => {
        console.log(date)
        console.log(Date())
        setselectedDateF(date);
    };

    const handleDateChangeT = (date) => {
        console.log(date)
        console.log(Date())
        setselectedDateT(date);
    };
    const tConvert = (time) => {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }
    useEffect(() => {

        var localdata = window.localStorage.getItem(`${selectedDateF}-${selectedDateT}-D`);
        if (localdata !== null) {
            console.log("from local", localdata)
            setData(JSON.parse(localdata));
        }
        else {
            if (selectedDateF==selectedDateT) {
                firebase.firestore().collection('log').where("date", '==', selectedDateF).orderBy('startTime').onSnapshot((doc) => {
                    var temp = [];
                    doc.forEach((data) => {
                        var st = tConvert(data.data().startTime.toDate().toLocaleTimeString());
                        var et = tConvert(data.data().endTime.toDate().toLocaleTimeString());
    
                        console.log(st)
                        temp.push({
                            Date: data.data().date.toDate().toLocaleDateString(),
                            Driver: data.data().name,
                            Phone: data.data().phone,
                            'Start Time': st,
                            'End Time': et,
                            Duration: data.data().duration,
                            Distance: data.data().distance,
                            'Start KM': data.data().startKm,
                            'End Km': data.data().endKm,
                            'Short Code': data.data().code,
                            'Vehicle': data.data().vehicle,
                            id: data.id
                        });
                        console.log(temp)
                    })
    
                    setData(temp)
                    if (temp.length !== 0 && new Date(new Date().toDateString()) == selectedDateF) {
                        window.localStorage.setItem(`${selectedDateF}-${selectedDateT}-D`, JSON.stringify(temp))
                    }
                })
            } 
            else {
                firebase.firestore().collection('log').where("startTime", '>=', selectedDateF).where("startTime", '<=', selectedDateT).orderBy('startTime').onSnapshot((doc) => {
                    var temp = [];
                    doc.forEach((data) => {
                        var st = tConvert(data.data().startTime.toDate().toLocaleTimeString());
                        var et = tConvert(data.data().endTime.toDate().toLocaleTimeString());
    
                        console.log(st)
                        temp.push({
                            Date: data.data().date.toDate().toLocaleDateString(),
                            Driver: data.data().name,
                            Phone: data.data().phone,
                            'Start Time': st,
                            'End Time': et,
                            Duration: data.data().duration,
                            Distance: data.data().distance,
                            'Start KM': data.data().startKm,
                            'End Km': data.data().endKm,
                            'Short Code': data.data().code,
                            'Vehicle': data.data().vehicle,
                            id: data.id
                        });
                        console.log(temp)
                    })
    
                    setData(temp)
                    if (temp.length !== 0 && new Date(new Date().toDateString()) == selectedDateF) {
                        window.localStorage.setItem(`${selectedDateF}-${selectedDateT}-D`, JSON.stringify(temp))
                    }
                })
            }
        }
        // firebase.firestore().collection("log").doc("test").set({
        //     time:selectedDateF
        // })
    }, [selectedDateF, selectedDateT])

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="From Date"
                    format="dd/MM/yyyy"
                    value={selectedDateF}
                    onChange={handleDateChangeF}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="To Date"
                    format="dd/MM/yyyy"
                    value={selectedDateT}
                    onChange={handleDateChangeT}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
            <br />
            <br />
            <CsvDownload data={data}
                filename={`${selectedDateF.toLocaleDateString()}-${selectedDateT.toLocaleDateString()}.csv`}
                style={{ //pass other props, like styles
                    //   boxShadow:"inset 0px 1px 0px 0px #e184f3",
                    //   background:"linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)",
                    backgroundColor: "#3f51b5",
                    //   borderRadius:"6px",
                    border: "0px solid gray",
                    display: "inline-block",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: "bold",
                    padding: "6px 24px",
                    textDecoration: "none",
                    color: 'white'
                }}
            />
            <br />
            {data.length ? <Table data={data} /> : <p>No data avalable at this date</p>}
        </div>
    )
}

function OnGoing(params) {
    const tConvert = (time) => {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }
    useEffect(() => {
        firebase.firestore().collection('onGoing').orderBy('startTime').onSnapshot((doc) => {
            var temp = [];
            doc.forEach((data) => {
                var st = tConvert(data.data().startTime.toDate().toLocaleTimeString());
                var et = tConvert(data.data().endTime.toDate().toLocaleTimeString());
                console.log(st)
                temp.push({
                    Date: data.data().date.toDate().toLocaleDateString(),
                    Driver: data.data().name,
                    Phone: data.data().phone,
                    'Start Time': st,
                    'End Time': et,
                    Duration: data.data().duration,
                    Distance: data.data().distance,
                    'Start KM': data.data().startKm,
                    'End Km': data.data().endKm,
                    'Short Code': data.data().code,
                    'Vehicle': data.data().vehicle,
                    id: data.id
                });
                console.log(temp)
            })
        }, [])
    })
}
