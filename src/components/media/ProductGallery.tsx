'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbox, LightboxMedia } from './Lightbox';
import { ProductImage } from '@/types/product';
import { tabContentVariants } from '@/lib/animations/microInteractions';
import { useReducedMotion } from '@/hooks';

interface ProductGalleryProps {
  images: ProductImage[];
  videoUrl?: string;
  videoPosterUrl?: string;
  productName: string;
}

type TabType = 'images' | 'video';

export function ProductGallery({ images, videoUrl, videoPosterUrl, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState<TabType>('images');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const mainImageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedTab !== 'images') return;

      if (e.key === 'ArrowLeft' && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      } else if (e.key === 'ArrowRight' && selectedIndex < images.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length, selectedTab]);

  // Mouse move per zoom preview
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || shouldReduceMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  // Prepare lightbox media
  const lightboxMedia: LightboxMedia[] = [
    ...images.map((img) => ({
      type: 'image' as const,
      url: img.url,
      alt: img.alt,
    })),
    ...(videoUrl
      ? [
          {
            type: 'video' as const,
            url: videoUrl,
            posterUrl: videoPosterUrl,
            alt: `${productName} video demo`,
          },
        ]
      : []),
  ];

  const handleTabChange = (tab: TabType) => {
    setSelectedTab(tab);
    setIsZoomed(false);
  };

  return (
    <div className="space-y-4">
      {/* Tab Switcher (se video disponibile) */}
      {videoUrl && (
        <div className="flex gap-2 border-b border-white/10">
          <button
            onClick={() => handleTabChange('images')}
            className={`px-6 py-3 font-inter text-sm uppercase tracking-wide transition-all relative ${
              selectedTab === 'images'
                ? 'text-gold'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            Immagini
            {selectedTab === 'images' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                layoutId="activeTab"
              />
            )}
          </button>
          <button
            onClick={() => handleTabChange('video')}
            className={`px-6 py-3 font-inter text-sm uppercase tracking-wide transition-all relative ${
              selectedTab === 'video'
                ? 'text-gold'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            Video Demo
            {selectedTab === 'video' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                layoutId="activeTab"
              />
            )}
          </button>
        </div>
      )}

      {/* Gallery Content */}
      <AnimatePresence mode="wait">
        {selectedTab === 'images' ? (
          <motion.div
            key="images"
            variants={shouldReduceMotion ? undefined : tabContentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-[auto,1fr] gap-4"
          >
            {/* Thumbnails - Vertical scrollable */}
            <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`relative aspect-square w-20 rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedIndex === index
                      ? 'border-gold scale-105'
                      : 'border-white/10 hover:border-gold/50'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image - Clickable con zoom hover */}
            <div
              ref={mainImageRef}
              className="relative aspect-[3/4] rounded-lg overflow-hidden bg-midnight cursor-zoom-in group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsZoomed(false)}
              onClick={() => setIsLightboxOpen(true)}
            >
              <motion.div
                className="relative w-full h-full"
                animate={
                  isZoomed && !shouldReduceMotion
                    ? {
                        scale: 2,
                        x: (50 - mousePosition.x) * 2,
                        y: (50 - mousePosition.y) * 2,
                      }
                    : { scale: 1, x: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Image
                  src={images[selectedIndex].url}
                  alt={images[selectedIndex].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Zoom hint overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-inter text-sm uppercase tracking-wide">
                    Click per ingrandire
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="video"
            variants={shouldReduceMotion ? undefined : tabContentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative aspect-video rounded-lg overflow-hidden bg-midnight"
          >
            <video
              src={videoUrl}
              poster={videoPosterUrl}
              controls
              className="w-full h-full"
            >
              Il tuo browser non supporta la riproduzione video.
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image counter (solo su tab images) */}
      {selectedTab === 'images' && images.length > 1 && (
        <div className="text-center">
          <span className="text-white/50 font-inter text-sm">
            {selectedIndex + 1} / {images.length}
          </span>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        media={lightboxMedia}
        initialIndex={selectedTab === 'images' ? selectedIndex : images.length}
        onClose={() => setIsLightboxOpen(false)}
      />

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.8);
        }
      `}</style>
    </div>
  );
}
