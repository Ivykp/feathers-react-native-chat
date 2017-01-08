/**
 * General utility functions
 */

const validateEmail = (email) => {
  const regexp = /^[A-Za-z0-9]+[a-zA-Z_.-]*@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
  return regexp.test(email);
};

// TODO: Add more robust validation
const validatePassword = password => password.length > 0;

export default { validateEmail, validatePassword };
