import { useLoginFormValidation } from "../helpers/_ValidateLogin";
import CallOutWarning from "../components/CallOutWarning";
export default function Login() {
   const { form, errors, handleChange, isValid } = useLoginFormValidation();

   const handleLogin = () => {
      if (!isValid) return;
      //  Safe to submit: both fields are valid
      console.log("Logging in with:", form);
      // TODO: Call login API under here
   };
   return (
      <main>
         <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               <h1 className="  text-center text-2xl font-bold  text-white ">
                  ProFind
               </h1>
               <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                  Login to your account
               </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
               <form action="#" method="POST" className="space-y-6">
                  <div>
                     <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium text-gray-100">
                        Email address
                     </label>
                     <div className="mt-2">
                        <input
                           id="email"
                           name="email"
                           type="email"
                           value={form.email}
                           onChange={handleChange}
                           required
                           autoComplete="email"
                           placeholder="Email"
                           aria-invalid={!!errors.email}
                           aria-describedby={
                              errors.email ? "email-error" : undefined
                           }
                           className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                     </div>
                  </div>

                  <div>
                     <div className="flex items-center justify-between">
                        <label
                           htmlFor="password"
                           className="block text-sm/6 font-medium text-gray-100">
                           Password
                        </label>
                        <div className="text-sm">
                           <a
                              href="#"
                              className="font-semibold text-indigo-400 hover:text-indigo-300">
                              Forgot password?
                           </a>
                        </div>
                     </div>
                     <div className="mt-2">
                        <input
                           id="password"
                           name="password"
                           type="password"
                           value={form.password}
                           onChange={handleChange}
                           required
                           autoComplete="current-password"
                           placeholder="Password"
                           aria-invalid={!!errors.password}
                           aria-describedby={
                              errors.password ? "password-error" : undefined
                           }
                           className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                     </div>
                  </div>
                  {errors.email && <CallOutWarning text={errors.email} />}
                  {errors.password && <CallOutWarning text={errors.password} />}

                  <div className="flex flex-col items-center">
                     <button
                        type="submit"
                        disabled={!isValid}
                        onClick={handleLogin}
                        className=" disabled:bg-gray-500 w-[80%] rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                        Login
                     </button>
                  </div>
               </form>

               <p className="mt-10 text-center text-sm/6 text-gray-400">
                  Not a member?{" "}
                  <a
                     href=""
                     className="font-semibold text-indigo-400 hover:text-indigo-300">
                     Sign in
                  </a>
               </p>
            </div>
         </div>
      </main>
   );
}
