import axios from "../plugins/axios.ts";

export const resendVerificationEmail = async () => {
    return await axios.post("auth/spa/email/verification-notification");
}

export const checkVerificationStatus = async () => {
    return await axios.get("auth/spa/email/verify");
}

export const verifyEmail = async (verificationParams: string) => {
    return await axios.get(`auth/spa/email/verify/${verificationParams}`);
}