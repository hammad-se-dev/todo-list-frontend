import { useState, useCallback, useEffect } from 'react';

export const useFormValidation = (schema, initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [validFields, setValidFields] = useState({});

  // Validate field in real-time
  const validateField = useCallback(async (name, value) => {
    try {
      await schema.validateAt(name, { ...values, [name]: value });
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
      setValidFields(prev => ({
        ...prev,
        [name]: true
      }));
      return true;
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error.message
      }));
      setValidFields(prev => ({
        ...prev,
        [name]: false
      }));
      return false;
    }
  }, [schema, values]);

  // Handle input changes with real-time validation
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear valid state when user starts typing
    if (validFields[name]) {
      setValidFields(prev => ({
        ...prev,
        [name]: false
      }));
    }

    // Validate field after a short delay (debounce)
    const timeoutId = setTimeout(() => {
      if (touched[name]) {
        validateField(name, value);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [errors, validFields, touched, validateField]);

  // Handle input blur (touched) with immediate validation
  const handleBlur = useCallback(async (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field immediately on blur
    await validateField(name, value);
  }, [validateField]);

  // Validate all fields
  const validateForm = useCallback(async () => {
    try {
      await schema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      error.inner.forEach(err => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  }, [schema, values]);

  // Handle form submission
  const handleSubmit = useCallback(async (onSubmit) => {
    const isValid = await validateForm();
    if (isValid) {
      onSubmit(values);
    }
  }, [validateForm, values]);

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setValidFields({});
  }, [initialValues]);

  // Set form values
  const setFormValues = useCallback((newValues) => {
    setValues(newValues);
  }, []);

  // Get field props for easy use in inputs
  const getFieldProps = useCallback((name) => ({
    name,
    value: values[name] || '',
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] && errors[name],
    touched: touched[name],
    isValid: validFields[name]
  }), [values, handleChange, handleBlur, errors, touched, validFields]);

  return {
    values,
    errors,
    touched,
    validFields,
    handleChange,
    handleBlur,
    validateField,
    validateForm,
    handleSubmit,
    resetForm,
    setFormValues,
    getFieldProps
  };
};
