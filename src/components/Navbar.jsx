import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Sparkles,
  User,
  LogOut,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { totalItems } = useCart();
  const navigate = useNavigate();

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setIsMenuOpen(false);

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-xl">
            🍴
          </div>

          <span className="text-2xl font-bold text-gray-900">
            Smart<span className="text-orange-500">Bite</span>
          </span>

        </Link>


        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="font-medium text-gray-700 transition hover:text-orange-500"
          >
            Home
          </Link>

          <Link
            to="/restaurants"
            className="font-medium text-gray-700 transition hover:text-orange-500"
          >
            Restaurants
          </Link>

          <Link
            to="/ai-assistant"
            className="flex items-center gap-1 font-medium text-gray-700 transition hover:text-orange-500"
          >
            <Sparkles size={17} />
            AI Assistant
          </Link>

        </div>


        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">

          {/* Search */}
          <button
            className="rounded-full p-2 text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
          >
            <Search size={21} />
          </button>


          {/* Cart */}
          <Link
            to="/cart"
            className="relative rounded-full p-2 text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
          >

            <ShoppingCart size={21} />

            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}

          </Link>


          {/* Login / Profile / Logout */}
          {isLoggedIn ? (
            <>

              {/* Profile */}
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-full border border-orange-500 px-5 py-2.5 font-semibold text-orange-500 transition hover:bg-orange-50"
              >
                <User size={18} />
                Profile
              </Link>


              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2.5 font-semibold text-white shadow-md transition hover:scale-105 hover:shadow-lg"
              >
                <LogOut size={18} />
                Logout
              </button>

            </>
          ) : (

            /* Login */
            <Link
              to="/login"
              className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2.5 font-semibold text-white shadow-md transition hover:scale-105 hover:shadow-lg"
            >
              Login
            </Link>

          )}

        </div>


        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-gray-700 md:hidden"
        >
          {isMenuOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>

      </div>


      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-5 md:hidden">

          <div className="flex flex-col gap-4">

            {/* Home */}
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500"
            >
              Home
            </Link>


            {/* Restaurants */}
            <Link
              to="/restaurants"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500"
            >
              Restaurants
            </Link>


            {/* AI Assistant */}
            <Link
              to="/ai-assistant"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500"
            >
              <Sparkles size={17} />
              AI Assistant
            </Link>


            {/* Cart */}
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500"
            >

              <div className="flex items-center gap-2">
                <ShoppingCart size={18} />
                Cart
              </div>

              {totalItems > 0 && (
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-orange-500 px-1.5 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}

            </Link>


            {/* Logged In Mobile Menu */}
            {isLoggedIn ? (
              <>

                {/* Profile */}
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                >
                  <User size={18} />
                  Profile
                </Link>


                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 font-semibold text-white"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </>
            ) : (

              /* Login */
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-center font-semibold text-white"
              >
                Login
              </Link>

            )}

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;