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
    const [code, setCode] = React.useState('');
    const [branch, setBranch] = React.useState('');
   

    const [value, setValue] = React.useState('staff');
    const handleClickOpen = () => {
        setOpen(true);
        setCode('');
        setBranch('');
      
    };

    const handleClose = () => {
        setOpen(false);
        setCode('');
        setBranch('');
      
    };
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const Upload =async () => {

        if (code.length && branch.length) {
            var temp =props.listData||[];
            temp.push({
               code:code,
               branch:branch
            });
            console.log('here')
           await firebase.firestore().collection('config').doc('shortcode').set({
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
                Add Short Code
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Add ShortCode"}</DialogTitle>
                <DialogContent>
                    <TextField
                        value={code}
                        autoFocus
                        margin="dense"
                        id="NumberUp"
                        label="Short code"
                        type="text"
                        fullWidth
                        onChange={(e) => { console.log(e.target.value); setCode(e.target.value.trim()) }}

                    />
                    <TextField
                         value={branch}
                        autoFocus
                        margin="dense"
                        id="Model"
                        label="Branch"
                        type="text"
                        fullWidth
                        onChange={(e) => { console.log(e.target.value); setBranch(e.target.value.trim()) }}

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
