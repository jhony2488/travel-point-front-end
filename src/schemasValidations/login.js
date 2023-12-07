import * as yup from 'yup';

export const schemaLogin = yup.object().shape({
  email: yup.string().email().required('Email Required'),
  password: yup.string().min(8).max(32).required('Password Required'),
});