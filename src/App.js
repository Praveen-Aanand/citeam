import './App.css';

import { Component } from 'react';
import firebase from "firebase";
import { Redirect } from 'react-router-dom';
import Drawer from "./components/drawer"
import { UserData } from "./store";
import DateReport from "./components/datePicker"
import StartRide from "./components/startRIde"
// function App() {
//   return (
//     <div align="center" className="App">
//       <img src={homeimg} style={{width:"100%"}}></img>
//       <div className="MainHeader">
//         <SelectStore />
//         <MyOrders/>
//       </div>
//     </div>
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "load",
    }
  } 
  componentDidMount() {
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
          this.setState({ currentUser: "notlogin" })
        }
        }).catch((err)=>{
          console.error(err)
          this.setState({ currentUser: "notlogin"})
        })

        this.setState({ currentUser: data })

        //console.log(user)
      } else {
        this.setState({ currentUser: "notlogin" })
        //console.log(user)
      }
    });
    // this.getUsers()
  }

  render() {
    if (this.state.currentUser == 'load') {
      return (
        <h2>Loading...</h2>
      )
    }

    else if (this.state.currentUser == 'notlogin') {

      return (
        <Redirect to="/login" />
      )
    }
    else if (this.state.currentUser =={}) {
      alert("un Authorized")
      return (
        <Redirect to="/login" />
      )
    }
    else {
      return (
        <div align="center" className="App">
          {/* <img src={homeimg} style={{ width: "100%" }}></img> */}
          <Drawer/>
          <div className="MainHeader">
         {this.state?.currentUser?.role=='admin'? <DateReport/>:null}
         {this.state?.currentUser?.role=='staff'? <StartRide/>:null}
          </div>
        </div> 
      )

    }
  }

}

export default App;