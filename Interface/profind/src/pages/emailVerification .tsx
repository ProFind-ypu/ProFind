import { useRef, useState } from "react";

export default function EmailVerification() {
   const [code, setCode] = useState<string[]>(Array(5).fill(""));
   const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

   const handleChange = (value: string, index: number) => {
      if (/^\d*$/.test(value) && value.length <= 1) {
         const newCode = [...code];
         newCode[index] = value;
         setCode(newCode);

         // Move to next input if current is filled
         if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
         }
      }
   };

   const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
   ) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
         inputsRef.current[index - 1]?.focus();
      }
   };

   const handlePaste = (
      e: React.ClipboardEvent<HTMLInputElement>,
      index: number
   ) => {
      e.preventDefault();
      const pastedData = e.clipboardData
         .getData("text")
         .trim()
         .slice(0, code.length);
      const digits = pastedData.split("").filter((char) => /^\d$/.test(char));

      const newCode = [...code];
      digits.forEach((digit, i) => {
         if (i < code.length) newCode[i] = digit;
      });
      setCode(newCode);

      // Focus the last filled input or the first empty one
      const focusIndex =
         digits.length > 0 ? Math.min(digits.length, code.length - 1) : index;
      inputsRef.current[focusIndex]?.focus();
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Verification code:", code.join(""));
      // Handle verification logic here
   };
   return (
      <div className="flex justify-center items-center w-full h-full">
         <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-10">
            <div className="text-3xl font-medium w-full text-center text-white">
               Enter Verification Code
               <br />
               <p className="text-lg font-light  text-white/60 pt-3">
                  we'v send you a verification message to your email<br/>
                  <p className="font-light text-sm ">if it didn't show right a way , check trash and spame</p>
               </p>
            </div>
            <div className="flex space-x-2 md:space-x-3">
               {code.map((digit, index) => (
                  <input
                     key={index}
                     id={`code-input-${index}`}
                     ref={(el) => {
                        inputsRef.current[index] = el;
                     }}
                     type="text"
                     inputMode="numeric"
                     maxLength={1}
                     value={digit}
                     onChange={(e) => handleChange(e.target.value, index)}
                     onKeyDown={(e) => handleKeyDown(e, index)}
                     onPaste={(e) => handlePaste(e, index)}
                     className="w-12 h-12 md:w-14 md:h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
               ))}
            </div>
            <button
               type="submit"
               className="px-6 py-2 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
               Verify
            </button>
         </form>
      </div>
   );
}
