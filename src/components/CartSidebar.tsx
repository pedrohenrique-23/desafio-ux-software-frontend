// src/components/CartSidebar.tsx
import { useCart } from "@/contexts/CartContext";
import { TrashIcon } from "./icons/TrashIcon";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { items, totalItems, removeProductFromCart, addProductToCart, decreaseQuantity } = useCart();

  const totalPrice = items.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  return (
    <>
      {/* Overlay (fundo escuro) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      {/* Painel do Carrinho */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cabeçalho do Carrinho */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Seu Carrinho ({totalItems})</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-3xl font-bold">&times;</button>
          </div>

          {/* Itens do Carrinho */}
          <div className="flex-grow p-4 overflow-y-auto">
            {totalItems > 0 ? (
              items.map((item, index) => (
                // --- AQUI COMEÇAM AS MUDANÇAS DE ESTILO ---
                <div key={item.product.id} className={`flex items-start gap-4 py-4 ${index < items.length - 1 ? 'border-b' : ''}`}>
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded-md"/>
                  
                  <div className="flex-grow flex flex-col h-20 justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 text-base">{item.product.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => decreaseQuantity(item.product.id)} className="border rounded-md w-6 h-6 text-lg font-bold flex items-center justify-center hover:bg-gray-100">-</button>
                      <span className="text-base text-gray-700 w-5 text-center">
                        {item.quantity}
                      </span>
                      <button onClick={() => addProductToCart(item.product.id)} className="border rounded-md w-6 h-6 text-lg font-bold flex items-center justify-center hover:bg-gray-100">+</button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end h-20 justify-between">
                    <span className="font-bold text-gray-800">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                    <button 
                      onClick={() => removeProductFromCart(item.product.id)} 
                      className="text-gray-400 hover:text-red-600"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                // --- AQUI TERMINAM AS MUDANÇAS DE ESTILO ---
              ))
            ) : (
              <p className="text-center text-gray-500 mt-10">Seu carrinho está vazio.</p>
            )}
          </div>
          
          {/* Rodapé do Carrinho */}
          {totalItems > 0 && (
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-700">Total:</span>
                <span className="text-xl font-bold text-gray-900">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg">
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};