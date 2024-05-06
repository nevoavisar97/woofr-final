export const professionalValidate = (form) => {
  if (form.displayName.length < 2) {
    return { isValid: false, errorMessage: "שם עסק חייב להכין 2 תוויים לפחות" };
  }

  if (form.type.length < 3) {
    return { isValid: false, errorMessage: "חייב לבחור תחום שירות" };
  }

  if (form.City.length < 3) {
    return { isValid: false, errorMessage: "עיר חייבת להחיל לפחות 3 תווים" };
  }

  if (form.address.length < 3) {
    return { isValid: false, errorMessage: "כתובת חייבת להכיל לפחות 3 תוווים" };
  }

  // Validation for email format
  if (!phoneValidate(form.phone)) {
    return { isValid: false, errorMessage: "אנא הקפד על פורמט טלפון תקין" };
  }

  if (form.description.length < 3) {
    return { isValid: false, errorMessage: "תיאור חייב להכיל לפחות 3 תווים" };
  }

  // All validations passed
  return {
    isValid: isValid,
    message: "כמה שניות ותהיה חלק מאיתנו",
  };
};

const phoneValidate = (phoneNumber) => {
  // Regular expression to match Israeli phone numbers without country code
  const israeliPhoneRegex = /^(05\d|05\d-\d)(\-)?(\d{7})$/;

  // Remove non-digit characters from the phone number
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

  // Check if the cleaned phone number matches the Israeli phone number regex
  return israeliPhoneRegex.test(cleanedPhoneNumber);
};
