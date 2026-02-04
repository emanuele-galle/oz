'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface ProductSize {
  id?: string;
  volume: number;
  price: number;
  sku: string;
  stockQuantity: number;
  lowStockThreshold: number;
}

interface OlfactoryNote {
  id?: string;
  category: string;
  note: string;
  order: number;
}

interface ProductImage {
  id?: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
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
    olfactoryNotes?: OlfactoryNote[];
    images?: ProductImage[];
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

  // Olfactory Notes state
  const existingNotes = product?.olfactoryNotes || [];
  const [topNotes, setTopNotes] = useState<string[]>(
    existingNotes.filter((n) => n.category === 'top').sort((a, b) => a.order - b.order).map((n) => n.note)
  );
  const [heartNotes, setHeartNotes] = useState<string[]>(
    existingNotes.filter((n) => n.category === 'heart').sort((a, b) => a.order - b.order).map((n) => n.note)
  );
  const [baseNotes, setBaseNotes] = useState<string[]>(
    existingNotes.filter((n) => n.category === 'base').sort((a, b) => a.order - b.order).map((n) => n.note)
  );
  const [topInput, setTopInput] = useState('');
  const [heartInput, setHeartInput] = useState('');
  const [baseInput, setBaseInput] = useState('');

  // Images state
  const [images, setImages] = useState<ProductImage[]>(product?.images || []);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Note helpers
  const addNote = (category: 'top' | 'heart' | 'base') => {
    const inputMap = { top: topInput, heart: heartInput, base: baseInput };
    const setterMap = { top: setTopNotes, heart: setHeartNotes, base: setBaseNotes };
    const inputSetterMap = { top: setTopInput, heart: setHeartInput, base: setBaseInput };
    const notesMap = { top: topNotes, heart: heartNotes, base: baseNotes };

    const value = inputMap[category].trim();
    if (!value) return;
    if (notesMap[category].includes(value)) return;

    setterMap[category]([...notesMap[category], value]);
    inputSetterMap[category]('');
  };

  const removeNote = (category: 'top' | 'heart' | 'base', index: number) => {
    const setterMap = { top: setTopNotes, heart: setHeartNotes, base: setBaseNotes };
    const notesMap = { top: topNotes, heart: heartNotes, base: baseNotes };
    setterMap[category](notesMap[category].filter((_, i) => i !== index));
  };

  // Image helpers
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Il file supera il limite di 5 MB');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Errore durante l\'upload');
        return;
      }

      setImages([...images, {
        url: data.url,
        alt: file.name.replace(/\.[^.]+$/, ''),
        isPrimary: images.length === 0,
        order: images.length,
      }]);
    } catch {
      setError('Errore di connessione durante l\'upload');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const updateImage = (index: number, field: keyof ProductImage, value: any) => {
    const updated = [...images];
    if (field === 'isPrimary' && value === true) {
      updated.forEach((img, i) => { img.isPrimary = i === index; });
    } else {
      (updated[index] as any)[field] = value;
    }
    setImages(updated);
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    if (updated.length > 0 && !updated.some((img) => img.isPrimary)) {
      updated[0].isPrimary = true;
    }
    setImages(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    // Build olfactory notes array
    const olfactoryNotes: { category: string; note: string; order: number }[] = [
      ...topNotes.map((note, i) => ({ category: 'top', note, order: i })),
      ...heartNotes.map((note, i) => ({ category: 'heart', note, order: i })),
      ...baseNotes.map((note, i) => ({ category: 'base', note, order: i })),
    ];

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
      olfactoryNotes,
      images: images.map((img, i) => ({
        url: img.url,
        alt: img.alt,
        isPrimary: img.isPrimary,
        order: i,
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
                <label className={labelClass}>Prezzo &euro;</label>
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

      {/* Olfactory Notes */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
        <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">Note Olfattive</h3>

        <div className="space-y-4">
          {/* Top Notes */}
          <div>
            <label className={labelClass}>Note di Testa</label>
            <div className="flex gap-2 mb-2">
              <input
                value={topInput}
                onChange={(e) => setTopInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addNote('top'); } }}
                placeholder="es. Bergamotto, Limone..."
                className={inputClass}
              />
              <button type="button" onClick={() => addNote('top')} className="px-3 py-2 bg-stone-700 text-stone-300 text-xs rounded hover:bg-stone-600 flex-shrink-0">
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {topNotes.map((note, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-400 text-xs rounded-full border border-amber-500/20">
                  {note}
                  <button type="button" onClick={() => removeNote('top', i)} className="ml-1 hover:text-amber-200">&times;</button>
                </span>
              ))}
            </div>
          </div>

          {/* Heart Notes */}
          <div>
            <label className={labelClass}>Note di Cuore</label>
            <div className="flex gap-2 mb-2">
              <input
                value={heartInput}
                onChange={(e) => setHeartInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addNote('heart'); } }}
                placeholder="es. Rosa, Gelsomino..."
                className={inputClass}
              />
              <button type="button" onClick={() => addNote('heart')} className="px-3 py-2 bg-stone-700 text-stone-300 text-xs rounded hover:bg-stone-600 flex-shrink-0">
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {heartNotes.map((note, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-rose-500/10 text-rose-400 text-xs rounded-full border border-rose-500/20">
                  {note}
                  <button type="button" onClick={() => removeNote('heart', i)} className="ml-1 hover:text-rose-200">&times;</button>
                </span>
              ))}
            </div>
          </div>

          {/* Base Notes */}
          <div>
            <label className={labelClass}>Note di Fondo</label>
            <div className="flex gap-2 mb-2">
              <input
                value={baseInput}
                onChange={(e) => setBaseInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addNote('base'); } }}
                placeholder="es. Sandalo, Muschio..."
                className={inputClass}
              />
              <button type="button" onClick={() => addNote('base')} className="px-3 py-2 bg-stone-700 text-stone-300 text-xs rounded hover:bg-stone-600 flex-shrink-0">
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {baseNotes.map((note, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-stone-500/10 text-stone-300 text-xs rounded-full border border-stone-500/20">
                  {note}
                  <button type="button" onClick={() => removeNote('base', i)} className="ml-1 hover:text-stone-100">&times;</button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide">Immagini</h3>
          <label className={`px-3 py-1 text-xs bg-stone-700 text-stone-300 rounded hover:bg-stone-600 cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
            {isUploading ? 'Caricamento...' : '+ Carica Immagine'}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {images.map((img, index) => (
              <div key={index} className="bg-stone-800 rounded-lg p-3 border border-stone-700">
                <div className="flex gap-3">
                  <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-stone-700">
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      value={img.alt}
                      onChange={(e) => updateImage(index, 'alt', e.target.value)}
                      placeholder="Testo alternativo"
                      className="w-full px-2 py-1 bg-stone-700 border border-stone-600 rounded text-white text-xs font-inter focus:outline-none focus:border-gold-500"
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="primaryImage"
                          checked={img.isPrimary}
                          onChange={() => updateImage(index, 'isPrimary', true)}
                          className="accent-gold-500"
                        />
                        <span className="text-stone-400 text-xs">Primaria</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-red-400 text-xs hover:text-red-300"
                      >
                        Rimuovi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-stone-500 text-sm text-center py-6">Nessuna immagine. Carica la prima immagine del prodotto.</p>
        )}
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
