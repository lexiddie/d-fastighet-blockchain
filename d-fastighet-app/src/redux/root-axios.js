import axios from 'axios';

let mainUrl = 'http://localhost:8080/api/';

// const instance = axios.create({
//   baseURL: mainUrl,
//   headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
// });

const instance = axios.create({
  baseURL: mainUrl,
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
});

// For Add Instance Options In the Future
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// instance.defaults.headers.post['Content-Type'] = 'application/json';
// instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

// Interceptors Request
instance.interceptors.request.use(
  (request) => {
    // console.log(request);
    // Edit request config
    // const user = localStorage.getItem('user');
    // if (user) {
    //   request.headers['Authorization'] = 'Bearer ' + user.token;
    // }
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// Interceptors Response
instance.interceptors.response.use(
  (response) => {
    // console.log(response);
    // Edit response config
    return response.data;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
