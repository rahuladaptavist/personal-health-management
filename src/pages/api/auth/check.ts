import { NextApiRequest, NextApiResponse } from "next";
import {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { AppConstant } from "@/helpers/constants";

const cognitoClient = new CognitoIdentityProviderClient({
  region: AppConstant.PUBLIC_COGNITO_REGION,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const { email } = req.body;

  try {
    const command = new AdminGetUserCommand({
      UserPoolId: AppConstant.COGNITO_USER_POOL_ID,
      Username: email,
    });

    const user = await cognitoClient.send(command);

    // Check if the user is verified
    // const emailVerified =
    //   user.UserAttributes?.find((attr) => attr.Name === "email_verified")
    //     ?.Value === "true";
    const emailVerified = user.UserStatus === "CONFIRMED";

    return res.json({ exists: true, verified: emailVerified });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === "UserNotFoundException") {
      return res.json({ exists: false });
    }
    return res
      .status(500)
      .json({ error: error.message || "Something went wrong" });
  }
}
