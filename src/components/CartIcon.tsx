import { useCart } from "@/contexts/CartContext";
import { ShoppingCartIcon } from "./icons/ShoppingCartIcon";

export const CartIcon = () => {
  const { totalItems } = useCart();

  return (
    <div className="relative cursor-pointer">
      <ShoppingCartIcon className="h-8 w-8 text-gray-600" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
};