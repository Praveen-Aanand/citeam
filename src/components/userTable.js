import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

export default function DenseTable(props) {
  const classes = useStyles();
  const rows = props.data;
  return (
    <div> 
      <small>{props.data.lenght} d</small>
    <TableContainer component={Paper}> 
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Role</TableCell>
        
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              
              <TableCell align="left">{row.Name}</TableCell>
              <TableCell align="left">{row.Phone}</TableCell>
              <TableCell align="left">{row.Role == "staff"? "User": row.Role}</TableCell>
              {/* <TableCell align="right">{row.block?<Button variant="contained" color="primary">
  Un Block
</Button>:<Button variant="contained" color="secondary">
  Block
</Button>}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
