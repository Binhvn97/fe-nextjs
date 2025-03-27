"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import FormInput from "@/components/form/FormInput";

// ✅ Schema kiểm tra dữ liệu đầu vào
const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      if (result.success) {
        router.push("/dashboard");
      } else {
        setError("Sai email hoặc mật khẩu!");
      }
    } catch {
      setError("Lỗi đăng nhập, vui lòng thử lại!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Đăng nhập</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Email"
            type="email"
            placeholder="Nhập email của bạn"
            {...register("email")}
            error={errors.email?.message}
          />

          <FormInput
            label="Mật khẩu"
            type="password"
            placeholder="Nhập mật khẩu"
            {...register("password")}
            error={errors.password?.message}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
