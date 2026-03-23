import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  icon, 
  action, 
  className = '' 
}) => {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg ${className}`}>
      <div className="text-gray-400 mb-4">
        {icon || <FileQuestion className="w-12 h-12 mx-auto" />}
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {title || t('common.noData', 'No data available')}
      </h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-sm">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
};
