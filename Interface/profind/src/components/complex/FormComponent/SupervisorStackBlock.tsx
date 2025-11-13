import { useState } from "react";
import InputForm from "./InputForm";

export default function SupervisorStackBlock() {
  const [hider, setHider] = useState([false, true, true]);
  return (
    <div className="flex w-full overflow-hidden h-full  content-center items-center">
      <div className="flex flex-row w-full p-2 items-center">
        <div
          className={`w-full sm:w-1/3 h-full sm:block! ${hider.at(0) ? "hidden" : ""}`}
        >
          <div className="sad p-2 ">
            <p>اسم المشرف الرئيسي</p>
          </div>
          <div className="sad">
            <InputForm id="" name="" />
          </div>
          <div className="sad p-2">
            <p>التوقيع</p>
          </div>
          <div className="sad">
            <InputForm id="" name="" />
          </div>
        </div>
        <div
          className={`w-full sm:w-1/3 h-full sm:block! ${hider.at(1) ? "hidden" : ""}`}
        >
          <div className="sad p-2">
            <p>اسم المشرف المساعد</p>
          </div>
          <div className="sad">
            <InputForm id="" name="" />
          </div>
          <div className="sad p-2">
            <p>التوقيع</p>
          </div>
          <div className="sad">
            <InputForm id="" name="" />
          </div>
        </div>
        <div
          className={`w-full sm:w-1/3 h-full sm:block! ${hider.at(2) ? "hidden" : ""}`}
        >
          <div className="sad p-2">
            <p>اسم المشرف الخارجي</p>
          </div>
          <div className="sad">
            <InputForm id="" name="" />
          </div>
          <div className="sad p-2">
            <p>التوقيع</p>
          </div>
          <div className="sad">
            <InputForm id="" name="" />
          </div>
        </div>
      </div>
      <button
        className="absolute left-0 text-white bg-black ml-1 mt-2 rounded-xs cursor-pointer sm:hidden"
        onClick={shiftHider}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          />
        </svg>
      </button>
    </div>
  );
  function shiftHider() {
    setHider((prev) => {
      const newArr = [...prev]; // Copy the array
      newArr.unshift(newArr.pop()!); // Rotate: move last to front
      return newArr;
    });
  }
}
