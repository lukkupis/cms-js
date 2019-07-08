import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Header from './Header';

describe('<Header />', () => {
  it('Collapse is open after NavbarToggler click', () => {
    const wrapper = shallow(<Header />);

    wrapper.find('NavbarToggler').simulate('click');
    expect(wrapper.find('Collapse').props()).to.have.property('isOpen', true);
  });
});
