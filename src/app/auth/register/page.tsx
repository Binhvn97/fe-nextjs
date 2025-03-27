"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { registerUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (name && email && password) {
      dispatch(registerUser({ name, email, password }));
      router.push("/dashboard"); // Chuyển hướng sau khi đăng ký thành công
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <input
        type="text"
        placeholder="Name"
        className="border p-2 mb-2 w-64"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2 w-64"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-4 w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleRegister}
      >
        Register
      </button>

      {isAuthenticated && <p className="text-green-500 mt-2">Registered Successfully!</p>}
    </div>
  );
};

export default RegisterPage;
