import usersValidation from "../database/validation/users.js";

const validation = (userData) => {
  let validationErrors = {};

  for (const key in userData) {
    if (Object.prototype.hasOwnProperty.call(usersValidation, key)) {
      const regex = usersValidation[key]; // Access the RegExp object directly
      const inputValue = userData[key]; // Get the corresponding input value

      if (inputValue !== undefined && !regex.test(inputValue)) {
        validationErrors[key] = `Invalid ${key} format.`;
        console.log(validationErrors[key]);
      }
    }
  }
  return validationErrors;
};

export default validation;
