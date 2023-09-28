import React from "react";
import {
  ArrowsPointingOutIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const EditorNav = () => {
  return (
    <div className="flex items-center justify-between h-11 w-full dark:bg-gray-950 transition-all">
      <div className="flex items-center dark:text-white">
        <button className="languageBtn ml-2">
          <div className="flex items-center px-1">
            <div className="text-xs text-label-2 dark:text-white">
              JavaScript
            </div>
          </div>
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
