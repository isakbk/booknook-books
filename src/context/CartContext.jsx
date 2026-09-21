import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("booknook_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [coupon, setCoupon] = useState(() => {
    return localStorage.getItem("booknook_coupon") || "";
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("booknook_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem("booknook_coupon", coupon);
    } else {
      localStorage.removeItem("booknook_coupon");
    }
  }, [coupon]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, product.stock),
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    showToast(`${product.title} added to cart`);
  };

  const updateQuantity = (id, quantity) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, Math.min(quantity, item.stock)),
            }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
    showToast("Item removed from cart", "info");
  };

  const clearCart = () => {
    setCart([]);
    setCoupon("");
  };

  const applyCoupon = (code) => {
    const normalized = code.trim().toUpperCase();

    if (normalized === "BOOK10") {
      setCoupon("BOOK10");
      showToast("10% discount applied");
      return true;
    }

    if (normalized === "WELCOME20") {
      setCoupon("WELCOME20");
      showToast("20% discount applied");
      return true;
    }

    showToast("Invalid coupon code", "error");
    return false;
  };

  const removeCoupon = () => {
    setCoupon("");
    showToast("Coupon removed", "info");
  };

  const totals = useMemo(() => {
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    let discount = 0;

    if (coupon === "BOOK10") {
      discount = subtotal * 0.1;
    }

    if (coupon === "WELCOME20") {
      discount = subtotal * 0.2;
    }

    const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 49;
    const total = subtotal - discount + shipping;

    return {
      subtotal,
      discount,
      shipping,
      total,
    };
  }, [cart, coupon]);

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    coupon,
    applyCoupon,
    removeCoupon,
    totals,
    itemCount,
    toast,
    showToast,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}