import { Check } from 'lucide-react';

interface OrderTimelineProps {
  status: string;
  createdAt: string;
  shippedAt: string | null;
  deliveredAt: string | null;
}

const steps = [
  { key: 'PENDING', label: 'Creato' },
  { key: 'PROCESSING', label: 'In Lavorazione' },
  { key: 'SHIPPED', label: 'Spedito' },
  { key: 'DELIVERED', label: 'Consegnato' },
];

const statusOrder: Record<string, number> = {
  PENDING: 0,
  PROCESSING: 1,
  SHIPPED: 2,
  DELIVERED: 3,
  CANCELLED: -1,
  REFUNDED: -1,
};

function formatDate(date: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function OrderTimeline({ status, createdAt, shippedAt, deliveredAt }: OrderTimelineProps) {
  const currentIndex = statusOrder[status] ?? -1;

  // For cancelled/refunded, show a special badge
  if (currentIndex === -1) {
    const isCancelled = status === 'CANCELLED';
    return (
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
        <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">Stato Ordine</h3>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCancelled ? 'bg-red-500/20 border border-red-500/40' : 'bg-stone-500/20 border border-stone-500/40'}`}>
            <span className={`text-sm ${isCancelled ? 'text-red-400' : 'text-stone-400'}`}>&times;</span>
          </div>
          <div>
            <p className={`text-sm font-inter font-medium ${isCancelled ? 'text-red-400' : 'text-stone-400'}`}>
              {isCancelled ? 'Annullato' : 'Rimborsato'}
            </p>
            <p className="text-stone-500 text-xs">{formatDate(createdAt)}</p>
          </div>
        </div>
      </div>
    );
  }

  const timestamps: Record<string, string | null> = {
    PENDING: createdAt,
    PROCESSING: createdAt, // processing doesn't have its own timestamp
    SHIPPED: shippedAt,
    DELIVERED: deliveredAt,
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-lg p-6">
      <h3 className="text-white font-inter text-sm font-semibold uppercase tracking-wide mb-4">Stato Ordine</h3>
      <div className="space-y-0">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isFuture = index > currentIndex;
          const date = timestamps[step.key];

          return (
            <div key={step.key} className="flex gap-3">
              {/* Line + Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCompleted
                      ? 'bg-green-500/20 border border-green-500/50'
                      : isCurrent
                        ? 'bg-gold-500/20 border-2 border-gold-500 animate-pulse'
                        : 'bg-stone-800 border border-stone-700'
                  }`}
                >
                  {isCompleted && <Check className="w-3 h-3 text-green-400" />}
                  {isCurrent && <div className="w-2 h-2 bg-gold-500 rounded-full" />}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-0.5 h-8 ${isCompleted ? 'bg-green-500/30' : 'bg-stone-800'}`} />
                )}
              </div>

              {/* Label + Date */}
              <div className="pb-6">
                <p className={`text-sm font-inter ${isCompleted ? 'text-green-400' : isCurrent ? 'text-gold-500 font-medium' : 'text-stone-600'}`}>
                  {step.label}
                </p>
                {(isCompleted || isCurrent) && date && (
                  <p className="text-stone-500 text-xs">{formatDate(date)}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
