import React, { useState } from "react";
import {
  ArrowsPointingOutIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { Language } from "@/utils/enums/Language";

const EditorNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectLanguage = (language:Language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className="flex items-center justify-between h-11 w-full dark:bg-gray-950 transition-all">
      <div className="flex items-center dark:text-white">
        <button className="languageBtn ml-2" onClick={toggleDropdown}>
          <div className="flex items-center px-1">
            <div className="text-xs text-label-2 dark:text-white">
              {selectedLanguage}
            </div>
          </div>
          {isDropdownOpen && (
            <ul className="dropdown-list absolute top-8 left-2 mt-2 py-2 px-4 border border-gray-300 rounded-md bg-white dark:bg-gray-950 z-20">
              {Object.values(Language).map((language) => (
                <li
                  key={language}
                  className="cursor-pointer hover:bg-gray-200 p-2 text-xs rounded-md"
                  onClick={() => selectLanguage(language)}
                >
                  {language}
                </li>
              ))}
            </ul>
          )}
        </button>
      </div>

      <div className="flex">
        <div className="flex items-center">
          <button className="preferenceBtn group">
            <div className="h-6 w-6 dark:text-white">
              <Cog6ToothIcon />
            </div>
            <div className="preferenceBtnTooltip group">Settings</div>
          </button>
        </div>

        <div className="flex items-center">
          <button className="preferenceBtn group">
            <div className="h-6 w-6 dark:text-white">
              <ArrowsPointingOutIcon />
            </div>
            <div className="preferenceBtnTooltip group">Fullscreen</div>
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditorNav;
