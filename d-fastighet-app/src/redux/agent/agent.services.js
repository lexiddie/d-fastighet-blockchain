import { firestore } from '../../firebase/firebase.utils';

export const fetchAgents = async (orgId) => {
  return new Promise((resolve, reject) => {
    const agentRef = firestore.collection('agents');
    agentRef
      .where('orgId', '==', orgId)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log('No agents');
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
