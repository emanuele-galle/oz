export default function AdminProductsLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-32 bg-stone-800 rounded" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-48 bg-stone-800 rounded" />
          <div className="h-9 w-36 bg-stone-800 rounded" />
        </div>
      </div>
      <div className="grid gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-stone-900 border border-stone-800 rounded-lg p-6 flex items-center gap-6">
            <div className="w-16 h-16 bg-stone-800 rounded flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-40 bg-stone-800 rounded" />
              <div className="h-4 w-64 bg-stone-800 rounded" />
            </div>
            <div className="flex gap-4">
              {Array.from({ length: 2 }).map((_, j) => (
                <div key={j} className="h-12 w-12 bg-stone-800 rounded" />
              ))}
            </div>
            <div className="flex gap-2">
              <div className="h-9 w-20 bg-stone-800 rounded" />
              <div className="h-9 w-20 bg-stone-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
