import axios from 'axios';

// --------------------
//     MENU CMS
// --------------------

export const getMenuAdmin = () =>
  new Promise((resolve, reject) => {
    axios
      .get(process.env.API_URL + '/admin-api/menu')
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });

export const postMenuAdmin = data =>
  new Promise((resolve, reject) => {
    axios
      .post(process.env.API_URL + '/admin-api/menu', data)
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });

export const deleteMenuAdmin = id =>
  new Promise((resolve, reject) => {
    axios
      .delete(process.env.API_URL + '/admin-api/menu/' + id)
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });

export const putMenuAdmin = data =>
  new Promise((resolve, reject) => {
    axios
      .put(process.env.API_URL + '/admin-api/menu/' + data.id, data)
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
