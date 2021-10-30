export const getTransaction = (transactionId, transactions) => {
  const transaction = transactions.filter((element) => element.id === transactionId)[0];
  return transaction;
};

export const getTransactions = (channelId, transactions) => {
  const records = transactions.filter((element) => element.channelId === channelId);
  return records;
};

export const searchTransactions = (searchKey, transactions) => {
  const dTransactions = transactions.filter((transaction) => transaction.name.toLowerCase().includes(searchKey.toLowerCase()));
  return dTransactions;
};

export const checkActiveProperty = (propId, properties) => {
  return properties.some((item) => item.previousId === propId);
};

export const cleanPublicTransaction = (transactions) => {
  return transactions.map((element) => {
    const record = {
      ...element.Record,
      channel: 0
    };
    return record;
  });
};

export const cleanPrivateTransaction = (transactions) => {
  return transactions.map((element) => {
    const record = {
      ...element.Record,
      channel: 1
    };
    return record;
  });
};
