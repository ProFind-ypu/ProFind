import graduation_img from "../assets/graduation.jpg";
import GithubBanner from "../components/githubBanner";
import LandingBrowseSignButtons from "../components/LandingBrowseSignButtons";
export default function Home() {
   return (
      <>
         {/* <Link to="/about"><h2>ss2</h2></Link>  */}
         <main className="flex min-h-screen flex-col ">
            <div
               className="
              relative z-10 container mx-auto max-w-7xl px-4 py-16
              sm:px-6
              lg:px-8
              ">
               <div
                  id="landing-text-with-image"
                  className="
                grid items-center  
                md:grid-cols-2 lg:gap-12 gap-10 grid-cols-2
                ">
                  <div className=" flex flex-col gap-7">
                     <GithubBanner />
                     <h1
                        className="
                max-w-[70%] 
                font-display text-4xl leading-tight font-bold
                tracking-tight text-foreground
                sm:text-4xl
                md:text-5xl
                lg:leading-[1.1]">
                        Your Graduation Project Is Here!
                     </h1>
                     <h2 className="max-w-[90%] text-lg text-white/50 md:text-xl">
                        Connect with professors for impactful research and
                        academic projects—match interests, skills, and goals in
                        one seamless platform.{" "}
                     </h2>
                     <LandingBrowseSignButtons />
                  </div>

                  <div
                     id="graduation-image"
                     className="
                  relative mx-auto  aspect-square w-full max-w-sm 
                  overflow-hidden rounded-xl border shadow-lg
                  lg:block ">
                     <img
                        src={graduation_img}
                        alt=""
                        className="object-fill w-full h-full"
                     />
                  </div>
               </div>
            </div>
         </main>
      </>
   );
}
