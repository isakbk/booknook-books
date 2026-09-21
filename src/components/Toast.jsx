import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type}`}>
      <span>
        {toast.type === "error"
          ? "!"
          : toast.type === "info"
          ? "i"
          : "✓"}
      </span>

      <p>{toast.message}</p>
    </div>
  );
}