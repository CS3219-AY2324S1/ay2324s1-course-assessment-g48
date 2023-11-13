import React, { useState } from "react";
import {
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { languageOptions } from "@/utils/constants/LanguageOptions";
import { Language } from "@/utils/class/Language";

type EditorNavProps = {
  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;
  hasSession: boolean;
};

const EditorNav: React.FC<EditorNavProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  hasSession,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false); // Close the dropdown after selecting an option
  };

  const handleFullScreen = () => {
    const element = document.documentElement;

    if (document.fullscreenElement) {
      // If fullscreen is currently active, exit fullscreen
      document.exitFullscreen();
    } else {
      // If fullscreen is not active, request fullscreen
      element.requestFullscreen().catch((error) => {
        console.error("Error entering fullscreen mode:", error);
      });
    }
  };

  return (
    <div className="flex items-center justify-between h-11 w-full dark:bg-gray-950 transition-all">
      <div className="flex items-center dark:text-white">
        <button className="languageBtn ml-2" onClick={toggleDropdown}>
          <div className="flex items-center px-1">
            <div className="text-xs text-label-2 dark:text-white group">
              {selectedLanguage.label}
              {hasSession && (
                <div className="languageTooltip">
                  Language cannot be changed after matching.
                </div>
              )}
            </div>
          </div>
          {isDropdownOpen && !hasSession && (
            <ul className="dropdown-list absolute top-8 left-2 mt-2 py-2 px-4 border border-gray-300 rounded-md bg-white dark:bg-gray-950 z-10 overflow-y-auto">
              {Object.values(languageOptions).map((language) => (
                <li
                  key={language.id}
                  className="cursor-pointer hover:bg-gray-200 hover:text-black p-2 text-xs rounded-md"
                  onClick={() => selectLanguage(language)}
                >
                  {language.label}
                </li>
              ))}
            </ul>
          )}
        </button>
      </div>

      <div className="flex items-center">
        <button className="preferenceBtn group" onClick={handleFullScreen}>
          <div className="h-6 w-6 dark:text-white">
            <ArrowsPointingOutIcon />
          </div>
          <div className="btnTooltip">Fullscreen</div>
        </button>
      </div>
    </div>
  );
};
export default EditorNav;
