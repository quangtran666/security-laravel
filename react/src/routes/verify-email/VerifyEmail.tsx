import {useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {verifyEmail} from "../../services/emailService.ts";

function VerifyEmail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage]  = useState<string>('');

    useEffect(() => {
        const verifyEmailHandler = async () => {
            try {
                const urlParams = new URLSearchParams(location.search);
                const verifyUrl = urlParams.get("url");

                // Error message
                if (!verifyUrl) {
                    setStatus('error');
                    setMessage('Liên kết xác thực không hợp lệ.');
                    return;
                }

                // Extract verification params to send to the backend
                const verificationParams = verifyUrl.split('verify/')[1];
                const response = await verifyEmail(verificationParams);
                setStatus('success');
                setMessage(response.data.message || 'Email đã được xác thực thành công.');

                setTimeout(() => {
                    navigate('/home');
                }, 3000)

            } catch (error)
            {
                console.log(error);
                setStatus('error');
                setMessage('Có lỗi xảy ra khi xác thực email. Vui lòng thử lại sau.');
            }
        }
        verifyEmailHandler();
    }, [location, navigate]);

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Xác thực Email</h2>

            {status === 'loading' && (
                <p className="text-gray-600">Đang xác thực email của bạn...</p>
            )}

            {status === 'success' && (
                <div className="text-green-600">
                    <p>{message}</p>
                    <p className="mt-2">Bạn sẽ được chuyển hướng đến trang chủ sau vài giây.</p>
                </div>
            )}

            {status === 'error' && (
                <div className="text-red-600">
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
}

export default VerifyEmail;