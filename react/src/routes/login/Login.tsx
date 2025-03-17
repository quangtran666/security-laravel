import {useForm} from "react-hook-form";
import {LoginRequestSchema, LoginRequestType} from "../../types/auth/loginRequest.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "../../components/forms/Input.tsx";
import CheckBox from "../../components/forms/CheckBox.tsx";
import Button from "../../components/forms/Button.tsx";
import {login} from "../../services/authService.ts";
import {Link, useNavigate} from "react-router";
import SocialLoginButton from "../../components/SocialLoginButton.tsx";

function Login() {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<LoginRequestType>({
        resolver: zodResolver(LoginRequestSchema)
    })

    const navigate = useNavigate();

    const onSubmit = async (values: LoginRequestType) => {
        await login(values);
        navigate("/home");
    }

    return (
        <form
            className="space-y-2"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                label="Email"
                name="email"
                register={register}
                error={errors.email}
            />
            <Input
                label="Password"
                name="password"
                type="password"
                register={register}
                error={errors.password}
            />
            <div className="flex justify-between items-center">
                <CheckBox
                    label="Remember me"
                    name="remember"
                    register={register}
                    error={errors.remember}
                />
                <div className="flex justify-between items-center space-x-2">
                    <Link className="text-blue-400" to={"/auth/password-reset"}>Quên mật khẩu</Link>
                    <span className="text-blue-400">|</span>
                    <Link className="text-blue-400" to={"/auth/register"}>Chưa có tài khoản? Đăng ký ở đây</Link>
                </div>
            </div>
            <Button
                type="submit"
                disabled={isSubmitting}
            >
                Login
            </Button>
            <div className="grid grid-cols-2 gap-3">
                <SocialLoginButton
                    provider="github"
                    label="Github"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>}
                    className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                />
                <SocialLoginButton
                    provider="facebook"
                    label="Facebook"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                />
            </div>
        </form>
    );
}

export default Login;