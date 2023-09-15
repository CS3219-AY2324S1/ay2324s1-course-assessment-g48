import React from "react";

interface InputProps {
  type: string;
  label: string;
  value: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}

const FormInput: React.FC<InputProps> = ({
  type,
  label,
  value,
  autoComplete,
  onChange,
}) => {
  return (
    <>
    <label htmlFor={type} className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                {label}
              </label>
              <div className="mt-2">
                <input
                  id={type}
                  name={type}
                  type={type}
                  autoComplete={autoComplete}
                  value={value}
                  onChange={(e) =>onChange(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:focus:ring-purple-500"
                />
              </div>
    </>
  );
};

export default FormInput;
