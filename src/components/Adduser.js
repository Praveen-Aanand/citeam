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

export default function AlertDialogSlide() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [ln, setLn] = React.useState('');
    const [add, setAdd] = React.useState('');
    const [Bh, setBh] = React.useState('Yes');
    const [Exp, setExp] = React.useState('');
    const [selectedDateDob, setselectedDateDob] = React.useState(new Date(new Date().toDateString()));
    const [value, setValue] = React.useState('staff');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleChangeBh = (event) => {
        setBh(event.target.value);
    };
    const Upload = () => {
        
        if (name.length && phone.length) {
            console.log('here')
            firebase.firestore().collection('user').doc("+91" + phone).set({
                name: name,
                phone: phone,
                role: value,
                Address:add,
                BatchHolder:Bh,
                Exp:Exp+' year(s)',
                Lno:ln,
                dob:selectedDateDob
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
                Add Members
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
                    required={true}
                        autoFocus
                        margin="dense"
                        id="nameUp"
                        label="Name"
                        type="name"
                        fullWidth
                        onChange={(e) => { console.log(e.target.value); setName(e.target.value.trim()) }}

                    />
                    <TextField
                     required={true}
                        helperText={"Don't include (+91)"}
                        margin="dense"
                        id="phoneUp"
                        label="Phone Number"
                        onChange={(e) => { console.log(e.target.value); setPhone(e.target.value.trim()) }}
                        type="number"
                        fullWidth
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                         required={true}
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date of birth"
                            format="dd/MM/yyyy"
                            value={selectedDateDob}
                            onChange={(date) => { setselectedDateDob(date) }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <TextField
                     required={true}
                        autoFocus
                        margin="dense"
                        id="licence-number"
                        label="licence-number"
                        type="text"
                        fullWidth
                        onChange={(e) => { console.log(e.target.value); setLn(e.target.value.trim()) }}
                    />
                    <br/>
                     <FormControl component="fieldset">
                        <FormLabel component="legend">Batch BatchHolder</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={Bh} onChange={handleChangeBh}>
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                     <TextField
                      required={true}
                        autoFocus
                        margin="dense"
                        id="Experience"
                        label="Experience"
                        type="number"
                        fullWidth
                        onChange={(e) => { console.log(e.target.value); setExp(e.target.value.trim()) }}
                    />
                    <TextField
                     required={true}
                        multiline
                        rowsMax={4}
                        autoFocus
                        margin="dense"
                        id="AddUp"
                        label="Address"
                        type="name"
                        fullWidth
                        onChange={(e) => { console.log(e.target.value); setAdd(e.target.value.trim()) }}

                    />
                    <br /><br />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Role</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel value="staff" control={<Radio />} label="Staff" />
                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancle
          </Button>
                    <Button onClick={Upload}  color="primary">
                        Add
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
