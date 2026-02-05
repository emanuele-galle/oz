export default function AdminReviewsLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-32 bg-stone-800 rounded" />
        <div className="h-5 w-20 bg-stone-800 rounded" />
      </div>
      <div className="flex gap-2 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-8 w-28 bg-stone-800 rounded-full" />
        ))}
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-stone-900 border border-stone-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-4 w-20 bg-stone-800 rounded" />
                <div className="h-4 w-24 bg-stone-800 rounded" />
                <div className="h-5 w-16 bg-stone-800 rounded-full" />
              </div>
              <div className="flex gap-2">
                <div className="h-7 w-16 bg-stone-800 rounded" />
                <div className="h-7 w-16 bg-stone-800 rounded" />
              </div>
            </div>
            <div className="h-4 w-3/4 bg-stone-800 rounded ml-7" />
          </div>
        ))}
      </div>
    </div>
  );
}
