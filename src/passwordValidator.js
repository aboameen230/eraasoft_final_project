const isPasswordValid = (password) => {

    // validation criteria:
    // 1. At least one digit
    // 2. At least one lowercase letter
    // 3. At least one uppercase letter
    // 4. At least one special character
    // 5. Minimum length of 10 characters
    
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/;
    return password.match(passwordRegex);
};

module.exports = isPasswordValid;
