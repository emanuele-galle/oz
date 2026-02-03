export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-stone-950">
      <div className="grid lg:grid-cols-[60%_40%] min-h-screen">
        {/* Image skeleton */}
        <div className="bg-stone-900 animate-pulse" />

        {/* Info skeleton */}
        <div className="p-12 space-y-6">
          <div className="h-4 w-32 bg-white/5 rounded animate-pulse mt-20" />
          <div className="h-12 w-64 bg-white/5 rounded animate-pulse" />
          <div className="h-6 w-48 bg-white/5 rounded animate-pulse" />
          <div className="h-px bg-gold-500/10" />
          <div className="h-10 w-28 bg-white/5 rounded animate-pulse" />
          <div className="h-24 w-full bg-white/5 rounded animate-pulse" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-white/5 rounded animate-pulse" />
            ))}
          </div>
          <div className="h-14 w-full bg-gold-500/20 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
