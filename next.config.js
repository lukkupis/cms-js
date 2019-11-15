const path = require('path');
const withSass = require('@zeit/next-sass');

const prod = process.env.NODE_ENV === 'production';

module.exports = withSass({
  useFileSystemPublicRoutes: false,
  env: {
    TEST: process.env.TEST,
    API_URL: prod ? 'https://api.example.com' : 'http://localhost:3000'
  },
  webpack(config, options) {
    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['reducers'] = path.join(__dirname, 'reducers');
    config.resolve.alias['actions'] = path.join(__dirname, 'actions');
    config.resolve.alias['store'] = path.join(__dirname, 'store');
    config.resolve.alias['assets'] = path.join(__dirname, 'assets');
    config.resolve.alias['templates'] = path.join(__dirname, 'templates');
    config.resolve.alias['theme'] = path.join(__dirname, 'theme');
    config.resolve.alias['helpers'] = path.join(__dirname, 'helpers');
    config.resolve.alias['api'] = path.join(__dirname, 'api');
    return config;
  }
});
