export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Shimmer OZ logo */}
        <div className="relative">
          <h1 className="font-cinzel text-6xl text-gold-500/20">OZ</h1>
          <div className="absolute inset-0 animate-pulse">
            <h1 className="font-cinzel text-6xl text-gold-gradient">OZ</h1>
          </div>
        </div>
        <div className="mt-4 w-24 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto animate-pulse" />
      </div>
    </div>
  );
}
