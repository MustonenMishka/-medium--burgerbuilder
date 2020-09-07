import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuIcon from '../SideDrawer/MenuIcon/MenuIcon';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <MenuIcon clicked={props.menuClick}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;