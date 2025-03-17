import {useState} from "react";
import Button from "../../components/forms/Button.tsx";
import {resendVerificationEmail} from "../../services/emailService.ts";

function EmailVerificationPrompt() {
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleResendVerification = async () => {
        setIsLoading(true);
        try {
            const response = await resendVerificationEmail();
            setStatus(response.data.status);
        }
        catch (error)
        {
            console.error('Error resending verification email:', error);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Xác thực Email</h2>
                <p className="mb-4">Vui lòng xác thực địa chỉ email của bạn bằng cách nhấp vào liên kết mà chúng tôi vừa gửi cho bạn.</p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    Một liên kết xác minh mới đã được gửi đến địa chỉ email bạn đã cung cấp khi đăng ký.
                </div>
            )}

            <div className="flex flex-col items-center justify-center space-y-4">
                <Button
                    onClick={handleResendVerification}
                    disabled={isLoading}
                >
                    {isLoading ? 'Đang gửi...' : 'Gửi lại email xác minh'}
                </Button>
            </div>
        </section>
    );
}

export default EmailVerificationPrompt;