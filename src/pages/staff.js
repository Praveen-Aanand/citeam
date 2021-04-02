import { useEffect, useState } from "react"
import firebase from "firebase";
import Drawer from "../components/drawer";
import { UserData } from "../store";
import AddUser from "../components/Adduser";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import DialogTitle from '@material-ui/core/DialogTitle';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

}));
export default function StaffManage(params) {
    const [staff, setStaff] = useState([]);
    const user = UserData.useState(s => s)


    useEffect(() => {
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
        firebase.firestore().collection('user').orderBy('name').onSnapshot((doc) => {
            var temp = [];
            doc.forEach((data) => {
                temp.push({
                    Name: data.data().name,
                    Phone: data.data().phone,
                    Role: data.data().role,
                    Exp: data.data().Exp,
                    BH: data.data().BatchHolder,
                    Add: data.data().Address,
                    Lno: data.data().Lno,
                    Dob: data.data().dob,
                    id: data.id
                });
                console.log(temp)
            })
            setStaff(temp)
        });
    }, [])

    if (user.data?.role == 'admin' && user.data?.uid !== null) {
        return (
            <div>
                <Drawer />
                <small>Total number of users {staff?.length}</small>
                <table width="100%">
                    {staff.map((data) => {
                        return (
                            <>
                                
                                <TableXp data={data} key={data.id} />

                            </>
                        )
                    })}
                </table>

                <AddUser />
            </div>
        )
    }
    else {
        return (
            <h1>UnAuthorized user</h1>
        )
    }
}



function TableXp(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const deleteUser = (id, n) => {
        if (window.confirm(`Are you sure ? to delete ${n}`)) {
            firebase.firestore().collection('user').doc(id).delete().then((data) => {
                console.log('user deleted')
            })
        }
    }
    return (
        <>

            <tr key={props.data.Phone} style={{ border: '1px solid red' }} >
                <td style={{ fontWeight: 600 }}>
                    {props.data.Name}
                </td>
                <td>
                    {props.data.Phone}
                </td>
                <td>
                    {props.data.Role}
                </td>
                <td>
                    <div align="right"><IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton></div>
                </td>
            </tr>
            <Dialog aria-labelledby="simple-dialog-title" open={expanded} onClose={handleExpandClick}>
            <DialogTitle id="simple-dialog-title">{props.data.Name}</DialogTitle>
                <div width="100%" style={{ padding:'10px'}}>
                    <table>
                        {/* <tr>
                            <td style={{ fontWeight: 600 }}>Name</td>
                            <td> {props.data.Name}</td>
                        </tr> */}
                        <tr>
                            <td style={{ fontWeight: 600 }}>Address</td>
                            <td> {props.data.Add}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 600 }}>DOB</td>
                            <td> {new Date(props.data.Dob.seconds).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 600 }}>Experience</td>
                            <td> {props.data.Exp}</td>
                        </tr> <tr>
                            <td style={{ fontWeight: 600 }}>Batch Holder</td>
                            <td> {props.data.BH}</td>
                        </tr> <tr>
                            <td style={{ fontWeight: 600 }}>Licence Number</td>
                            <td> {props.data.Lno}</td>
                        </tr>
                    </table>

                    <Button
                        variant="contained"
                        color="#fffff"
                        style={{ backgroundColor: 'red', color: 'white' }}
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => deleteUser(props.data.id, props.data.Name)}
                    >
                        Remove
                    </Button>
                </div>
                </Dialog>
        </>
    )
}