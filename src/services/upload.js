/* eslint-disable no-undef */

import { token, api } from './apiFile';

export const upload = (formData) => {
    console.log(formData);
    return api.post('/upload',formData,{
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
        },
    });
};
