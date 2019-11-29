# CMS-JS
Simple CMS with browser-side and server-side rendering.

## Demo
http://cmsjs.lukkupis.pl/login

login: **demo**

pass: **cmsdemo**

## Features
- user authentication
- add/edit pages
- WYSIWYG Editor
- user management
- edit menu

## Future features
- advanced editor
- categories
- page templates

## Built with
- React
- Redux
- Next.js
- Express.js
- MongoDB (Mongoose)
- formik
- Reactstrap
- styled-components
- Atomic Design
- Sass

## Installation

### Configuration file

A configuration file is required for proper operation: ***server/config.js***. 

Example ***config.js***:

```js
module.exports = {
  db: 'mongodb://<login>:<password>@<domain>:<port>/<dbName>',
  keySession: ['randomKey1', 'randomKey2'],
  maxAgeSession: 24 * 60 * 60 * 1000,
  prodDomain: 'http://example.com',
  demoMode: false //In demo mode, you can not edit user "demo", and "Admin" page is visible in the menu.
};
```

## Documentation

### Users

#### Default user:

login: ***admin***

pass: ***admin***

Account will stop working after you create a new user with "Administrator" permissions.

#### User roles:

Administrator - all permissions

Users - no user management access
