import React from 'react';
import { shallow } from 'enzyme';
import Radios from '../src/index';
import '../src/main.scss';

it('renders', () => {
    const wrapper = shallow(<Radios />);
    expect(wrapper.find('.Radios').length).toBe(1);
});
