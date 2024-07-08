import AppointmentForm from "@/components/forms/AppointmentForm";
import Image from "next/image";
import Link from "next/link";
import { SearchParamProps } from "../../../../../types";

const AppointmentPage = ({ params: { userId }}: SearchParamProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
           src={"/assets/icons/logo-full.svg"}
           width={1000}
           height={1000}
           alt="carepulse_logo"
           className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            userId={"668a994d001d4f6e59dc"}
            patientId="668a994d001d4f6e59dc"
            type="schedule"
          />

          <div className="text-14-regular mt-20 flex justify-between ">
             <p className="justify-items-end text-dark-600 xl:text-left">
              © {currentYear} CarePulse
             </p>
             <Link 
                href={"/?admin=true"}
                className="text-green-500"  
              >
              Admin
             </Link>
          </div>
        </div>
      </section>

      <Image 
        src="/assets/images/appointment-img.png"
        width={1000}
        height={1000}
        alt="onboardin-img"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}

export default AppointmentPage
