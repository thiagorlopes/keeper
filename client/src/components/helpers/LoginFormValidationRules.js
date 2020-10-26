function validate(values) {
    let errors = {};

    if(!values.username) {
        errors.username = "Username is required";
    } else if(values.username.length < 6) {
        errors.username = "Username must be 6 or more characters";
    }

    if(!values.email) {
        errors.email = "Email address is required";
    } else if(!/\S+@\S+\.\S/.test(values.email)) {
        errors.email = "Email address is invalid";
    }

    if (!values.password1) {
        errors.password = "Password is required";
    } else if (values.password1.length < 8) {
        errors.password = "Password must be 8 or more characters";
    } else if(values.password1 !== values.password2) {
        errors.password = "Passwords must match"
    }

    return errors;
};

export default validate;