import axios from 'axios';

const serverUrl = '';

export const getPages = Router =>
  new Promise((resolve, reject) => {
    axios
      .get(serverUrl + 'api/pages')
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        Router.push('/login');
        reject(error);
      });
  });
