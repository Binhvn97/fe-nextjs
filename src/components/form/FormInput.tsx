import { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, required, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        <input
          ref={ref}
          className="mt-1 px-3 py-2 h-9 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 placeholder-gray-300"
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
export default FormInput;
