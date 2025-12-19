import { useLoginFormValidation } from "../helpers/_ValidateLogin";
import CallOutWarning from "../components/complex/CallOutWarning";
import InputField from "../components/complex/InputField";
import { Link, useNavigate } from "react-router-dom";
// import type { User } from "../class/auth";
import { useState } from "react";
import { UseAuth } from "../Auth/AuthContext";
import type { LoginValidationErrors } from "../class/LoginForm";

export default function Login() {
  const { form, errors, handleChange, isValid } = useLoginFormValidation();
  const navigate = useNavigate();
  const { login } = UseAuth();
  const [connectionError, setConnectionError] = useState<string | undefined>(
    undefined,
  );
  const handleLogin = async (e: React.FormEvent) => {
    if (!isValid) return;
    e.preventDefault();
    try {
      // const mockuser: User = {
      //   name: "Ag",
      //   email: "hallowbitch@me.proton",
      //   token: undefined,
      //   type: "student",
      //   avatar: "erlthismotherfucker",
      //   isOnline: true,
      // };
      const loginResponde = await login(form.email, form.password);
      if ((loginResponde.code == 200, loginResponde.user?.roles == "student")) {
        navigate("/explore"); // or use router
      } else {
        navigate("/dashboard"); // or use router
      }
    } catch (err: any) {
      //console.log(err);
      setConnectionError(err.response?.data?.message || "Unknown Error");
    }
  };
  return (
    <main>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <Link to={"/"} className="text-2xl font-bold  text-white ">
            ProFind
          </Link>
          <h2 className="mt-10 text-2xl/9 font-bold tracking-tight text-white">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <InputField
                lable="Email "
                placeHolder="Email Address"
                id="email"
                name="email"
                type="email"
                _value={form.email}
                aria-invalid
                onchange={handleChange}
              />
            </div>

            <div>
              <div className="flex  items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="flex  items-center  justify-between">
                <InputField
                  placeHolder="Password"
                  id="password"
                  name="password"
                  type="password"
                  _value={form.password}
                  onchange={handleChange}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                />
              </div>
            </div>
            {displayWaring(errors, connectionError)}

            <div className="flex flex-col items-center pt-4">
              <button
                type="submit"
                disabled={!isValid}
                onClick={handleLogin}
                className=" disabled:bg-gray-500 w-[80%] rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
function displayWaring(
  errors: LoginValidationErrors,
  connectionError?: string,
) {
  let message = "";
  if (connectionError) message = connectionError;
  else
    switch (true) {
      case errors.email != undefined:
        message = errors.email;
        break;
      case errors.password != undefined:
        message = errors.password;
        break;

      default:
        return <></>;
        break;
    }
  return <CallOutWarning text={message} />;
}
