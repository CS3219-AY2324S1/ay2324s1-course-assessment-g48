import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import { Complexity } from "@/utils/enums/Complexity";
import { Language } from "@/utils/enums/Language";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type matchingProps = {};

const MatchingPage: React.FC<matchingProps> = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <form action="#" method="POST" className="self-center mt-16 max-w-xl sm:mt-20">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="language"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Language
          </label>
          <div className="relative mt-2.5">
          <select
                id="language"
                name="language"
                className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                {Object.values(Language).map((languageOption) => (
                    <option key={languageOption}>{languageOption}</option>
                    ))}
              </select>
          </div>
        </div>
        <div className="sm:col-span-2">
        <label
            htmlFor="difficulty"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Difficulty
          </label>
          <div className="relative mt-2.5">
          <select
                id="difficulty"
                name="difficulty"
                className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                {Object.values(Complexity).map((complexityOption) => (
                    <option key={complexityOption}>{complexityOption}</option>
                    ))}
              </select>
              </div>
              </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Message
          </label>
          <div className="mt-2.5">
            <textarea
              name="message"
              id="message"
              rows={4}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Match
        </button>
      </div>
    </form>
  );
};
export default MatchingPage;
