import { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label className="text-sm font-medium">{label}</label>
        <input
          ref={ref}
          className="mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
export default FormInput;
