// @ts-nocheck
import { useEffect } from 'react';
import { X, AlertCircle, Wifi, WifiOff, AlertTriangle, Info } from 'lucide-react';
import { useError } from '../contexts/ErrorContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

export function ErrorToast() {
  const { errors, removeError, networkError } = useError();

  const getErrorIcon = (type: string) => {
    switch (type) {
      case 'network':
        return <WifiOff className="h-5 w-5" />;
      case 'validation':
        return <AlertTriangle className="h-5 w-5" />;
      case 'api':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getErrorColor = (type: string) => {
    switch (type) {
      case 'network':
        return 'border-l-red-500 bg-red-50';
      case 'validation':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'api':
        return 'border-l-red-500 bg-red-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  if (!errors.length && !networkError) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {/* Network Error Banner */}
      {networkError && (
        <Card className="border-l-4 border-l-red-500 bg-red-50 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <WifiOff className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-red-800">Connection Lost</h4>
                <p className="text-sm text-red-700">
                  Please check your internet connection and try again.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Individual Error Messages */}
      {errors.map((error) => (
        <Card
          key={error.id}
          className={`border-l-4 shadow-lg animate-in slide-in-from-right-full ${getErrorColor(error.type)}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getErrorIcon(error.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{error.message}</p>
                {error.details && (
                  <p className="text-sm text-gray-600 mt-1">{error.details}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-gray-200"
                onClick={() => removeError(error.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
