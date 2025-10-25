import { AlertCircle } from 'lucide-react';

interface FieldErrorProps {
  errors?: string[];
}

export function FieldError({ errors }: FieldErrorProps) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="flex items-start gap-2 mt-1">
      <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-red-600">
        {errors.map((error, index) => (
          <div key={index}>{error}</div>
        ))}
      </div>
    </div>
  );
}
