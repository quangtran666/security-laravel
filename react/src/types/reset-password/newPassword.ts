import {z} from "zod";

export const NewPasswordSchema = z.object({
    email: z.string().email({message: "Email không hợp lệ, vui lòng kiểm tra lại."}),
    password: z.string().min(8, {message: "Mật khẩu phải có ít nhất 8 ký tự."}),
    password_confirmation: z.string().min(8, {message: "Mật khẩu phải có ít nhất 8 ký tự."})
}).refine(data => data.password === data.password_confirmation, {
    message: "Xác nhận mật khẩu không khớp.",
    path: ['password_confirmation']
});

export type NewPasswordType = z.infer<typeof NewPasswordSchema>;