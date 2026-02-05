export default function AdminDashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-40 bg-stone-800 rounded mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-stone-900 border border-stone-800 rounded-lg p-6">
            <div className="h-4 w-24 bg-stone-800 rounded mb-3" />
            <div className="h-8 w-16 bg-stone-800 rounded" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-stone-900 border border-stone-800 rounded-lg p-6">
            <div className="h-4 w-32 bg-stone-800 rounded mb-3" />
            <div className="h-8 w-24 bg-stone-800 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-6 mb-8">
        <div className="h-4 w-28 bg-stone-800 rounded mb-4" />
        <div className="flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 w-32 bg-stone-800 rounded" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-stone-900 border border-stone-800 rounded-lg p-6">
            <div className="h-4 w-32 bg-stone-800 rounded mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-10 bg-stone-800 rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
