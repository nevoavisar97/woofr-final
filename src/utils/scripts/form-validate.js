export const signupValidator = (formData) => {
  // Validation for first name
  if (formData.firstName.length < 2) {
    return { isValid: false, errorMessage: "שם פרטי חייב להיות לפחות 2 תווים" };
  }

  // Validation for last name
  if (formData.lastName.length < 2) {
    return {
      isValid: false,
      errorMessage: "שם משפחה חייב להיות לפחות 2 תווים",
    };
  }

  // Validation for email format
  if (!validateEmail(formData.email)) {
    return { isValid: false, errorMessage: "אנא הקפד על פורמט איימל תקין" };
  }

  // Validation for password confirmation
  if (formData.password !== formData.confirm) {
    return { isValid: false, errorMessage: "אימות הסיסמא לא תקין" };
  }

  // Validation for password strength
  if (!validatePassword(formData.password)) {
    return {
      isValid: false,
      errorMessage: "סיסמא צריכה להכיל 8 תווים, אות גדולה ואות קטנה",
    };
  }

  // Validation for birthday
  if (!validateBirthday(formData.birthday)) {
    return {
      isValid: false,
      errorMessage: "חייב להיות לפחות בן 8 בשביל להירשם",
    };
  }

  // Validation for gender
  if (!formData.gender) {
    return { isValid: false, errorMessage: "יש לבחור מין" };
  }

  // All validations passed
  return {
    isValid: true,
    message: "כמה שניות ותהיה חלק מאיתנו",
  };
};

const validateEmail = (email) => {
  // Regular expression for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email matches the regular expression
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Regular expressions for validating password criteria
  const lengthRegex = /.{8,}/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /\d/;

  // Check if password meets all criteria
  const isLengthValid = lengthRegex.test(password);
  const hasUppercase = uppercaseRegex.test(password);
  const hasLowercase = lowercaseRegex.test(password);
  const hasDigit = digitRegex.test(password);

  return isLengthValid && hasUppercase && hasLowercase && hasDigit;
};

const validateBirthday = (birthday) => {
  // Check if birthday is null or undefined
  if (!birthday) {
    return false; // Birthday value is null or undefined
  }

  // Calculate current date
  const currentDate = new Date();

  // Calculate the minimum date to be older than 8 years
  const minDate = new Date(
    currentDate.getFullYear() - 8,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  // Convert birthday string to a Date object
  const birthdayDate = new Date(birthday);

  // Check if the person is older than 8 years
  if (birthdayDate < minDate) {
    return true;
  } else {
    return false;
  }
};
