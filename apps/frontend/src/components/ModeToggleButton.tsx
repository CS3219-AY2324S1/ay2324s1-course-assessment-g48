import { useTheme } from "@/hook/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type ModeToggleButtonProps = {};

const ModeToggleButton: React.FC<ModeToggleButtonProps> = () => {
    const { isDarkMode, toggleTheme } = useTheme();


  return (
    <button
      type="button"
      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        onClick={toggleTheme}
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">View notifications</span>
      {isDarkMode ? <SunIcon className="h-6 w-6" aria-hidden="true" /> :<MoonIcon className="h-6 w-6" aria-hidden="true" />}
    </button>
  );
};
export default ModeToggleButton;
