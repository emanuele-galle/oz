import { ProductForm } from '../components/ProductForm';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export default function AdminProductNewPage() {
  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Prodotti', href: '/admin/products' },
        { label: 'Nuovo' },
      ]} />
      <h1 className="font-cinzel text-2xl text-white mb-8">Nuovo Prodotto</h1>
      <ProductForm />
    </div>
  );
}
