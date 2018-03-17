import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toEqual(1);
  });

  it('has an initial state of { count: 0 }', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state()).toEqual({ count: 0 });
    expect(wrapper.state('count')).toEqual(0);
  });

  describe('button activity', () => {
    it('button clicks add one', () => {
      const wrapper = mount(<App />);
      const clickNTimes = (_n) => {
        for (let n = _n; n > 0; n--) {
          wrapper.find('#button').simulate('click');
        }
      }

      clickNTimes(11);
      expect(wrapper.state('count')).toEqual(16.5);
    });
  });
});
