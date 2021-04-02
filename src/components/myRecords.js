import {useEffect,useState} from 'react';
import { UserData } from "../store";
import firebase from "firebase";
import Drawer from '../components/drawer';
import Table from "./table"
export default function Myrecords (){
    const user = UserData.useState(s => s)
    const [data,setData]=useState([]);
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
    useEffect(()=>{
        if(user.data?.phoneNumber){
            firebase.firestore().collection('log').where('phone','==',user.data?.phoneNumber).orderBy('startTime').limit(5).get().then(async(doc)=>{
                var temp = [];
               await doc.forEach((data) => {
                    var st = tConvert(data.data().startTime.toDate().toLocaleTimeString());
                    var et = tConvert(data.data().endTime.toDate().toLocaleTimeString());
                    console.log(st)
                    temp.push({
                        Date:data.data().date.toDate().toLocaleDateString(),
                        Driver: data.data().name,
                        Phone: data.data().phone,
                        'Start Time': st,
                        'End Time': et,
                        Duration: data.data().duration,
                        id:data.id,
                        'Short Code': data.data().code,
                        'Vehicle': data.data().vehicle,
                        Distance: data.data().distance,
                    });
                    console.log(temp)
                })
                setData(temp)
            })
        }
    },[])
    return(
        <div>
             <Drawer />
             <h2 style={{textIndent:'10px'}}>My Records</h2>
                       {data.length?<Table data={data}/>:<p>No data avalable at this date</p>}
        </div>
    )
}