import axios from 'axios';

// --------------------
//     PAGE DATA
// --------------------

export const getPageData = slug =>
  new Promise((resolve, reject) => {
    axios
      .get(process.env.API_URL + '/api/page-data/' + slug)
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
