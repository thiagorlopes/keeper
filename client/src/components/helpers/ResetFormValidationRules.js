function validate(values) {
    let errors = {};

    if (!values.password) {
        errors.password = "Password is required";
    } else if(values.password !== values.password2) {
        errors.password = "Passwords must match"
    }

    return errors;
};

export default validate;
