# CMS-JS
Simple CMS with browser-side and server-side rendering.

## Features:
- user authentication
- add/edit pages
- user management
- edit menu

## Future features:
- categories
- WYSIWYG Editor
- page templates

## Built with:
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

## Demo:
http://cmsjs.lukkupis.pl/login

login: **demo**

pass: **cmsdemo**

## Installation:

For proper operation, the configuration file is required: "server/config.js". 

Example:

```js
module.exports = {
  db:
    'mongodb://<login>:<password>@<domain>:<port>/<dbName>',
  keySession: ['randomKey1', 'randomKey2'],
  maxAgeSession: 24 * 60 * 60 * 1000,
  prodDomain: 'http://example.com',
  demoMode: false //In demo mode, you can not edit user "demo", and "Admin" page is visible in the menu.
};
```
