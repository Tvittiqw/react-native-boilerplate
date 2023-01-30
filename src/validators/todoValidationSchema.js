import * as Yup from 'yup';

const todoValidationSchema = Yup.object({
  text: Yup.string()
    .required('Todo is required!')
    .min(2, 'Enter 2 characters at least'),
});

export default todoValidationSchema;
