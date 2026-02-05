export default function AdminNewsletterLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-8 w-32 bg-stone-800 rounded mb-2" />
          <div className="h-4 w-24 bg-stone-800 rounded" />
        </div>
        <div className="h-9 w-28 bg-stone-800 rounded" />
      </div>
      <div className="flex gap-2 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-8 w-20 bg-stone-800 rounded-full" />
        ))}
      </div>
      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
        <div className="border-b border-stone-800 px-6 py-3 flex gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-20 bg-stone-800 rounded" />
          ))}
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="px-6 py-4 flex gap-6 border-b border-stone-800/50">
            <div className="h-4 w-40 bg-stone-800 rounded" />
            <div className="h-4 w-20 bg-stone-800 rounded" />
            <div className="h-4 w-24 bg-stone-800 rounded" />
            <div className="h-5 w-16 bg-stone-800 rounded-full" />
            <div className="h-4 w-24 bg-stone-800 rounded ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
