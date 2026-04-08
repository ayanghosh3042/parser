import { ChangeEvent } from "react";

interface Props {
  label?: string;
  name?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, name, type = "text", value, placeholder, onChange }: Props) => {
  return (
    <div className="space-y-1">
      <label className="text-slate-700 text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full h-10 rounded-md px-3 bg-white text-gray-700 border border-gray-300 focus:outline-none placeholder:text-base"
      />
    </div>
  );
};

export default InputField;