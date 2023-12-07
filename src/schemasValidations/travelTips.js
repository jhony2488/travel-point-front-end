import * as yup from 'yup';

export const schemaTravelTips = yup.object().shape({
  title: yup.string().required('Title Required'),
  description: yup.string().required('Description Required'),
});