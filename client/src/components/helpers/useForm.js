import { useState, useEffect } from "react";

const useForm = (callback, validate, validationError) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      // Submitting flag is turned off immediately to prevent multiple requests
      setIsSubmitting(false);

      // Callback is activated and uniqueness is ensured by signup validationError
      callback().then(() => {
        if(validationError != null) {
          if(validationError.notUnique) {
            setErrors(() => ({
              [validationError.field]: validationError.field + " already in use"
            }));
          }
        }
      }
      );
    }

  }, [errors, isSubmitting, callback, validationError]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
