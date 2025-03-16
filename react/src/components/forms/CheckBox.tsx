import { UseFormRegister, FieldError } from "react-hook-form";

type FormCheckboxProps = {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    error?: FieldError;
    className?: string;
};

const FormCheckbox = ({
  label,
  name,
  register,
  error,
  className = ""
}: FormCheckboxProps) => {
    return (
        <div className="flex items-center gap-2">
            <input
                id={name}
                type="checkbox"
                className={`w-4 h-4 ${className}`}
                {...register(name)}
            />
            <label htmlFor={name}>{label}</label>
            {error && <p className="text-red-500">{error.message}</p>}
        </div>
    );
};

export default FormCheckbox;