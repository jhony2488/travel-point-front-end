import * as yup from 'yup';

export const schemaItineraries = yup.object().shape({
  title: yup.string().required('Title Required'),
  duration: yup.string().required('Title Required'),
  dataInitial: yup.string().required('Initial Date Required'),
  description: yup.string().required('Description Required'),
});