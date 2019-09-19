import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

describe('Test Header component', () => {
  it('should render Header component correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
