export const getCustomer = (customerId, customers) => {
  const customer = customers.filter((element) => element.id === customerId)[0];
  return customer;
};

export const getCustomers = (channelId, customers) => {
  const records = customers.filter((element) => element.channelId === channelId);
  return records;
};

export const searchCustomers = (searchKey, customers) => {
  const dCustomers = customers.filter((customer) => customer.name.toLowerCase().includes(searchKey.toLowerCase()));
  return dCustomers;
};
