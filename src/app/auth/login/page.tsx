"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch } from "@/store/hook";
import { loginUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import FormInput from "@/components/form/FormInput";

// Schema kiểm tra dữ liệu đầu vào
const loginSchema = z.object({
  username: z.string().nonempty("Username không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
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
      if (result.authenticated) {
        router.push("/dashboard");
      } else {
        setError("Sai email hoặc mật khẩu!");
      }
    } catch {
      setError("Lỗi đăng nhập, vui lòng thử lại!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-semibold text-center text-gray-600 mb-6">
            Đăng nhập
          </h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Username"
              required={true}
              placeholder="Nhập username của bạn"
              {...register("username")}
              error={errors.username?.message}
            />

            <FormInput
              label="Mật khẩu"
              type="password"
              required={true}
              placeholder="Nhập mật khẩu"
              {...register("password")}
              error={errors.password?.message}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
            >
              {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-gray-500">Bạn chưa có tài khoản?</span>
          <button
            className="text-gray-500 hover:cursor-pointer"
            onClick={() => router.push("/auth/register")}
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}
