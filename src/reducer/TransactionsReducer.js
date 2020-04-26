const defaultCustData = [
  {
    custid: 1,
    custName: "John",
    amount: 120,
    transactionDt: new Date("02-01-2020"),
  },
  {
    custid: 1,
    custName: "John",
    amount: 200,
    transactionDt: new Date("02-03-2020"),
  },
  {
    custid: 1,
    custName: "John",
    amount: 150,
    transactionDt: new Date("03-02-2019"),
  },
  {
    custid: 1,
    custName: "John",
    amount: 90,
    transactionDt: new Date("03-01-2020"),
  },
  {
    custid: 1,
    custName: "John",
    amount: 65,
    transactionDt: new Date("03-06-2020"),
  },
  {
    custid: 1,
    custName: "John",
    amount: 200,
    transactionDt: new Date("04-05-2020"),
  },
  {
    custid: 1,
    custName: "John",
    amount: 121,
    transactionDt: new Date("02-15-2020"),
  },
  {
    custid: 1,
    custName: "John",
    amount: 250,
    transactionDt: new Date("02-12-2020"),
  },
  {
    custid: 1,
    custName: "John",
    amount: 224,
    transactionDt: new Date("03-04-2020"),
  },
  {
    custid: 2,
    custName: "Ravi",
    amount: 125,
    transactionDt: new Date("06-01-2020"),
  },
  {
    custid: 2,
    custName: "Ravi",
    amount: 751,
    transactionDt: new Date("05-01-2020"),
  },
  {
    custid: 2,
    custName: "Ravi",
    amount: 101,
    transactionDt: new Date("03-01-2020"),
  },
  {
    custid: 2,
    custName: "Ravi",
    amount: 752,
    transactionDt: new Date("02-01-2020"),
  },
  {
    custid: 2,
    custName: "Ravi",
    amount: 200,
    transactionDt: new Date("01-05-2020"),
  },
  {
    custid: 2,
    custName: "Ravi",
    amount: 224,
    transactionDt: new Date("02-05-2020"),
  },
  {
    custid: 3,
    custName: "Json",
    amount: 453,
    transactionDt: new Date("01-01-2020"),
  },
  {
    custid: 3,
    custName: "Json",
    amount: 110,
    transactionDt: new Date("02-01-2020"),
  },
  {
    custid: 3,
    custName: "Json",
    amount: 200,
    transactionDt: new Date("03-01-2020"),
  },
  {
    custid: 3,
    custName: "Json",
    amount: 350,
    transactionDt: new Date("04-01-2020"),
  },
];

function TransactionsReducer(currentState = defaultCustData, action) {
  var newState = [...currentState];

  switch (action.type) {
    case "CREATE_TRANSACTION":
      var newRecord = {
        custid: getCustId(action.payLoad.custName),
        custName: action.payLoad.custName,
        amount: parseFloat(action.payLoad.amount),
        transactionDt: action.payLoad.transactionDt,
      };
      newState.push(newRecord);
      return newState;
    default:
      return currentState;
  }
}

function getCustId(custName) {
  debugger;
  var cust = defaultCustData.find((cust) => {
    return cust.custName == custName;
  });
  let custID = !!cust
    ? cust.custid
    : 1 +
      Math.max.apply(
        null,
        defaultCustData.map((cust) => cust.custid)
      );
  return custID;
}

export default TransactionsReducer;
