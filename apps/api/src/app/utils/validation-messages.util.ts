export const getMaxLengthMessage = (maxLength: number, fieldName: string) => {
  return `${fieldName} cannot exceed ${maxLength} characters.`;
};

export const getMinLengthMessage = (minLength: number, fieldName: string) => {
  return `${fieldName} cannot be shorter than ${minLength} characters.`;
};

export const getIsStringMessage = (fieldName: string) => {
  return `${fieldName} must be text.`;
};

export const getIsRequiredMessage = (fieldName: string) => {
  return `${fieldName} is required.`;
};

export const getInvalidEmailMessage = () => {
  return `Invalid e-mail format.`;
};
