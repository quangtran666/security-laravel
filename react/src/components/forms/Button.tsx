import {ReactNode} from "react";

type ButtonProps = {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
};

const Button = ({
  children,
  type = "button",
  disabled = false,
  className = "",
  onClick
}: ButtonProps) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`
                cursor-pointer bg-blue-500 text-white p-2 rounded-md max-w-sm w-full 
                ${className}
                ${disabled ? "opacity-50" : ""}
                `}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;