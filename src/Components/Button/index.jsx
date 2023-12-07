/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-semi */
/* eslint-disable react/prop-types */
import React from 'react';
import {
    Button
} from '@material-ui/core';


export default function ButtonComponent({ onClick, color,variant, children, ...rest }) {

    return (
        <Button variant={variant==='' ?  "text" :  variant} onClick={onClick} color={color} {...rest} >
            {children}
        </Button>
    );
};
