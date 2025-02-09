export const AppConstant = {
  NAME: "Zenvy",
  PUBLIC_COGNITO_REGION: process.env.NEXT_PUBLIC_COGNITO_REGION || "",
  PUBLIC_COGNITO_CLIENT_ID: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "",
  COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID || "",
};
