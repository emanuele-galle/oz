'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  title: string;
  icon: string;
  items: FAQItem[];
}

interface FAQAccordionProps {
  categories: FAQCategory[];
}

export function FAQAccordion({ categories }: FAQAccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="space-y-10">
      {categories.map((category, catIdx) => (
        <div key={catIdx}>
          {/* Category header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl">{category.icon}</span>
            <h2 className="font-cinzel text-xl text-stone-900">
              {category.title}
            </h2>
          </div>

          {/* Items */}
          <div className="border border-stone-200 divide-y divide-stone-200 bg-white">
            {category.items.map((item, itemIdx) => {
              const id = `${catIdx}-${itemIdx}`;
              const isOpen = openItem === id;

              return (
                <div key={itemIdx}>
                  <button
                    onClick={() => toggle(id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${id}`}
                    id={`faq-question-${id}`}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-stone-50/50 transition-colors duration-200"
                  >
                    <span
                      className={cn(
                        'font-inter text-sm font-medium transition-colors duration-200',
                        isOpen ? 'text-gold-600' : 'text-stone-800'
                      )}
                    >
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 flex-shrink-0 transition-transform duration-300',
                        isOpen ? 'rotate-180 text-gold-500' : 'text-stone-400'
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${id}`}
                        role="region"
                        aria-labelledby={`faq-question-${id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4">
                          <p className="font-inter text-sm text-stone-600 leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
