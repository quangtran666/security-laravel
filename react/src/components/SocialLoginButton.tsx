import {ReactNode} from "react";
import {socialLogin} from "../services/authService.ts";

type SocialLoginButtonProps = {
    provider: string;
    label: string;
    icon: ReactNode;
    className?: string;
}

function SocialLoginButton({provider, label, icon, className} : SocialLoginButtonProps) {
    const handleClick = async () => {
        await socialLogin(provider);
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded ${className}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}

export default SocialLoginButton;