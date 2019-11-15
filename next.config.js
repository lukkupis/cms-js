const path = require('path');
const withSass = require('@zeit/next-sass');

const prod = process.env.NODE_ENV === 'production';

module.exports = withSass({
  useFileSystemPublicRoutes: false,
  env: {
    TEST: process.env.TEST,
    API_URL: prod ? 'https://api.example.com' : 'http://localhost:3000'
  }
});
