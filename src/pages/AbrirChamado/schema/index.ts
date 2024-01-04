import * as yup from 'yup'
export const createHelpDeskSchema = yup
  .object()
  .shape({
    title: yup.string().required().min(3).max(1500),
    category: yup.string().required(),
    description: yup.string().min(3).max(5000).required(),
  })
  .required()
