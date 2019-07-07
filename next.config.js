const path = require('path');

module.exports = {
  useFileSystemPublicRoutes: false,
  webpack(config, options) {
    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['reducers'] = path.join(__dirname, 'reducers');
    config.resolve.alias['actions'] = path.join(__dirname, 'actions');
    config.resolve.alias['store'] = path.join(__dirname, 'store');
    config.resolve.alias['assets'] = path.join(__dirname, 'assets');
    config.resolve.alias['templates'] = path.join(__dirname, 'templates');
    config.resolve.alias['theme'] = path.join(__dirname, 'theme');
    return config;
  }
};
