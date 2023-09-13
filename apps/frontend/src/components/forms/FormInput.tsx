import React from "react";

interface InputProps {
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const FormInput: React.FC<InputProps> = ({
  type,
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={label} className="text-light">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default FormInput;
