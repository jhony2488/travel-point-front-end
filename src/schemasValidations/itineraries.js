import * as yup from 'yup';

export const schemaItineraries = yup.object().shape({
  email: yup.string().required('Title Required'),
  password: yup.string().min(8).max(32).required('Insira uma senha válida'),
  title: yup.string().required('Title Required'),
  duration: yup.string().required('Title Required'),
  dataInitial: yup.string().required('Initial Date Required'),
  description: yup.string().required('Description Required'),
});