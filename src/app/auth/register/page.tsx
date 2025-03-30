"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/store/hook";
import { registerUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import FormInput from "@/components/form/FormInput";

// ✅ Schema kiểm tra dữ liệu đầu vào
const registerSchema = z
  .object({
    username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
    firstName: z.string().min(1, "Vui lòng nhập họ"),
    lastName: z.string().min(1, "Vui lòng nhập tên"),
    email: z.string().email("Email không hợp lệ"),
    dob: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Định dạng ngày sinh không hợp lệ (YYYY-MM-DD)"
      ),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/,
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 chữ viết hoa, 1 số và 1 ký tự đặc biệt"
      )
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const result = await dispatch(registerUser(data)).unwrap();
      if (result.success) {
        router.push("/auth/login");
      } else {
        setError("Đăng ký thất bại, vui lòng thử lại!");
      }
    } catch {
      setError("Lỗi đăng ký, vui lòng thử lại!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-600 mb-6">
          Đăng ký
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Tên đăng nhập"
            required={true}
            placeholder="Nhập tên đăng nhập"
            {...register("username")}
            error={errors.username?.message}
          />
          <FormInput
            label="Tên"
            required={true}
            placeholder="Nhập tên của bạn"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <FormInput
            label="Họ"
            required={true}
            placeholder="Nhập họ của bạn"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
          <FormInput
            label="Email"
            type="email"
            required={true}
            placeholder="Nhập email tài khoản"
            {...register("email")}
            error={errors.email?.message}
          />
          <FormInput
            label="Ngày sinh"
            type="date"
            required={true}
            placeholder="Nhập ngày sinh của bạn"
            {...register("dob")}
            error={errors.dob?.message}
          />
          <FormInput
            label="Mật khẩu"
            type="password"
            required={true}
            placeholder="Nhập mật khẩu"
            {...register("password")}
            error={errors.password?.message}
          />
          <FormInput
            label="Xác nhận mật khẩu"
            type="password"
            required={true}
            placeholder="Nhập xác nhận mật khẩu"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
          >
            {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <div className="flex justify-between mt-2">
          <span className="text-gray-500">Bạn đã có tài khoản?</span>
          <button
            className="text-gray-500 hover:cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
