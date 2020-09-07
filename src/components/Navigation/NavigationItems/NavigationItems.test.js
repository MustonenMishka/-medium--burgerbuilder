import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter});

describe('NavItems', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>)
    });

    it('should render 2 NavItem elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 NavItem elements if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render Logout element if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});