import * as Yup from 'yup';

export const initialValues = () => ({
  nombre: '',
  descripcion: '',
  tarifa: 0,
  periodicidad: 'MENSUAL' // Valor por defecto
});

export const validationSchema = () => Yup.object({
  nombre: Yup.string()
    .required('El nombre es requerido')
    .max(100, 'Máximo 100 caracteres'),
  descripcion: Yup.string()
    .max(255, 'Máximo 255 caracteres'),
  tarifa: Yup.number()
    .required('La tarifa es requerida')
    .min(0, 'La tarifa no puede ser negativa'),
  periodicidad: Yup.string()
    .required('La periodicidad es requerida')
    .oneOf(['MENSUAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL'], 'Periodicidad no válida')
});