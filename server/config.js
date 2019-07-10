module.exports = {
  db:
    'mongodb+srv://user:password@cluster0-ijwg9.mongodb.net/test?retryWrites=true&w=majority',
  keySession: ['key', 'key'],
  maxAgeSession: 24 * 60 * 60 * 1000,
  login: 'user',
  password: 'pass'
};
