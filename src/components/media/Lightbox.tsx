'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { backdropVariants, modalVariants } from '@/lib/animations/microInteractions';

export interface LightboxMedia {
  type: 'image' | 'video';
  url: string;
  alt?: string;
  posterUrl?: string; // For video thumbnail
}

interface LightboxProps {
  isOpen: boolean;
  media: LightboxMedia[];
  initialIndex?: number;
  onClose: () => void;
}

export function Lightbox({ isOpen, media, initialIndex = 0, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Client-side rendering only (portal requires document)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset index quando lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoomLevel(1);
    }
  }, [isOpen, initialIndex]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
    setZoomLevel(1);
  }, [media.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    setZoomLevel(1);
  }, [media.length]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (media[currentIndex].type !== 'image') return;

    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const currentMedia = media[currentIndex];

  if (!mounted || !isOpen) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation arrows (se multi-media) */}
          {media.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-6 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-gold hover:text-black transition-all disabled:opacity-50"
                aria-label="Previous media"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-6 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-gold hover:text-black transition-all disabled:opacity-50"
                aria-label="Next media"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Zoom controls (solo per immagini) */}
          {currentMedia.type === 'image' && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-2 text-white hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Zoom out"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>
              <span className="px-3 py-1 text-white/80 text-sm font-inter">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="p-2 text-white hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Zoom in"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </button>
            </div>
          )}

          {/* Media content */}
          <motion.div
            className="relative z-0 max-w-7xl max-h-[90vh] w-full mx-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onWheel={handleWheel}
          >
            <AnimatePresence mode="wait">
              {currentMedia.type === 'image' ? (
                <motion.div
                  key={currentIndex}
                  className="relative w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-300 ease-out"
                    style={{
                      transform: `scale(${zoomLevel})`,
                      cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in',
                    }}
                    onClick={() => {
                      if (zoomLevel > 1) {
                        setZoomLevel(1);
                      } else {
                        handleZoomIn();
                      }
                    }}
                  >
                    <Image
                      src={currentMedia.url}
                      alt={currentMedia.alt || 'Lightbox image'}
                      width={1920}
                      height={1440}
                      className="w-full h-auto max-h-[90vh] object-contain"
                      priority
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentIndex}
                  className="relative w-full aspect-video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <video
                    src={currentMedia.url}
                    poster={currentMedia.posterUrl}
                    controls
                    autoPlay
                    className="w-full h-full rounded-lg"
                  >
                    Your browser does not support video playback.
                  </video>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Counter (se multi-media) */}
          {media.length > 1 && (
            <div className="absolute top-6 left-6 z-10 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white font-inter text-sm">
              {currentIndex + 1} / {media.length}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
