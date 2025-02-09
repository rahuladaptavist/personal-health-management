export const RegexConstant = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&\-+=()!? "]).{8,60}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  codeSixDigits: /^\d{6}$/,
};
