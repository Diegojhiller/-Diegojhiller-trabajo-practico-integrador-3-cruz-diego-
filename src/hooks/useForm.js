import { useState } from 'react';

export const useForm = (initialForm = {}) => {
  
    // 1. Aquí guardamos el estado del formulario (lo que escribe el usuario)
    const [formState, setFormState] = useState(initialForm);

    // 2. Función que se ejecuta cada vez que el usuario escribe en un input
    const onInputChange = ({ target }) => {
        const { name, value, type, checked } = target;

        setFormState({
            ...formState,
            // Si es un checkbox usamos 'checked', si es texto usamos 'value'
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // 3. Función para limpiar el formulario y volver al estado inicial
    const onResetForm = () => {
        setFormState(initialForm);
    };

    // 4. Retornamos todo lo que necesitan los componentes
    return {
        ...formState, // Retornamos las propiedades desestructuradas (username, email, etc.)
        formState,    // Retornamos el objeto completo por si acaso
        onInputChange,
        onResetForm,
    };
};