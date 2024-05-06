export const petValidator = (formData) => {
  // Validation for first name
  if (formData.name.length < 2) {
    return { isValid: false, errorMessage: "שם  חייב להיות לפחות 2 תווים" };
  }

  if(formData.birthYear < 1950 || formData.birthYear>2024) {
    return { isValid: false, errorMessage: "שנת הלידה חייבת להיות מספר בין 1950 לשנה הנוכחית" };

  }


  // All validations passed
  return {
    isValid: true,
    message: "כמה שניות ותהיה חלק מאיתנו",
  };
};
