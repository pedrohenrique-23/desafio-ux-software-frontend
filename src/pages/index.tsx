import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/services/api';
import { Product, ProductCard } from '@/components/ProductCard';
import { toast } from 'react-toastify';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { CartIcon } from '@/components/CartIcon';
import { CartSidebar } from '@/components/CartSidebar';
import { useAuth } from '@/hooks/useAuth';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [createName, setCreateName] = useState('');
  const [createDescription, setCreateDescription] = useState('');
  const [createPrice, setCreatePrice] = useState('');
  const [createImageFile, setCreateImageFile] = useState<File | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
    } else {
      fetchProducts();
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    toast.info("Você foi desconectado.");
    router.push('/login');
  };

  const fetchProducts = async () => { 
    try { 
      setIsLoading(true); 
      const response = await api.get('/products'); 
      setProducts(response.data.products); 
    } catch (error) { 
      toast.error("Não foi possível carregar os produtos."); 
    } finally { 
      setIsLoading(false); 
    } 
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => { if (event.target.files && event.target.files[0]) { setCreateImageFile(event.target.files[0]); } };
  
  const handleCreateProduct = async (event: FormEvent) => { event.preventDefault(); if (!createImageFile) { toast.error("Por favor, selecione uma imagem."); return; } const formData = new FormData(); formData.append('name', createName); formData.append('description', createDescription); formData.append('price', createPrice); formData.append('image', createImageFile); try { await api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Produto criado com sucesso!'); setIsCreateModalOpen(false); fetchProducts(); } catch (error) { toast.error('Erro ao criar o produto.'); } };

  const handleDeleteProduct = async (productId: string) => { const confirmed = window.confirm("Você tem certeza que deseja deletar este produto?"); if (confirmed) { try { await api.delete(`/products/${productId}`); toast.success("Produto deletado com sucesso!"); setProducts(products.filter(p => p.id !== productId)); } catch (error) { toast.error("Erro ao deletar o produto."); } } };

  const handleOpenEditModal = (product: Product) => { setEditingProduct(product); setEditName(product.name); setEditDescription(product.description); setEditPrice(String(product.price)); setEditImageUrl(product.imageUrl); setIsEditModalOpen(true); };
  
  const handleUpdateProduct = async (event: FormEvent) => { event.preventDefault(); if (!editingProduct) return; const updatedData = { name: editName, description: editDescription, price: Number(editPrice), imageUrl: editImageUrl }; try { await api.put(`/products/${editingProduct.id}`, updatedData); toast.success("Produto atualizado com sucesso!"); setIsEditModalOpen(false); fetchProducts(); } catch (error) { toast.error("Erro ao atualizar o produto."); } };

  if (isLoading || (typeof window !== 'undefined' && !localStorage.getItem('accessToken'))) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><p>Carregando...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Nossos Produtos</h1>
          
          <div className="flex items-center gap-4">
            {/* O botão de Criar só aparece se o usuário for ADMIN */}
            {user?.role === 'ADMIN' && (
              <button onClick={() => { setCreateName(''); setCreateDescription(''); setCreatePrice(''); setCreateImageFile(null); setIsCreateModalOpen(true); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Criar Novo Produto
              </button>
            )}
            
            <div onClick={() => setIsCartOpen(true)} className="cursor-pointer">
              <CartIcon />
            </div>
            <button
              onClick={handleLogout}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              title="Sair"
            >
              Sair
            </button>
          </div>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => ( 
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onDelete={handleDeleteProduct} 
                  onEdit={handleOpenEditModal} 
                /> 
              ))}
            </div>
        </div>
      </main>

      {/* Modal de Criação (com upload de arquivo) */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Criar Novo Produto">
        <form onSubmit={handleCreateProduct}>
          <Input id="createName" label="Nome do Produto" type="text" value={createName} onChange={(e) => setCreateName(e.target.value)} required />
          <Input id="createDescription" label="Descrição" type="text" value={createDescription} onChange={(e) => setCreateDescription(e.target.value)} required />
          <Input id="createPrice" label="Preço" type="number" step="0.01" value={createPrice} onChange={(e) => setCreatePrice(e.target.value)} required />
          <Input id="createImage" label="Imagem do Produto" type="file" onChange={handleFileChange} required />
          <button type="submit" className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Salvar Produto
          </button>
        </form>
      </Modal>

      {/* Modal de Edição (com URL de texto) */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Editar Produto">
         <form onSubmit={handleUpdateProduct}>
           <Input id="editName" label="Nome do Produto" type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required />
          <Input id="editDescription" label="Descrição" type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} required />
          <Input id="editPrice" label="Preço" type="number" step="0.01" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} required />
          <Input id="editImageUrl" label="URL da Imagem" type="text" value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} required />
          <button type="submit" className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
            Atualizar Produto
          </button>
        </form>
      </Modal>
      
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default HomePage;