import { AppConstant } from "@/helpers/constants";
import { ISchemaFormLogin, ISchemaFormSignup } from "@/helpers/validation";
import {
  AuthenticationResultType,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ResendConfirmationCodeCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
  region: AppConstant.PUBLIC_COGNITO_REGION,
});

interface IAuthCheck {
  exists: boolean;
  verified?: boolean;
  authResult?: AuthenticationResultType;
}

export const auth = {
  login: async ({ email, password }: ISchemaFormLogin): Promise<IAuthCheck> => {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: AppConstant.PUBLIC_COGNITO_CLIENT_ID,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      });

      const { AuthenticationResult } = await cognitoClient.send(command);

      return { exists: true, verified: true, authResult: AuthenticationResult };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.name === "UserNotFoundException" ||
        error.name === "NotAuthorizedException"
      ) {
        return { exists: false };
      } else if (error.name === "UserNotConfirmedException") {
        return { exists: true, verified: false };
      }
      throw error;
    }
  },
  signup: async ({
    email,
    firstName,
    lastName,
    password,
  }: ISchemaFormSignup) => {
    try {
      const command = new SignUpCommand({
        ClientId: AppConstant.PUBLIC_COGNITO_CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [
          { Name: "given_name", Value: firstName },
          { Name: "family_name", Value: lastName },
          { Name: "name", Value: `${firstName} ${lastName}` },
          { Name: "email", Value: email },
        ],
      });
      return await cognitoClient.send(command);
    } catch (error) {
      throw error;
    }
  },
  signupVerify: async (email: string, verificationCode: string) => {
    try {
      const command = new ConfirmSignUpCommand({
        ClientId: AppConstant.PUBLIC_COGNITO_CLIENT_ID,
        Username: email,
        ConfirmationCode: verificationCode,
      });
      return await cognitoClient.send(command);
    } catch (error) {
      throw error;
    }
  },
  resendVerificationCode: async (email: string) => {
    try {
      const command = new ResendConfirmationCodeCommand({
        ClientId: AppConstant.PUBLIC_COGNITO_CLIENT_ID,
        Username: email,
      });
      return await cognitoClient.send(command);
    } catch (error) {
      throw error;
    }
  },
};
