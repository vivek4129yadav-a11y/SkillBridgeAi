import React from 'react';
import { Upload } from 'lucide-react';

interface BulkUploadTabProps {
  bulkJson: string;
  setBulkJson: (s: string) => void;
  bulkResult: { created: number; failed: number } | null;
  isLoading: boolean;
  onBulkUpload: () => void;
}

export const BulkUploadTab: React.FC<BulkUploadTabProps> = ({
  bulkJson,
  setBulkJson,
  bulkResult,
  isLoading,
  onBulkUpload,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm max-w-2xl">
      <h3 className="text-lg font-semibold mb-2">Paste JSON Array</h3>
      <p className="text-gray-500 text-sm mb-4">Must match LearningResource schema array format</p>
      
      <textarea
        value={bulkJson}
        onChange={e => setBulkJson(e.target.value)}
        rows={10}
        placeholder={`[\n  {\n    "title": "React Basics",\n    "provider": "Coursera",\n    "url": "https://...",\n    "category": "technical",\n    "primary_skill": "React",\n    "difficulty_level": "beginner",\n    "is_free": true\n  }\n]`}
        className="w-full p-4 font-mono text-xs bg-gray-50 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex items-center justify-between">
        <button
          onClick={onBulkUpload}
          disabled={isLoading || !bulkJson.trim()}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 transition"
        >
          <Upload className="w-4 h-4" />
          {isLoading ? 'Uploading...' : 'Submit Bulk Payload'}
        </button>

        {bulkResult && (
          <div className="text-sm">
            <span className="text-green-600 font-semibold">{bulkResult.created} created</span>
            {bulkResult.failed > 0 && <span className="text-red-500 ml-2">({bulkResult.failed} failed)</span>}
          </div>
        )}
      </div>
    </div>
  );
};
