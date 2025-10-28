interface MyComponentProps {
  text: string;
}

export default function CallOutWarning({text}:MyComponentProps) {
   return (
      <>
      {/* TO-DO: add a transition on fading  */}
         <div className="w-full bg-linear-to-br warning-bg to-white/1 backdrop-blur-md rounded-lg  ">
            <div className=" text-white  h-10 px-2 flex items-center gap-1">
                <svg width="50" height="50" className="size-6" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="20" stroke="white" stroke-width="2" fill="none" />
                    <text x="24.9" y="35" text-anchor="middle" font-size="35" font-family=" Baskerville Times New Roman " fill="white">i</text>
                </svg>
               <p>{text}</p>
            </div>
         </div>
      </>
   );
}
