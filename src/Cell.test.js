import React from 'react';
import Cell, { players } from './Cell';

import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<Cell />', () => {
  it('renders without crashing', () => {
    // const wrapper = shallow(<Cell />);
    // expect(wrapper.length).toEqual(1);
  });

  it('new cell starts empty', () => {
    // const wrapper = mount(<Cell />);
    // expect(wrapper.prop('player')).toEqual(players.NONE);
  });
});
