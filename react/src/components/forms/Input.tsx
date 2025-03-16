import {FieldError, UseFormRegister} from "react-hook-form";

type FormInputProps = {
    label: string;
    name: string;
    type?: string;
    className?: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    error: FieldError | undefined;
}

const Input = ({
    label,
    name,
    type,
    className,
    placeholder,
    register,
    error
} : FormInputProps) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                className={`border border-gray-300 p-2 rounded-md ${className}`}
                placeholder={placeholder}
                {...register(name)}
            />
            {error && <p className="text-red-500">{error.message}</p>}
        </div>
    )
}

export default Input;
