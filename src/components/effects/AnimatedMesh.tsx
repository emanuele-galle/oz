'use client';

import { useEffect, useRef } from 'react';

export function AnimatedMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGradient = () => {
      const { width, height } = canvas;

      // Create animated gradient
      const x1 = width / 2 + Math.sin(time * 0.0008) * width * 0.3;
      const y1 = height / 2 + Math.cos(time * 0.0006) * height * 0.3;
      const x2 = width / 2 + Math.sin(time * 0.0005 + Math.PI) * width * 0.3;
      const y2 = height / 2 + Math.cos(time * 0.0007 + Math.PI) * height * 0.3;

      const gradient = ctx.createRadialGradient(x1, y1, 0, x2, y2, width * 0.8);

      // Gold luxury colors
      gradient.addColorStop(0, 'rgba(212, 175, 55, 0.15)'); // Gold
      gradient.addColorStop(0.5, 'rgba(184, 148, 31, 0.08)'); // Dark gold
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Transparent black

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGradient();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
