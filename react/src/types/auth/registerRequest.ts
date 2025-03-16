import {z} from "zod";

export const RegisterRequestSchema = z.object({
    'name': z.string().min(2, {message: "Tên phải có ít nhất 2 ký tự."}),
    'email': z.string().email({message: "Email không hợp lệ, vui lòng kiểm tra lại."}),
    'password': z.string().min(8, {message: "Mật khẩu phải có ít nhất 8 ký tự."}),
    'password_confirmation': z.string().min(8, {message: "Mật khẩu phải có ít nhất 8 ký tự."}),
})
    .refine(data => data.password === data.password_confirmation, {
        path: ['password_confirmation'],  // Đặt lỗi ở trường password_confirmation
        message: "Xác nhận mật khẩu không khớp.",
    })

export type RegisterRequestType = z.infer<typeof RegisterRequestSchema>;