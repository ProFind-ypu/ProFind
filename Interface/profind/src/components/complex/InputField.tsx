import type { LoginFormState } from "../../helpers/_ValidateLogin";
import type { SignupFormState } from "../../helpers/_ValidateSignUp";

interface InputFieldProp {
   lable?: string;
   example?: string;
   placeHolder?: string;
   type?: string;
   id: string;
   name: string;
   _value?: string;
   aria_invalid?: boolean;
   aria_describedby?: string;
   onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function InputField({
   lable,
   example,
   placeHolder,
   type,
   id,
   name,
   _value,
   aria_describedby,
   aria_invalid = true,
   onchange,
}: InputFieldProp) {
   return (
      <div className="mt-2">
         <label
            //    htmlFor="name"
            className=" text-sm/6 font-medium text-gray-100">
            {lable}
            {example ? (
               <span className="pl-2 text-white/30">ex: 202110076</span>
            ) : (
               ""
            )}
         </label>
         <input
            id={id}
            name={name}
            type={type ? type : "text"}
            value={_value}
            onChange={onchange}
            required
            aria-invalid={aria_invalid ? aria_invalid : false}
            aria-describedby={aria_describedby}
            placeholder={placeHolder ? placeHolder : lable}
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
         />
      </div>
   );
}
