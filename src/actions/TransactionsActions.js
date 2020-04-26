const recordTransaction = function (transaction) {
  return {
    type: "CREATE_TRANSACTION",
    payLoad: transaction,
  };
};

export { recordTransaction };
