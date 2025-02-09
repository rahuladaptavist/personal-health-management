import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { ISchemaFormLogin, ISchemaFormSignup } from "../validation";
import { auth } from "@/util";
import { useToast } from "./useToast";

export const useAuth = () => {
  const { showToast } = useToast();
  const router = useRouter();

  const awsLogin = useCallback(
    async (data: ISchemaFormLogin) => {
      const userCheckRs = await auth.login(data);

      if (userCheckRs.exists && !userCheckRs.verified) {
        await auth.resendVerificationCode(data.email);
        showToast("Your account is not verified. Please verify it first.", {
          type: "error",
        });
        // Set data in session storage to be used in verify screen to make login request
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("password", data.password);
        router.push("/verify");
      }

      return userCheckRs;
    },
    [router, showToast]
  );

  const awsSignup = useCallback(
    async (data: ISchemaFormSignup) => {
      const { UserConfirmed } = await auth.signup(data);
      const message = UserConfirmed
        ? "Your account was created, successfully."
        : "Account created, please verify your account.";
      if (!UserConfirmed) {
        // Set data in session storage to be used in verify screen to make login request
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("password", data.password);
        router.push("/verify");
      }
      showToast(message, { type: "success" });
    },
    [router, showToast]
  );

  return { awsLogin, awsSignup };
};
