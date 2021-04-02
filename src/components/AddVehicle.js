import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import firebase from "firebase";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const [open, setOpen] = React.useState(false);
    const [regNum, setRegNum] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [model, setModel] = React.useState('');
    const [owner, setOwner] = React.useState('');
    const [selectedDateINC, setselectedDateINC] = React.useState(new Date(new Date().toDateString()));
    const [selectedDateFC, setselectedDateFC] = React.useState(new Date(new Date().toDateString()));

    const [value, setValue] = React.useState('staff');
    const handleClickOpen = () => {
        setOpen(true);
        setRegNum('');
        setPhone('');
        setModel("");
        setOwner('');
        setselectedDateINC(new Date(new Date().toDateString()));
        setselectedDateFC(new Date(new Date().toDateString()))
    };

    const handleClose = () => {
        setOpen(false);
        setRegNum('');
        setPhone('');
        setModel("");
        setOwner('');
        setselectedDateINC(new Date(new Date().toDateString()));
        setselectedDateFC(new Date(new Date().toDateString()))
    };
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const Upload =async () => {

        if (regNum.length && phone.length) {
            var temp =props.listData||[];
            temp.push({
                regNum: regNum,
                phone: phone,
                model: model,
                owner: owner,
                fcUpto: selectedDateFC,
                incUpto: selectedDateINC
            });
            console.log('here')
           await firebase.firestore().collection('config').doc('vehicle').set({
                list:temp
            }).then(() => {
                console.log("posted sss")
                handleClose()
            })
        }
    }
    return (
        <div>
            <br />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Vehicle
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Add Members"}</DialogTitle>
                <DialogContent>
                    <TextField
                        value={regNum}
                        autoFocus
                        margin="dense"
                        id="NumberUp"
                        label="Reg Number"
                        type="name"
                        fullWidth
                        onChange={(e) => { console.log(e.target.value); setRegNum(e.target.value.trim()) }}

                    />
                    <TextField
                         value={model}
                        autoFocus
                        margin="dense"
                        id="Model"
                        label="model"
                        type="text"
                        fullWidth
                        onChange={(e) => { console.log(e.target.value); setModel(e.target.value.trim()) }}

                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                             
                            margin="normal"
                            id="date-picker-dialog"
                            label="Incurance UPTO"
                            format="dd/MM/yyyy"
                            value={selectedDateINC}
                            onChange={(date) => { setselectedDateINC(date) }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker

                            margin="normal"
                            id="date-picker-dialog"
                            label="FC UPTO"
                            format="dd/MM/yyyy"
                            value={selectedDateFC}
                            onChange={(date) => { setselectedDateFC(date) }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>



                    <TextField
                        value={owner}
                        autoFocus
                        margin="dense"
                        id="Owner"
                        label="Owner"
                        type="text"
                        fullWidth
                        onChange={(e) => { console.log(e.target.value); setOwner(e.target.value.trim()) }}
                    />
                    <TextField

value={phone}
                        margin="dense"
                        id="phoneUp"
                        label="Phone Number"
                        onChange={(e) => { console.log(e.target.value); setPhone(e.target.value.trim()) }}
                        type="number"
                        fullWidth
                    />
                    <br /><br />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancle
          </Button>
                    <Button onClick={Upload} color="primary">
                        Add
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
