// src/components/ProductCard.tsx

// Define a "forma" de um objeto de produto, para o TypeScript entender
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={product.image || 'https://via.placeholder.com/300'} // Imagem placeholder caso não haja
        alt={product.name} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};