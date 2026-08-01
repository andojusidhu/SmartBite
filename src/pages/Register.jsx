import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    // Check passwords
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        " https://smartbite-backend-ctwv.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Go to home
      navigate("/");
    } catch (error) {
      console.error("Registration Error:", error);

      setError(
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-orange-50/40 px-4 py-10">

      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl sm:p-10">

        {/* Header */}
        <div className="mb-8 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-2xl">
            🍴
          </div>

          <h1 className="mt-5 text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h1>

          <p className="mt-2 text-gray-500">
            Join SmartBite and discover food made for you.
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
          className="space-y-4"
        >

          {/* Name */}
          <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-orange-500">

            <User
              size={19}
              className="text-gray-400"
            />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full bg-transparent px-3 py-3.5 outline-none"
            />

          </div>

          {/* Email */}
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
              placeholder="Email Address"
              required
              className="w-full bg-transparent px-3 py-3.5 outline-none"
            />

          </div>

          {/* Phone */}
          <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-orange-500">

            <Phone
              size={19}
              className="text-gray-400"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full bg-transparent px-3 py-3.5 outline-none"
            />

          </div>

          {/* Password */}
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
              placeholder="Password"
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

          {/* Confirm Password */}
          <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-orange-500">

            <Lock
              size={19}
              className="text-gray-400"
            />

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full bg-transparent px-3 py-3.5 outline-none"
            />

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3.5 font-bold text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* Login */}
        <p className="mt-7 text-center text-sm text-gray-500">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-bold text-orange-500 hover:text-orange-600"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;