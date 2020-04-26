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
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    maxHeight: "200px",
    overFlow: "auto",
  },
  header: {
    textAlign: "left",
    paddingLeft: "10px",
    marginBlockStart: "0px",
  },
  headerYear: {
    textAlign: "left",
    marginBlockStart: "0px",
    marginBlockEnd: "0px",
  },
  yearPaper: {
    padding: "5px",
  },
});

// Demonstrating latest react hooks useSelector to get the state from store.

function MonthWiseRewardsReportView(props) {
  const classes = useStyles();

  var transactionList = useSelector((state) => state.transactions); // fetches the list of transactions from the strore
  const [openDialogue, setOpen] = React.useState(false); // State management with react 16.8 hooks in functional components
  const [transactions, setTransaction] = React.useState([]); // State management with react 16.8 hooks in functional components
  var customerDataMap = {};

  const handleClickOpen = (transactions) => {
    setTransaction(
      transactions.map((transaction,index) => {
        return (
          <tr key={index}>
            <td>{transaction.transactionDt.toDateString()}</td>
            <td>{transaction.custName}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.rewardsPts}</td>
          </tr>
        );
      })
    );
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 0; i < transactionList.length; i++) {
    var transaction = transactionList[i];

    var { custName, amount, transactionDt } = transaction;
    var year = transactionDt.getFullYear();

    if (!customerDataMap[custName]) {
      customerDataMap[custName] = {
        totalRewardPoints: 0,
        yearsMap: {},
      };
    }

    if (!customerDataMap[custName].yearsMap[year]) {
      customerDataMap[custName].yearsMap[year] = {
        yearWiseTotalRewards: 0,
        monthsMap: {},
      };
    }

    var month = months[transactionDt.getMonth()];

    if (!customerDataMap[custName].yearsMap[year].monthsMap[month]) {
      customerDataMap[custName].yearsMap[year].monthsMap[month] = {
        monthWiseRewardPoints: 0,
        transactions: [],
      };
    }

    let rewardsPts = 0;

    if (amount >= 50 && amount < 100) {
      rewardsPts = amount - 50;
    } else if (amount > 100) {
      rewardsPts = 2 * (amount - 100) + 50;
    } else {
      rewardsPts = 0;
    }

    customerDataMap[custName].yearsMap[year].monthsMap[
      month
    ].transactions.push({ ...transaction, rewardsPts });
    customerDataMap[custName].yearsMap[year].monthsMap[
      month
    ].monthWiseRewardPoints += rewardsPts;
    customerDataMap[custName].yearsMap[year].yearWiseTotalRewards += rewardsPts;
    customerDataMap[custName].totalRewardPoints += rewardsPts;
  }
  console.log(customerDataMap);
  var customersList = Object.keys(customerDataMap)
    .sort()
    .map((customerName, index) => {
      return (
        <div key={index}>
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <h5 className={classes.header}>Customer : {customerName}</h5>
            </Grid>
            <Grid item xs={2}>
              <h5 className={classes.header}>
                Total Rewards :{customerDataMap[customerName].totalRewardPoints}
              </h5>
            </Grid>
          </Grid>
          {Object.keys(customerDataMap[customerName].yearsMap).map(
            (year, yearMapIndex) => {
              return (
                <Grid container spacing={0} key={index + " " + yearMapIndex}>
                  <Grid item xs={12}>
                    <Paper className={classes.yearPaper}>
                      <Grid container spacing={0}>
                        <Grid item xs={9}>
                          <h6 className={classes.headerYear}>Year : {year} </h6>
                        </Grid>
                        <Grid item xs={3}>
                          <h6
                            className={classes.headerYear}
                            style={{ textAlign: "right", padding: "10px" }}
                          >
                            Year Wise Total Rewards :
                            {
                              customerDataMap[customerName].yearsMap[year]
                                .yearWiseTotalRewards
                            }
                          </h6>
                        </Grid>
                      </Grid>
                      <div>
                        <Grid container spacing={0}>
                          <Grid item xs={12}>
                            <TableContainer component={Paper}>
                              <Table stickyHeader className={classes.table}>
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="center">Sl No.</TableCell>
                                    <TableCell align="center">
                                      Monthly
                                    </TableCell>
                                    <TableCell align="center">
                                      Rewards
                                    </TableCell>
                                    <TableCell align="center">Action</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {Object.keys(
                                    customerDataMap[customerName].yearsMap[year]
                                      .monthsMap
                                  ).map((month, indexMonths) => {
                                    return (
                                      <TableRow key={indexMonths}>
                                        <TableCell align="center">
                                          {indexMonths + 1}
                                        </TableCell>
                                        <TableCell align="center">
                                          {month}
                                        </TableCell>
                                        <TableCell align="center">
                                          {
                                            customerDataMap[customerName]
                                              .yearsMap[year].monthsMap[month]
                                              .monthWiseRewardPoints
                                          }
                                        </TableCell>
                                        <TableCell align="center">
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                              handleClickOpen(
                                                customerDataMap[customerName]
                                                  .yearsMap[year].monthsMap[
                                                  month
                                                ].transactions
                                              );
                                            }}
                                            data-customer={customerName}
                                            data-year={year}
                                            data-month={month}
                                          >
                                            List Transactions
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              );
            }
          )}
          <Dialog onClose={handleClose} open={openDialogue}>
            <table style={{ width: "500px" , borderCollapse:"collapse" , border:"1px solid black" , margin:"10px" }} border="1"  cellPadding="2" >
              <thead>
                  <tr>
                <th>Transaction Date</th>
                <th>Customer Name</th>
                <th>Amount</th>
                <th>Rewards</th>
                </tr>
              </thead>
              <tbody>
                {transactions}
              </tbody>
            </table>
          </Dialog>
        </div>
      );
    });

  return <div>{customersList}</div>;
}

export default MonthWiseRewardsReportView;
