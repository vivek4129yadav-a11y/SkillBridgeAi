import React from 'react';
import { Trash2 } from 'lucide-react';

export interface Resource {
  id: string;
  title: string;
  provider: string;
  category: string;
  is_free: boolean;
  difficulty_level: string;
  is_active: boolean;
}

interface ResourceListTabProps {
  resources: Resource[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export const ResourceListTab: React.FC<ResourceListTabProps> = ({
  resources,
  isLoading,
  onDelete,
}) => {
  if (isLoading) {
    return <div className="text-center py-12 text-gray-400">Loading resources...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="p-4">Title</th>
              <th className="p-4">Provider</th>
              <th className="p-4">Category</th>
              <th className="p-4">Level</th>
              <th className="p-4">Pricing</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {resources.map(r => (
              <tr key={r.id} className="hover:bg-gray-50/50">
                <td className="p-4 font-medium text-gray-900">{r.title}</td>
                <td className="p-4 text-gray-500">{r.provider}</td>
                <td className="p-4 text-gray-500">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                    {r.category}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{r.difficulty_level}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    r.is_free ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {r.is_free ? 'Free' : 'Paid'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => onDelete(r.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {resources.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No resources found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
