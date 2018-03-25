import React from 'react';
import Game from './Game';

import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<Game />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.length).toEqual(1);
  });

  describe('game-container', () => {
    it('has 9 blank cells in a grid', () => {
      const wrapper = shallow(<Game />);
      expect(wrapper.find('Cell').length).toEqual(9);
    });
  });
});
