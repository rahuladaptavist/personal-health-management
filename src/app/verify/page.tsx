"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ISchemaFormVerifyCode,
  SchemaFormVerifyCode,
} from "@/helpers/validation";
import { AppConstant } from "@/helpers/constants";
import { Button, Input } from "@/components";
import { useRouter } from "next/navigation";

export default function VerifyCode() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchemaFormVerifyCode>({
    resolver: zodResolver(SchemaFormVerifyCode),
  });

  useEffect(() => {
    // Check if we have data in session storage
    const sessionEmail = sessionStorage.getItem("email");
    const sessionPassword = sessionStorage.getItem("password");
    if (!sessionEmail || !sessionPassword) {
      // Go back and show message that could not verify
      router.back();
    }
  }, [router]);

  // Sign up function
  const onSubmit = async (data: ISchemaFormVerifyCode) => {
    setLoading(true);

    try {
      // Call Cognito to sign up the user
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-full">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-20 lg:py-16 lg:grid-cols-12">
        <div className="w-full place-self-center lg:col-span-6">
          <div className="p-6 mx-auto bg-white rounded-lg shadow dark:bg-gray-800 sm:max-w-xl sm:p-8">
            <a
              href="#"
              className="inline-flex items-center mb-4 text-xl font-semibold text-gray-900 dark:text-white"
            >
              <img className="w-8 h-8 mr-2" src="/images/logo.png" alt="logo" />
              {AppConstant.NAME}
            </a>
            <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Verify your account
            </h1>
            <p className="text-sm font-light text-gray-500 dark:text-gray-300">
              Start your website in seconds. Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login
              </Link>
              .
            </p>
            <form
              className="mt-4 space-y-6 sm:mt-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid">
                <Input
                  id="code"
                  inputProps={{
                    type: "number",
                    placeholder: "Code sent on your email id",
                    ...register("code"),
                  }}
                  label="Verification code"
                  errorMessage={errors.code?.message}
                />
              </div>

              <Button title="Verify code" type="submit" loading={loading} />
            </form>
          </div>
        </div>
        <div className="mr-auto place-self-center lg:col-span-6">
          <img
            className="hidden mx-auto lg:flex"
            src="/images/illustration.svg"
            alt="illustration"
          />
        </div>
      </div>
    </section>
  );
}
