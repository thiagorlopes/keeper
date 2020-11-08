import { useState, useEffect } from "react";

const useForm = (callback, validate, validationError) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback().then(() => {
        if(validationError.notUnique) {
          setErrors(() => ({
            [validationError.field]: validationError.field + " already in use"
          }));
          setIsSubmitting(false);
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
