'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { TextReveal } from '@/components/effects/TextReveal';
import { toast } from 'sonner';

export function EnhancedNewsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Grazie! Ti sei iscritto alla newsletter.', {
      description: 'Riceverai le nostre ultime novità e offerte esclusive.',
    });

    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section className="relative section-padding bg-gradient-to-br from-zinc-900 via-black to-zinc-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />

      <div className="container-luxury relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="font-cinzel text-5xl md:text-6xl text-gold mb-6">
              Scopri il Lusso
            </h2>
            <div className="h-1 w-32 bg-gold mx-auto mb-8" />
            <TextReveal
              className="font-playfair text-xl md:text-2xl text-white/80 leading-relaxed"
              delay={0.2}
            >
              Iscriviti alla nostra newsletter per ricevere novità esclusive fragranze in anteprima e
              offerte riservate
            </TextReveal>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <motion.div
                className="relative flex-1 max-w-md w-full"
                whileFocus={{ scale: 1.02 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="La tua email"
                  required
                  className="w-full px-8 py-5 bg-white/5 backdrop-blur-sm border-2 border-gold/30 rounded-full text-white placeholder-white/40 font-inter focus:outline-none focus:border-gold transition-all duration-300"
                  disabled={isSubmitting}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold/20 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>

              <MagneticButton
                intensity={0.4}
                className="px-12 py-5 bg-gold text-black font-inter font-bold rounded-full uppercase tracking-wider shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:bg-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {}}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                    />
                    Invio...
                  </span>
                ) : (
                  'Iscriviti'
                )}
              </MagneticButton>
            </div>

            {/* Privacy notice */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-sm text-white/50 font-inter"
            >
              Rispettiamo la tua privacy. Nessuno spam, solo eleganza.
            </motion.p>
          </motion.form>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            {[
              { icon: '✨', title: 'Anteprime Esclusive', desc: 'Scopri le nuove fragranze prima di tutti' },
              { icon: '🎁', title: 'Offerte Riservate', desc: 'Sconti esclusivi per gli iscritti' },
              { icon: '📚', title: 'Contenuti Premium', desc: 'Guide e consigli sul mondo della profumeria' },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-cinzel text-lg text-gold mb-2">{benefit.title}</h3>
                <p className="text-sm text-white/60 font-inter">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
