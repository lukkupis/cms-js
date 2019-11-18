const withSass = require('@zeit/next-sass');
const config = require('./server/config');

const prod = process.env.NODE_ENV === 'production';

module.exports = withSass({
  useFileSystemPublicRoutes: false,
  env: {
    TEST: process.env.TEST,
    API_URL: prod ? config.prodDomain : 'http://localhost:3000'
  }
});
