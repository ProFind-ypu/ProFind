import { Link } from "react-router-dom";
import CallOutWarning from "../components/complex/CallOutWarning";
import InputField from "../components/complex/InputField";
import { useSignupFormValidation, type SignUpValidationErrors } from "../helpers/_ValidateSignUp";
export default function Signup() {
   const { form, errors, handleChange, isValid } = useSignupFormValidation();

   const handleLogin = () => {
      if (!isValid) return;
      console.log("Logging in with:", form);
      // TODO: Call login API under here
   };
   return (
      <main>
         <div className="flex min-h-full flex-col justify-center">
            <div className="sm:mx-auto sm:w-full mt-10 sm:max-w-sm ">
               <h1 className="  text-center text-2xl font-bold   text-white ">
                  ProFind
               </h1>
               <h2 className="text-center text-2xl/9 font-bold pt-3 tracking-tight text-white">
                  Create an Account
               </h2>
            </div>

            <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
               <form action="#" method="POST" className="space-y-3">
                  <div className="grid grid-cols-2 grid-rows-1 justify-center gap-3">
                     <InputField
                        lable="First Name"
                        id="firstName"
                        name="firstName"
                        _value={form.firstName}
                        onchange={handleChange}
                     />
                     <InputField
                        lable="Last Name"
                        id="lastName"
                        name="lastName"
                        _value={form.lastName}
                        onchange={handleChange}
                     />
                  </div>

                  <div>
                     <InputField
                        lable="University ID"
                        example="ex(202110***)"
                        id="universityId"
                        name="universityId"
                        _value={form.universityId}
                        onchange={handleChange}
                     />
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
                     <div className="mt-2">
                        <InputField
                           lable="Password "
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
                        <InputField
                           id="confirmPassword"
                           name="confirmPassword"
                           type="password"
                           _value={form.confirmPassword}
                           onchange={handleChange}
                           placeHolder="Confirm Password"
                           aria-invalid={!!errors.confirmPassword}
                           aria-describedby={
                              errors.confirmPassword ? "password-error" : undefined
                           }
                        />
                     </div>
                  </div>
                  {displayWaring(errors)}

                  <div className="flex flex-col pt-3 items-center">
                     <button
                        type="submit"
                        disabled={!isValid}
                        onClick={handleLogin}
                        className=" disabled:bg-gray-500 w-[80%] rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                        Sign up
                     </button>
                  </div>
               </form>

               <p className="mt-4 text-center text-sm/6 text-gray-400">
                  already a member?{" "}
                  <Link
                     to="/login"
                     className="font-semibold text-indigo-400 hover:text-indigo-300">
                     Login
                  </Link>
               </p>
            </div>
         </div>
      </main>
   );
}
function displayWaring(errors:SignUpValidationErrors){
    let message='';
    switch (true) {
        case errors.firstName!=undefined:
            message=errors.firstName;
            break;
        case errors.lastName!=undefined:
            message=errors.lastName;
            break;
        case errors.universityId!=undefined:
            message=errors.universityId;
            break;
        case errors.email!=undefined:
            message=errors.email;
            break;
        case errors.password!=undefined:
            message=errors.password;
            break;
        case errors.confirmPassword!=undefined:
            message=errors.confirmPassword;
            break;
    
        default:
            return(<></>)
            break;
        }
    return(<CallOutWarning text={message} />)
}