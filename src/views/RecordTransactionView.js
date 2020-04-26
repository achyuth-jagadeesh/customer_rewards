import React from "react";
import { connect } from "react-redux";
import { recordTransaction } from "../actions/TransactionsActions";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/pickers";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

import TransactionHistory from "./TransactionHistory";

class RecordTransactionComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      custName: "",
      amount: 0,
      transactionDt: new Date(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTransDtChange = this.handleTransDtChange.bind(this);
    this.addToTransactionsList = this.addToTransactionsList.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleTransDtChange(moment) {
    this.setState({ transactionDt: moment._d });
  }

  addToTransactionsList(evt) {
    this.props.addToTransactions({ ...this.state });
    this.setState({custName:"",amount:0,transactionDt:new Date()})
  }

  render() {
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <h2>Record a transaction</h2>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <TextField
              name="custName"
              required
              value={this.state.custName}
              label="Customer Name"
              onChange={this.handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={3}>
            <DatePicker
              required
              value={this.state.transactionDt}
              onChange={this.handleTransDtChange}
              label="Transaction Date"
              margin="normal"
              format="MMM-DD-YYYY"
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="standard-adornment-amount">
                Amount
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                value={this.state.amount}
                onChange={this.handleChange}
                name="amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
        >
          <Grid item xs={7}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.addToTransactionsList}
            >
              Save
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <h2>Transaction History</h2>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <TransactionHistory/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapActionsToProps(dispatch) {
  return {
    addToTransactions: function (transaction) {
      dispatch(recordTransaction(transaction));
    },
  };
}

export default connect(
  null,
  mapActionsToProps
)(RecordTransactionComponent);
