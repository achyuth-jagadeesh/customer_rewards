import React from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    height:"200px",
    overFlow:"auto"
  },
  container:{
    height:"300px",
    overFlow:"auto" 
  }
});

// Demonstrating latest react hooks useSelector to get the state from store.

function TransactionHistory(props) {
  const classes = useStyles();
  debugger;
  var transactionList = useSelector((state) => state.transactions);
  return (
    <div>
      <TableContainer component={Paper} className={classes.container}  >
        <Table stickyHeader  className={classes.table} >
          <TableHead >
            <TableRow>
              <TableCell align="right">Sl No.</TableCell>
              <TableCell align="right">Customer ID</TableCell>
              <TableCell align="right">Customer Name</TableCell>
              <TableCell align="right">Transaction Date</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionList.map((row,index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index+1}
                </TableCell>
                <TableCell align="right">{row.custid}</TableCell>
                <TableCell align="right">{row.custName}</TableCell>
                <TableCell align="right">{row.transactionDt.toDateString()}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            )).reverse()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}


export default TransactionHistory;
