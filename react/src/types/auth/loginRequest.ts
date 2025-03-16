import {z} from "zod";

export const LoginRequestSchema = z.object({
    email: z.string().email({ message: "Email không hợp lệ, vui lòng kiểm tra lại." }),
    password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự." }),
    remember: z.boolean().optional(),
});

export type LoginRequestType = z.infer<typeof LoginRequestSchema>;
