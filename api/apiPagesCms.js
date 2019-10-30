import axios from 'axios';

// --------------------
//     PAGES CMS
// --------------------

export const getPagesAdmin = () =>
  new Promise((resolve, reject) => {
    axios
      .get(process.env.API_URL + '/admin-api/pages')
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });

export const getPageAdmin = id =>
  new Promise((resolve, reject) => {
    axios
      .get(process.env.API_URL + '/admin-api/page', {
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

export const postPageAdmin = data =>
  new Promise((resolve, reject) => {
    axios
      .post(process.env.API_URL + '/admin-api/page', {
        ...data
      })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });

export const putPageAdmin = data =>
  new Promise((resolve, reject) => {
    axios
      .put(process.env.API_URL + '/admin-api/page', {
        ...data
      })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });

export const deletePageAdmin = id =>
  new Promise((resolve, reject) => {
    axios
      .delete(process.env.API_URL + `/admin-api/page?id=${id}`)
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });