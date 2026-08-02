import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Heart,
  Utensils,
  ShoppingBag,
  LogOut,
  Edit,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    favoriteCuisines: [],
    dietaryPreference: "",
    healthGoal: "",
  });

  // Get Profile
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "https://smartbite-backend-ctwv.onrender.com/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      setUser(data.user);

      setFormData({
        name: data.user.name || "",
        phone: data.user.phone || "",
        location: data.user.location || "",
        favoriteCuisines:
          data.user.favoriteCuisines || [],
        dietaryPreference:
          data.user.dietaryPreference || "",
        healthGoal:
          data.user.healthGoal || "",
      });
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update Profile
  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://smartbite-backend-ctwv.onrender.com/api/auth/profile",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
          "Failed to update profile"
        );

        return;
      }

      setUser(data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setIsEditing(false);

    } catch (error) {
      console.error(error);

      setError(
        "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <p className="font-semibold text-orange-500">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-orange-50/40 px-4 py-10 md:px-8">

      <main className="mx-auto max-w-5xl">

        {/* Profile Header */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

          <div className="h-32 bg-gradient-to-r from-orange-500 to-red-500" />

          <div className="px-6 pb-7 md:px-8">

            <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex items-end gap-4">

                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-orange-100 text-orange-500 shadow-md">
                  <User size={42} />
                </div>

                <div className="pb-1">

                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.name}
                  </h1>

                  <p className="text-sm text-gray-500">
                    SmartBite Member
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                {!isEditing && (
                  <button
                    onClick={() =>
                      setIsEditing(true)
                    }
                    className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
                  >
                    <Edit size={18} />
                    Edit Profile
                  </button>
                )}

                {isEditing && (
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-xl bg-green-500 px-5 py-2.5 font-semibold text-white hover:bg-green-600 disabled:opacity-60"
                  >
                    <Save size={18} />

                    {saving
                      ? "Saving..."
                      : "Save"}
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 font-semibold text-red-500 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Profile Information */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Personal Information */}
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">

            <h2 className="text-xl font-bold text-gray-900">
              Personal Information
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              {/* Name */}
              <div className="rounded-xl bg-gray-50 p-4">

                <div className="flex items-center gap-3">

                  <User
                    className="text-orange-500"
                    size={20}
                  />

                  <p className="text-xs text-gray-500">
                    Full Name
                  </p>

                </div>

                {isEditing ? (
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none focus:border-orange-500"
                  />
                ) : (
                  <p className="mt-2 font-semibold text-gray-900">
                    {user.name}
                  </p>
                )}

              </div>

              {/* Email */}
              <div className="rounded-xl bg-gray-50 p-4">

                <div className="flex items-center gap-3">

                  <Mail
                    className="text-orange-500"
                    size={20}
                  />

                  <p className="text-xs text-gray-500">
                    Email
                  </p>

                </div>

                <p className="mt-2 font-semibold text-gray-900">
                  {user.email}
                </p>

              </div>

              {/* Phone */}
              <div className="rounded-xl bg-gray-50 p-4">

                <div className="flex items-center gap-3">

                  <Phone
                    className="text-orange-500"
                    size={20}
                  />

                  <p className="text-xs text-gray-500">
                    Phone
                  </p>

                </div>

                {isEditing ? (
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none focus:border-orange-500"
                  />
                ) : (
                  <p className="mt-2 font-semibold text-gray-900">
                    {user.phone}
                  </p>
                )}

              </div>

              {/* Location */}
              <div className="rounded-xl bg-gray-50 p-4">

                <div className="flex items-center gap-3">

                  <MapPin
                    className="text-orange-500"
                    size={20}
                  />

                  <p className="text-xs text-gray-500">
                    Location
                  </p>

                </div>

                {isEditing ? (
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your location"
                    className="mt-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none focus:border-orange-500"
                  />
                ) : (
                  <p className="mt-2 font-semibold text-gray-900">
                    {user.location ||
                      "Not provided"}
                  </p>
                )}

              </div>

            </div>

          </div>

          {/* Food Preferences */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-orange-100 p-3 text-orange-500">
                <Heart size={21} />
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                Food Preferences
              </h2>

            </div>

            {/* Dietary Preference */}
            <div className="mt-6">

              <p className="text-sm font-semibold text-gray-700">
                Dietary Preference
              </p>

              {isEditing ? (
                <select
                  name="dietaryPreference"
                  value={
                    formData.dietaryPreference
                  }
                  onChange={handleChange}
                  className="mt-3 w-full rounded-xl border border-gray-200 px-3 py-3 outline-none focus:border-orange-500"
                >
                  <option value="">
                    Select Preference
                  </option>

                  <option value="Vegetarian">
                    Vegetarian
                  </option>

                  <option value="Non-Vegetarian">
                    Non-Vegetarian
                  </option>

                  <option value="Vegan">
                    Vegan
                  </option>
                </select>
              ) : (
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-700">
                  <Utensils size={17} />

                  {user.dietaryPreference ||
                    "Not provided"}
                </div>
              )}

            </div>

            {/* Health Goal */}
            <div className="mt-6">

              <p className="text-sm font-semibold text-gray-700">
                Health Goal
              </p>

              {isEditing ? (
                <select
                  name="healthGoal"
                  value={formData.healthGoal}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-xl border border-gray-200 px-3 py-3 outline-none focus:border-orange-500"
                >
                  <option value="">
                    Select Goal
                  </option>

                  <option value="High Protein">
                    High Protein
                  </option>

                  <option value="Low Calorie">
                    Low Calorie
                  </option>

                  <option value="Weight Management">
                    Weight Management
                  </option>
                </select>
              ) : (
                <div className="mt-3 rounded-xl bg-blue-50 p-3 text-sm font-medium text-blue-700">
                  {user.healthGoal ||
                    "Not provided"}
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Order History */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-orange-100 p-3 text-orange-500">
              <ShoppingBag size={21} />
            </div>

            <div>

              <h2 className="text-xl font-bold text-gray-900">
                Recent Orders
              </h2>

              <p className="text-sm text-gray-500">
                Your recent food orders
              </p>

            </div>

          </div>

          <div className="mt-6 rounded-xl border border-dashed border-gray-200 p-8 text-center">

            <ShoppingBag
              size={35}
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 font-semibold text-gray-700">
              No recent orders
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Your order history will appear here.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Profile;