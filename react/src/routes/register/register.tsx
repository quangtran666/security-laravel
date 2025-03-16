import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RegisterRequestSchema, type RegisterRequestType} from "../../types/auth/registerRequest.ts";
import {Link, useNavigate} from "react-router";
import Input from "../../components/forms/Input.tsx";
import Button from "../../components/forms/Button.tsx";
import {register as registerUser } from "../../services/authService.ts"

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting}
    } = useForm<RegisterRequestType>({
        resolver: zodResolver(RegisterRequestSchema)
    })

    const navigate = useNavigate();

    const onSubmit = async (values: RegisterRequestType) => {
        await registerUser(values);
        navigate("/home");
    }

    return (
        <form
            className="space-y-2"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                label="Name"
                name="name"
                register={register}
                error={errors.name}
            />
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
            <Input
                label="Password Confirmation"
                name="password_confirmation"
                type="password"
                register={register}
                error={errors.password_confirmation}
            />
            <div className="flex justify-between items-center">
                <Link className="text-blue-400" to={"/auth/login"}>Đã có tài khoản? Đăng nhập ở đây</Link>
            </div>
            <Button
                type="submit"
                disabled={isSubmitting}
            >
                Register
            </Button>
        </form>
    );
}

export default Register;