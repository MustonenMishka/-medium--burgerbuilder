import React from 'react';

import classes from './MenuIcon.css';

const menuIcon = (props) => (
    <div className={classes.MenuIcon} onClick={props.clicked}>
        <div></div>
    </div>
);

export default menuIcon;