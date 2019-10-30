import axios from 'axios';

// --------------------
//     USERS CMS
// --------------------

export const getUsersAdmin = () =>
  new Promise((resolve, reject) => {
    axios
      .get(process.env.API_URL + '/admin-api/users')
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });

export const getUserAdmin = id =>
  new Promise((resolve, reject) => {
    axios
      .get(process.env.API_URL + '/admin-api/user', {
        params: {
          id
        }
      })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });

export const postUserAdmin = data =>
  new Promise((resolve, reject) => {
    axios
      .post(process.env.API_URL + '/admin-api/user', {
        ...data
      })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });

export const putUserAdmin = data =>
  new Promise((resolve, reject) => {
    axios
      .put(process.env.API_URL + '/admin-api/user', {
        ...data
      })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });

export const deleteUserAdmin = id =>
  new Promise((resolve, reject) => {
    axios
      .delete(process.env.API_URL + `/admin-api/user?id=${id}`)
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
