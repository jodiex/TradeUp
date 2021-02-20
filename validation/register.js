const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateRegistration(data) {
    let errors = {};
    // Convert empty fields to an empty string
    data.name = !isEmpty(data.name) ? data.name : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    } else if (!Validator.isLength(data.name, { min: 0, max: 22 })) {
        errors.name = "Name must be at most 22 characters"
    }
    // Username checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    } else if (!Validator.isLength(data.username, { min: 0, max: 25 })) {
        errors.username = "Username must be at most 25 characters"
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be between 6-30 characters";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    } else if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
