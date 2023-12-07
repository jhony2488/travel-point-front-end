import * as yup from 'yup'

export const schemaUser = yup.object().shape({
  name: yup.string().required('Name Required'),
  email: yup.string().email().required('Email Required'),
  password: yup.string().min(8).max(32).required('Password Required'),
})
