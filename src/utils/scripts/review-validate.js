export const reviewValidate = (review) => {
  if (review.length < 10) {
    return { isValid: false, errorMessage: "ביקורת חייבת להכיל 10 תוויים לפחות" };
  }
  // All validations passed
  return {
    isValid: true,
    message: "הביקורת עלתה בהצלחה",
  };
};
