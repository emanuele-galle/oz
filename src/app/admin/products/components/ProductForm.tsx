'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProductSize {
  id?: string;
  volume: number;
  price: number;
  sku: string;
  stockQuantity: number;
  lowStockThreshold: number;
}

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    slug: string;
    tagline: string | null;
    description: string;
    story: string | null;
    basePrice: number;
    concentration: string;
    season: string | null;
    gender: string | null;
    active: boolean;
    featured: boolean;
    sizes: ProductSize[];
  };
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!product;

  const [name, setName] = useState(product?.name || '');
  const [slug, setSlug] = useState(product?.slug || '');
  const [tagline, setTagline] = useState(product?.tagline || '');
  const [description, setDescription] = useState(product?.description || '');
  const [story, setStory] = useState(product?.story || '');
  const [basePrice, setBasePrice] = useState(product?.basePrice?.toString() || '');
  const [concentration, setConcentration] = useState(product?.concentration || 'Extrait de Parfum');
  const [season, setSeason] = useState(product?.season || '');
  const [gender, setGender] = useState(product?.gender || 'Unisex');
  const [active, setActive] = useState(product?.active ?? true);
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [sizes, setSizes] = useState<ProductSize[]>(
    product?.sizes || [{ volume: 50, price: 0, sku: '', stockQuantity: 0, lowStockThreshold: 5 }]
  );

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSlugGenerate = () => {
    setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
  };

  const updateSize = (index: number, field: keyof ProductSize, value: string | number) => {
    const updated = [...sizes];
    (updated[index] as any)[field] = value;
    setSizes(updated);
  };

  const addSize = () => {
    setSizes([...sizes, { volume: 30, price: 0, sku: '', stockQuantity: 0, lowStockThreshold: 5 }]);
  };

  const removeSize = (index: number) => {
    if (sizes.length <= 1) return;
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    const payload = {
      name, slug, tagline, description, story, basePrice: parseFloat(basePrice),
      concentration, season, gender, active, featured,
      sizes: sizes.map((s) => ({
        id: s.id,
        volume: typeof s.volume === 'string' ? parseInt(s.volume as any) : s.volume,
        price: typeof s.price === 'string' ? parseFloat(s.price as any) : s.price,
        sku: s.sku,
        stockQuantity: typeof s.stockQuantity === 'string' ? parseInt(s.stockQuantity as any) : s.stockQuantity,
        lowStockThreshold: typeof s.lowStockThreshold === 'string' ? parseInt(s.lowStockThreshold as any) : s.lowStockThreshold,
      })),
    };

    try {
      const url = isEdit ? `/api/admin/products/${product.id}` : '/api/admin/products';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Errore durante il salvataggio');
        return;
      }

      router.push('/admin/products');
      router.refresh();
    } catch {
      setError('Errore di connessione');
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = 'w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded text-white text-sm font-inter focus:outline-none focus:border-gold-500';
  const labelClass = 'block text-stone-400 text-xs mb-1 font-inter';

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">{error}</div>
      )}

      {/* Basic Info */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-6 space-y-4">
        <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-2">Informazioni Base</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nome *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Slug *</label>
            <div className="flex gap-2">
              <input value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} required />
              <button type="button" onClick={handleSlugGenerate} className="px-3 py-2 bg-stone-700 text-stone-300 text-xs rounded hover:bg-stone-600 flex-shrink-0">
                Auto
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>Tagline</label>
          <input value={tagline} onChange={(e) => setTagline(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Descrizione *</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${inputClass} resize-none`} rows={4} required />
        </div>

        <div>
          <label className={labelClass}>Storia</label>
          <textarea value={story} onChange={(e) => setStory(e.target.value)} className={`${inputClass} resize-none`} rows={3} />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className={labelClass}>Prezzo Base *</label>
            <input type="number" step="0.01" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Concentrazione</label>
            <select value={concentration} onChange={(e) => setConcentration(e.target.value)} className={inputClass}>
              <option>Extrait de Parfum</option>
              <option>Eau de Parfum</option>
              <option>Eau de Toilette</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Stagione</label>
            <select value={season} onChange={(e) => setSeason(e.target.value)} className={inputClass}>
              <option value="">-</option>
              <option>Year-round</option>
              <option>Spring</option>
              <option>Summer</option>
              <option>Fall</option>
              <option>Winter</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Genere</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputClass}>
              <option>Unisex</option>
              <option>Men</option>
              <option>Women</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="accent-gold-500" />
            <span className="text-stone-300 text-sm">Attivo</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="accent-gold-500" />
            <span className="text-stone-300 text-sm">In Evidenza</span>
          </label>
        </div>
      </div>

      {/* Sizes */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide">Formati</h3>
          <button type="button" onClick={addSize} className="px-3 py-1 text-xs bg-stone-700 text-stone-300 rounded hover:bg-stone-600">
            + Aggiungi Formato
          </button>
        </div>

        <div className="space-y-4">
          {sizes.map((size, index) => (
            <div key={index} className="grid grid-cols-5 gap-3 items-end">
              <div>
                <label className={labelClass}>Volume (ml)</label>
                <input type="number" value={size.volume} onChange={(e) => updateSize(index, 'volume', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Prezzo €</label>
                <input type="number" step="0.01" value={size.price} onChange={(e) => updateSize(index, 'price', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>SKU</label>
                <input value={size.sku} onChange={(e) => updateSize(index, 'sku', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Stock</label>
                <input type="number" value={size.stockQuantity} onChange={(e) => updateSize(index, 'stockQuantity', e.target.value)} className={inputClass} />
              </div>
              <div>
                {sizes.length > 1 && (
                  <button type="button" onClick={() => removeSize(index)} className="px-3 py-2 text-red-400 text-sm hover:bg-red-500/10 rounded">
                    Rimuovi
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-3 bg-gold-500 text-stone-950 font-inter text-sm font-semibold rounded hover:bg-gold-400 transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Salvataggio...' : isEdit ? 'Salva Modifiche' : 'Crea Prodotto'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="px-8 py-3 border border-stone-700 text-stone-300 font-inter text-sm rounded hover:border-stone-500 transition-colors"
        >
          Annulla
        </button>
      </div>
    </form>
  );
}
