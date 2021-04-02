import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { UserData } from "../store";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import firebase from "firebase";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

export default function DenseTable(props) {
  const user = UserData.useState(s => s)
  const classes = useStyles();
  const rows = props.data;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Short Code</TableCell>
            <TableCell align="left">Vehicle</TableCell>
            <TableCell align="left">Duration</TableCell>
            <TableCell align="left">Total Run</TableCell>
            {user.data?.role == 'admin' ?<TableCell align="left">Delete</TableCell>:null}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.Date}</TableCell>
              <TableCell align="left">{row[`Short Code`]}</TableCell>
              <TableCell align="left">{row['Vehicle']}</TableCell>
              <TableCell align="left">{row.Duration}</TableCell>
              <TableCell align="left" >{row.Distance} </TableCell>
              {user.data?.role == 'admin' ? <IconButton aria-label="delete">
                <DeleteIcon onClick={()=>{
                  if(window.confirm("Are you sure to delete?")){
                    firebase.firestore().collection('log').doc(row.id).delete().then(()=>{
                      console.log('deleted');
                    })
                  }else{
                    console.log('cancled')
                  }
                }}/>
              </IconButton>:null}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
