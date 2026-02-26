import { CodeSquareIcon } from "lucide-react";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="bg-indigo-600 dark:bg-yellow-400 w-10 h-10 rounded-lg flex items-center justify-center">
        <CodeSquareIcon className="text-white dark:text-black w-6 h-6" />
      </div>

      <h1 className="hidden sm:block text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
        Austin<span className="text-indigo-600 dark:text-yellow-400">.tech</span>
      </h1>
    </div>
  );
};

export default Logo;