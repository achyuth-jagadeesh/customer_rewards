import { combineReducers } from "redux";
import TransactionsReducer from "./TransactionsReducer";

const allReducers = combineReducers({
  transactions:TransactionsReducer
});

export default allReducers;
