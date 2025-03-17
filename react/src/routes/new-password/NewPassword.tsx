import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {NewPasswordSchema, NewPasswordType} from "../../types/reset-password/newPassword.ts";
import {Link, useNavigate, useSearchParams} from "react-router";
import Input from "../../components/forms/Input.tsx";
import Button from "../../components/forms/Button.tsx";
import {NewPasswordRequest, resetPassword} from "../../services/passwordService.ts";

function NewPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<NewPasswordType>({
        resolver: zodResolver(NewPasswordSchema)
    })

    const onSubmit = async (data: NewPasswordType) => {
        const newPasswordRequest: NewPasswordRequest = {
            token: searchParams.get('token')!,
            ...data
        }
        await resetPassword(newPasswordRequest);

        setTimeout(() => {
            navigate("/auth/login");
        }, 3000)
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Set New Password</h2>

                {isSubmitSuccessful ? (
                    <div className="bg-green-100 p-4 rounded-lg mb-4">
                        <p className="text-green-700 text-center">
                            Your password has been reset successfully!
                            Redirecting you to login page...
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                register={register}
                                error={errors.email}
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="New Password"
                                type="password"
                                name="password"
                                register={register}
                                error={errors.password}
                            />
                        </div>

                        <div className="mb-6">
                            <Input
                                label="Confirm Password"
                                type="password"
                                name="password_confirmation"
                                register={register}
                                error={errors.password_confirmation}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full"
                        >
                            {isSubmitting ? 'Processing...' : 'Reset Password'}
                        </Button>

                        <div className="mt-4 text-center">
                            <Link to="/auth/login" className="text-blue-500 hover:underline">
                                Back to login
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default NewPassword;