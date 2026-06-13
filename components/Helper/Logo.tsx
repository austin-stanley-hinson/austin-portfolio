import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Image
        src="/images/personal-logo.png"
        alt="Austin Hinson logo"
        width={300}
        height={200}
        priority
        className="h-28 sm:h-32 w-auto object-contain"
      />
    </div>
  );
};

export default Logo;
