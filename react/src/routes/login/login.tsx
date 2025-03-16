import {useForm} from "react-hook-form";
import {LoginRequestSchema, LoginRequestType} from "../../types/auth/loginRequest.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "../../components/forms/Input.tsx";
import CheckBox from "../../components/forms/CheckBox.tsx";
import Button from "../../components/forms/Button.tsx";
import {login} from "../../services/authService.ts";
import {useNavigate} from "react-router";

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
            <CheckBox
                label="Remember me"
                name="remember"
                register={register}
                error={errors.remember}
            />
            <Button
                type="submit"
                disabled={isSubmitting}
            >
                Login
            </Button>
        </form>
    );
}

export default Login;