import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import { Product } from '@/components/ProductCard';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextData {
  items: CartItem[];
  totalItems: number;
  addProductToCart: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  fetchCart: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return;
    }

    try {
      const response = await api.get('/cart');
      setItems(response.data?.items || []);
    } catch (error) {
      console.error("Erro ao buscar o carrinho:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addProductToCart = async (productId: string) => {
    try {
      await api.post('/cart/add-product', {
        productId: productId,
        quantity: 1,
      });
      await fetchCart();
      // toast.success("Produto adicionado ao carrinho!");
    } catch (error) {
      toast.error("Erro ao adicionar produto ao carrinho.");
      console.error(error);
    }
  };
  
  const removeProductFromCart = async (productId: string) => {
    try {
      await api.delete('/cart/remove-product', {
        data: { productId },
      });
      await fetchCart();
      toast.success("Produto removido do carrinho!");
    } catch (error) {
      toast.error("Erro ao remover produto do carrinho.");
      console.error(error);
    }
  };

  const decreaseQuantity = async (productId: string) => {
    try {
      await api.patch('/cart/decrease-quantity', {
        productId: productId,
        quantity: 1,
      });
      await fetchCart();
      // toast.info("Quantidade do produto atualizada.");
    } catch (error) {
      toast.error("Erro ao atualizar a quantidade.");
      console.error(error);
    }
  };
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, totalItems, addProductToCart, removeProductFromCart, decreaseQuantity, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};