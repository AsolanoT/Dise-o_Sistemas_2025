import * as Yup from 'yup';

export interface LoginFormValues {
  email: string;
  password: string;
}

export const initialValues = (): LoginFormValues => ({
  email: '',
  password: '',
});

export const validationSchema = () => 
  Yup.object({
    email: Yup.string()
      .email('Por favor ingresa un correo electrónico válido')
      .required('El correo electrónico es requerido')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'El correo electrónico debe tener un formato válido'
      ),
    password: Yup.string()
      .min(4, 'La contraseña debe tener al menos 4 caracteres')
      .required('La contraseña es requerida'),

  });