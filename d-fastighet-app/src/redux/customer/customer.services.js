import { firestore } from '../../firebase/firebase.utils';

export const fetchCustomers = async (orgId) => {
  return new Promise((resolve, reject) => {
    const customerRef = firestore.collection('customers');
    customerRef
      .where('orgId', '==', orgId)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log('No customers');
          resolve([]);
        }
        let tempList = [];
        snapshot.forEach((doc) => {
          const record = doc.data();
          tempList.push(record);
        });
        resolve(tempList);
      })
      .catch((err) => {
        console.log('Error getting document:', err);
        reject(err);
      });
  });
};
