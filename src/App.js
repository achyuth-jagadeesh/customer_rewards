import React from "react";
import "typeface-roboto";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ReceiptIcon from "@material-ui/icons/Receipt";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import "./App.css";

import RecordTransactionView from "./views/RecordTransactionView";
import MonthWiseRewardsReportView from "./views/MonthWiseRewardsReportView";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createLogger } from "redux-logger";

import thunk from "redux-thunk";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducer";

const logger = createLogger();
const store = createStore(allReducers, applyMiddleware(thunk, logger));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "99%",
    flexGrow: 1,
    marginBottom: "20px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: "500px",
    maxHeight: "550px",
    overFlow: "auto",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Provider store={store}>
        <div className={classes.root}>
          <Router>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <List component="nav">
                  <ListItem button component={Link} to="/addTransaction">
                    <ListItemIcon>
                      <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText primary="Record Transaction" />
                  </ListItem>
                  <ListItem button component={Link} to="/monthwiserewards">
                    <ListItemIcon>
                      <CardGiftcardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Month Wise Report" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={9}>
                <Paper className={classes.paper}>
                  <Switch>
                    <Route path="/addTransaction">
                      <RecordTransactionView />
                    </Route>
                    <Route path="/monthwiserewards">
                      <MonthWiseRewardsReportView />
                    </Route>
                    <Route exact path="/">
                      <div>
                        <h2>WELCOME TO BILLING & REWARD MANAGEMENT PORTAL</h2>
                      </div>
                    </Route>
                  </Switch>
                </Paper>
              </Grid>
            </Grid>
          </Router>
        </div>
        <Divider />
      </Provider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
