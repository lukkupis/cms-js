import axios from 'axios';

export const getPages = Router =>
  new Promise((resolve, reject) => {
    axios
      .get(process.env.API_URL + '/api/pages')
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
