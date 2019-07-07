import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import App from '../pages/index.js';

describe('With Enzyme', () => {
  it('App shows "Welcome to Next.js!"', () => {
    const app = shallow(<App />);

    expect(app.find('div').text()).toEqual('Welcome to Next.js!');
  });
});

// describe('With Snapshot Testing', () => {
//   it('App shows "Hello world!"', () => {
//     const component = renderer.create(<App />)
//     const tree = component.toJSON()
//     expect(tree).toMatchSnapshot()
//   })
// })
