import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {PasswordResetSchema, PasswordResetType} from "../../types/reset-password/passwordReset.ts";
import {Link} from "react-router";
import Input from "../../components/forms/Input.tsx";
import Button from "../../components/forms/Button.tsx";
import {sendPasswordResetLink} from "../../services/passwordService.ts";

function PasswordResetLink() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<PasswordResetType>({
        resolver: zodResolver(PasswordResetSchema)
    })

    const onSubmit = async (data: PasswordResetType) => {
        await sendPasswordResetLink(data);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

                {isSubmitSuccessful ? (
                    <div className="mb-4 text-center">
                        <div className="bg-green-100 p-4 rounded-lg mb-4">
                            <p className="text-green-700">
                                We have emailed your password reset link. Please check your inbox.
                            </p>
                        </div>
                        <Link to="/auth/login" className="text-blue-500 hover:underline">
                            Back to login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-4">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                register={register}
                                error={errors.email}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
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

export default PasswordResetLink;