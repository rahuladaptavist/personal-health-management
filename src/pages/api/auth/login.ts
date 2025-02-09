import { NextApiRequest, NextApiResponse } from "next";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { cookies } from "next/headers";

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const { email, password } = req.body;

  try {
    const authCommand = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password, // Required to authenticate after signup
      },
    });

    const { AuthenticationResult } = await cognitoClient.send(authCommand);

    if (!AuthenticationResult) {
      return res
        .status(400)
        .json({ error: "Authentication failed after confirmation" });
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", AuthenticationResult.AccessToken!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 3600,
    });

    cookieStore.set("refreshToken", AuthenticationResult.RefreshToken!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 5 * 24 * 60 * 60, // 5 days
    });

    cookieStore.set("expiresIn", AuthenticationResult.ExpiresIn!.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 3600,
    });

    res.json({
      message: "User verified and logged in successfully",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Verification failed" });
  }
}
