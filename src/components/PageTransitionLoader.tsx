import { useLoading } from '../contexts/LoadingContext';
import { Spinner } from './ui/spinner';

export function PageTransitionLoader() {
  const { pageTransition } = useLoading();

  if (!pageTransition) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" className="text-[#FFB300]" />
        <p className="text-[#0A2239] font-medium">Loading...</p>
      </div>
    </div>
  );
}
