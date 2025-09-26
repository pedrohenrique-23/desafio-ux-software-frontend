// src/pages/index.tsx
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Product, ProductCard } from '@/components/ProductCard';
import { toast } from 'react-toastify';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        // AQUI ESTÁ A CORREÇÃO: Acessamos a chave 'products' da resposta
        setProducts(response.data.products); 
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        toast.error("Não foi possível carregar os produtos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Nossos Produtos
          </h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {isLoading ? (
            <p className="text-center text-gray-500">Carregando produtos...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;