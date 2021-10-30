import { firestore } from '../../firebase/firebase.utils';

export const fetchOrganizations = async () => {
  return new Promise((resolve, reject) => {
    const organizationRef = firestore.collection('organizations');
    organizationRef
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log('No organizations');
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
