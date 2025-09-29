import { useCart } from "@/contexts/CartContext";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
  onDelete: (productId: string) => void;
  onEdit: (product: Product) => void;
}

export const ProductCard = ({ product, onDelete, onEdit }: ProductCardProps) => {
  const { addProductToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
      <div>
        <img 
          src={product.imageUrl || 'https://via.placeholder.com/300'} 
          alt={product.name} 
          className="w-full h-48 object-cover" 
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <p className="text-gray-600 mt-2 h-20 overflow-hidden">{product.description}</p>
        </div>
      </div>
      <div className="p-4 border-t">
        <span className="text-xl font-bold text-gray-900">
          R$ {Number(product.price).toFixed(2).replace('.', ',')}
        </span>
        <div className="flex items-center justify-end gap-2 mt-4">
          <button
            onClick={() => onEdit(product)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 rounded text-sm"
          >
            Editar
          </button>
          <button 
            onClick={() => onDelete(product.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-sm"
          >
            Excluir
          </button>
          <button 
            onClick={() => addProductToCart(product.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-sm"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};