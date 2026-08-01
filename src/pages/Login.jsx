import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save JWT
      localStorage.setItem(
        "token",
        data.token
      );

      // Save user
      localStorage.setItem("token", data.token);

      localStorage.setItem(
      "user",
      JSON.stringify(data.user)
      );

      window.location.href = "/";
    } catch (error) {
      console.error("Login Error:", error);

      setError(
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-orange-50/40 px-4 py-10">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-10 text-white md:flex md:flex-col md:justify-center">

          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl">
            🍴
          </div>

          <h1 className="text-4xl font-extrabold">
            Welcome back to SmartBite
          </h1>

          <p className="mt-5 leading-7 text-orange-50">
            Discover food that matches your taste,
            budget, health preferences, and cravings
            with the power of AI.
          </p>

          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white/10 p-4">

            <Sparkles size={24} />

            <p className="text-sm">
              Your personalized food recommendations
              are waiting for you.
            </p>

          </div>

        </div>

        {/* Right Side */}
        <div className="p-6 sm:p-10">

          <div className="mb-8">

            <h2 className="text-3xl font-bold text-gray-900">
              Login
            </h2>

            <p className="mt-2 text-gray-500">
              Sign in to continue to SmartBite.
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-orange-500">

                <Mail
                  size={19}
                  className="text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-transparent px-3 py-3.5 outline-none"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-orange-500">

                <Lock
                  size={19}
                  className="text-gray-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-transparent px-3 py-3.5 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="text-gray-400 hover:text-orange-500"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* Forgot Password */}
            <div className="text-right">

              <button
                type="button"
                className="text-sm font-semibold text-orange-500 hover:text-orange-600"
              >
                Forgot Password?
              </button>

            </div>

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3.5 font-bold text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          {/* Register */}
          <p className="mt-7 text-center text-sm text-gray-500">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-bold text-orange-500 hover:text-orange-600"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;