import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-8 min-h-svh p-3 ">
      <div className="relative hidden md:flex md:col-span-5">
        {/* Background image */}
        <Image
          src="/images/auth-bg.avif"
          alt="Auth Background"
          fill
          className="absolute inset-0 w-full h-full object-cover z-0 rounded-xl"
          priority
        />

        {/* Text */}
        <div className="relative z-20 max-w-5xl mt-14 ml-14 text-white pt-8 px-6">
          <h1 className="text-white flex items-center gap-4 text-2xl md:text-5xl font-bold font-manrope leading-[60px] mb-1 md:mb-4">
            Home Tracker PH
          </h1>
          <p className="text-white  text-md md:text-xl font-medium font-manrope leading-7">
            <span>Track your home efficiently with Home Tracker PH.</span>
          </p>
        </div>
      </div>

      <div className="md:col-span-3 flex justify-center items-center p-6">
        {children}
      </div>
    </div>
  );
}
