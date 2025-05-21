import * as Yup from 'yup';

export const initialValues = () => ({
  documentType: 'cc',
  documentNumber: '',
  fullName: '',
  address: '',
  phone: '',
  email: '',
  birthDate: '',
  password: '',
  confirmPassword: '',
  taxpayerType: '',
  activityType: '',
  roleId: ''
});

export const validationSchema = () => Yup.object({
  documentType: Yup.string().required('El tipo de documento es requerido'),
  documentNumber: Yup.string()
    .required('El número de documento es requerido')
    .matches(/^[0-9]+$/, 'Solo se permiten números'),
  fullName: Yup.string()
    .required('El nombre completo es requerido')
    .min(5, 'Mínimo 5 caracteres'),
  address: Yup.string().required('La dirección es requerida'),
  phone: Yup.string()
    .required('El teléfono es requerido')
    .matches(/^[0-9]+$/, 'Solo se permiten números'),
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  birthDate: Yup.string().required('La fecha de nacimiento es requerida'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .when('$isEdit', {
      is: (isEdit: boolean) => !isEdit,
      then: (schema) => schema.required('La contraseña es requerida'),
      otherwise: (schema) => schema
    }),
  taxpayerType: Yup.string().required('El tipo de contribuyente es requerido'),
  activityType: Yup.string().required('El tipo de actividad es requerido'),
  roleId: Yup.string().required('El rol es requerido')
});