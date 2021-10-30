import axios from '../root-axios';

export const fetchTransactions = async (orgIndex, channel) => {
  // const orgId = 0;
  // const channel = 0;
  return await axios.get(`properties/${orgIndex}?channel=${channel}`);
};
