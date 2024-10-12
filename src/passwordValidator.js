const isPasswordValid = (password) => {    
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/;
    return password.match(passwordRegex);
};

module.exports = isPasswordValid;
