import React, { useState } from 'react';
import { Plus, RefreshCw, Upload } from 'lucide-react';
import api from '@/lib/api';
import { AdminUnlockModal } from './components/AdminUnlockModal';
import { ResourceListTab, Resource } from './components/ResourceListTab';
import { BulkUploadTab } from './components/BulkUploadTab';

export const ResourcesAdmin: React.FC = () => {
  const [secret, setSecret] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'bulk'>('list');
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bulkJson, setBulkJson] = useState('');
  const [bulkResult, setBulkResult] = useState<{ created: number; failed: number } | null>(null);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);
    try {
      const res = await api.get('/resources', { headers: { 'x-admin-secret': secret } });
      setResources(res.data.data);
      setUnlocked(true);
    } catch (err: any) {
      setAuthError('Invalid admin secret');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResources = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/resources');
      setResources(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Soft delete this resource?')) return;
    try {
      await api.delete(`/resources/admin/${id}`, { headers: { 'x-admin-secret': secret } });
      fetchResources();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleBulkUpload = async () => {
    try {
      const parsed = JSON.parse(bulkJson);
      if (!Array.isArray(parsed)) throw new Error('Must be a JSON array');
      
      setIsLoading(true);
      setBulkResult(null);
      const res = await api.post('/resources/admin/bulk', parsed, { headers: { 'x-admin-secret': secret } });
      setBulkResult(res.data.data);
      setBulkJson('');
    } catch (err: any) {
      alert('Upload failed: ' + (err.message || 'Check format'));
    } finally {
      setIsLoading(false);
    }
  };

  if (!unlocked) {
    return (
      <AdminUnlockModal
        secret={secret}
        setSecret={setSecret}
        handleUnlock={handleUnlock}
        authError={authError}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Resources Admin</h1>
          <p className="text-gray-500 text-sm">Manage educational modules and courses</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={fetchResources} 
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('list')}
          className={`pb-3 text-sm font-medium border-b-2 transition ${
            activeTab === 'list' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          All Resources ({resources.length})
        </button>
        <button
          onClick={() => setActiveTab('bulk')}
          className={`pb-3 text-sm font-medium border-b-2 transition ${
            activeTab === 'bulk' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Bulk Import JSON
        </button>
      </div>

      {activeTab === 'list' && (
        <ResourceListTab
          resources={resources}
          isLoading={isLoading}
          onDelete={handleDelete}
        />
      )}

      {activeTab === 'bulk' && (
        <BulkUploadTab
          bulkJson={bulkJson}
          setBulkJson={setBulkJson}
          bulkResult={bulkResult}
          isLoading={isLoading}
          onBulkUpload={handleBulkUpload}
        />
      )}
    </div>
  );
};
