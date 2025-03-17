import {PasswordResetType} from "../types/reset-password/passwordReset.ts";
import axios, {csrfCookie} from "../plugins/axios.ts";
import {NewPasswordType} from "../types/reset-password/newPassword.ts";

export const sendPasswordResetLink = async (passwordResetRequest : PasswordResetType) => {
    await csrfCookie();
    return await axios.post('auth/spa/forgot-password', passwordResetRequest);
}

export type NewPasswordRequest = { token: string } & NewPasswordType;

export const resetPassword = async (newPasswordRequest : NewPasswordRequest) => {
    return await axios.post(`auth/spa/reset-password/${newPasswordRequest.token}`, newPasswordRequest);
}