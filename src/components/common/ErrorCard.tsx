import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface ErrorCardProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ message, onRetry, className = '' }) => {
  const { t } = useTranslation();

  return (
    <div className={`p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center ${className}`}>
      <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
      <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
        {t('common.error', 'An error occurred')}
      </h3>
      <p className="text-sm text-red-600 dark:text-red-300 mb-4">
        {message || t('common.errorFetch', 'Failed to load data')}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:text-red-100 dark:bg-red-800 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          {t('common.retry', 'Retry')}
        </button>
      )}
    </div>
  );
};
