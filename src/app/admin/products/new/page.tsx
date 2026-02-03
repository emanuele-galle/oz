import { ProductForm } from '../components/ProductForm';

export default function AdminProductNewPage() {
  return (
    <div>
      <a href="/admin/products" className="text-stone-400 text-sm hover:text-gold-500 font-inter mb-4 inline-block">
        ← Torna ai Prodotti
      </a>
      <h1 className="font-cinzel text-2xl text-white mb-8">Nuovo Prodotto</h1>
      <ProductForm />
    </div>
  );
}
