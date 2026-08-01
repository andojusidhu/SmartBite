import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // Add item to cart
  const addToCart = (food) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === food.id &&
          item.restaurantId === food.restaurantId
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === food.id &&
          item.restaurantId === food.restaurantId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...food,
          quantity: 1,
        },
      ];
    });
  };

  // Increase quantity
  const increaseQuantity = (id, restaurantId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id &&
        item.restaurantId === restaurantId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id, restaurantId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id &&
          item.restaurantId === restaurantId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const removeFromCart = (id, restaurantId) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.restaurantId === restaurantId
          )
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  // Total items
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);