'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: 'danger' | 'default';
}

export function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  title,
  message,
  confirmLabel = 'Conferma',
  variant = 'default',
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/60"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="relative bg-stone-900 border border-stone-800 rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl"
          >
            <h3 className="text-white font-cinzel text-lg mb-2">{title}</h3>
            <p className="text-stone-400 text-sm font-inter mb-6">{message}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={onCancel}
                className="px-4 py-2 border border-stone-700 text-stone-300 text-sm font-inter rounded hover:border-stone-500 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={onConfirm}
                className={`px-4 py-2 text-sm font-inter font-semibold rounded transition-colors ${
                  variant === 'danger'
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gold-500 text-stone-950 hover:bg-gold-400'
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
