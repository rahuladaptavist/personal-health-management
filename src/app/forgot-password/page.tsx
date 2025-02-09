"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth, useToast } from "@/helpers/hooks";
import { Button, Input } from "@/components";
import {
  ISchemaFormForgotPassword,
  SchemaFormForgotPassword,
} from "@/helpers/validation";
import { AppConstant } from "@/helpers/constants";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchemaFormForgotPassword>({
    resolver: zodResolver(SchemaFormForgotPassword),
  });

  const { showToast } = useToast();
  const { awsLogin } = useAuth();

  const onSubmit = async (data: ISchemaFormForgotPassword) => {
    setLoading(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showToast(`Error: ${error.message || "Signup failed"}`, {
        type: "error",
      });
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
              Reset your password
            </h1>
            <p className="text-sm font-light text-gray-500 dark:text-gray-300">
              We&apos;ll email you a verification code to reset your password.
            </p>
            <form
              className="mt-4 space-y-6 sm:mt-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid">
                <Input
                  id="email"
                  inputProps={{
                    type: "email",
                    placeholder: "name@company.com",
                    ...register("email"),
                  }}
                  label="Email"
                  errorMessage={errors.email?.message}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    I agree to Zenvy{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                    >
                      Terms of Use
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>
              </div>
              <Button
                title="Reset my password"
                type="submit"
                loading={loading}
              />
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
