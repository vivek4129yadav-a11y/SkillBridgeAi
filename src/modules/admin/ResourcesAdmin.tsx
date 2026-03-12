import React, { useState } from 'react';
import { Lock, Unlock, Upload, Trash2, Edit2, Plus, RefreshCw } from 'lucide-react';
import api from '@/lib/api';

interface Resource {
    id: string;
    title: string;
    provider: string;
    category: string;
    is_free: boolean;
    difficulty_level: string;
    is_active: boolean;
}

export const ResourcesAdmin: React.FC = () => {
    const [secret, setSecret] = useState('');
    const [unlocked, setUnlocked] = useState(false);
    const [authError, setAuthError] = useState('');
    
    const [activeTab, setActiveTab] = useState<'list' | 'bulk'>('list');
    const [resources, setResources] = useState<Resource[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Bulk upload states
    const [bulkJson, setBulkJson] = useState('');
    const [bulkResult, setBulkResult] = useState<{ created: number; failed: number } | null>(null);

    const handleUnlock = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError('');
        setIsLoading(true);
        try {
            // we do a dummy get to verify the secret works
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
        if (!window.confirm("Soft delete this resource?")) return;
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
            if (!Array.isArray(parsed)) throw new Error("Must be a JSON array");
            
            setIsLoading(true);
            setBulkResult(null);
            const res = await api.post('/resources/admin/bulk', parsed, { headers: { 'x-admin-secret': secret } });
            setBulkResult(res.data.data);
            setBulkJson('');
        } catch (err: any) {
            alert("Upload failed: " + (err.message || 'Check format'));
        } finally {
            setIsLoading(false);
        }
    };

    if (!unlocked) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
                <form onSubmit={handleUnlock} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="text-gray-500 w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Admin Access</h2>
                    <p className="text-gray-500 text-sm mb-6">Enter Admin Secret to manage resources</p>
                    
                    <input 
                        type="password"
                        value={secret}
                        onChange={e => setSecret(e.target.value)}
                        className="w-full text-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 font-mono tracking-widest"
                        placeholder="••••••••"
                        autoFocus
                    />
                    
                    {authError && <p className="text-red-500 text-sm mb-4 font-medium">{authError}</p>}
                    
                    <button 
                        type="submit" 
                        disabled={isLoading || !secret}
                        className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black transition flex justify-center items-center gap-2 disabled:opacity-50"
                    >
                        {isLoading ? <RefreshCw className="animate-spin w-4 h-4"/> : <Unlock className="w-4 h-4"/>}
                        Unlock
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 pt-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Resource Management</h1>
                    <p className="text-gray-500 mt-1">Add, update or remove learning materials</p>
                </div>
                <button onClick={() => { setUnlocked(false); setSecret(''); }} className="text-sm font-medium text-gray-500 hover:text-gray-900 px-4 py-2 bg-gray-100 rounded-lg">
                    Lock Session
                </button>
            </div>

            <div className="flex border-b border-gray-200 mb-6">
                <button 
                    onClick={() => setActiveTab('list')} 
                    className={`px-6 py-3 font-bold border-b-2 transition-colors ${activeTab === 'list' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Resource List
                </button>
                <button 
                    onClick={() => setActiveTab('bulk')} 
                    className={`px-6 py-3 font-bold border-b-2 transition-colors ${activeTab === 'bulk' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Bulk Upload
                </button>
            </div>

            {activeTab === 'list' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                        <button onClick={fetchResources} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700">
                            <Plus className="w-4 h-4" /> Add New Resource
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-gray-50 border-b text-gray-500 uppercase text-xs font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Title & Provider</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Cost / Level</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {resources.map(r => (
                                    <tr key={r.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{r.title}</div>
                                            <div className="text-gray-500">{r.provider}</div>
                                        </td>
                                        <td className="px-6 py-4 capitalize">{r.category}</td>
                                        <td className="px-6 py-4">
                                            <div>{r.is_free ? <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">Free</span> : 'Paid'}</div>
                                            <div className="text-gray-500 mt-1 capitalize">{r.difficulty_level}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {r.is_active ? <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block mr-2"/> : <span className="w-2.5 h-2.5 bg-gray-300 rounded-full inline-block mr-2"/>}
                                            {r.is_active ? 'Active' : 'Inactive'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-blue-600 p-2"><Edit2 className="w-4 h-4" /></button>
                                            <button onClick={() => handleDelete(r.id)} className="text-gray-400 hover:text-red-600 p-2"><Trash2 className="w-4 h-4" /></button>
                                        </td>
                                    </tr>
                                ))}
                                {resources.length === 0 && !isLoading && (
                                    <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">No resources found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'bulk' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-3xl">
                    <h3 className="text-lg font-bold mb-4">Upload resources in bulk via JSON array</h3>
                    
                    <textarea 
                        value={bulkJson}
                        onChange={e => setBulkJson(e.target.value)}
                        className="w-full h-64 p-4 font-mono text-sm bg-gray-50 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
                        placeholder={`[
  {
    "title": "Example Course",
    "provider": "Coursera",
    "url": "..."
  }
]`}
                    />

                    <div className="flex gap-4">
                        <button 
                            disabled={!bulkJson || isLoading}
                            onClick={handleBulkUpload}
                            className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-black disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            Upload All
                        </button>
                        <button 
                            onClick={async () => {
                                try {
                                    const parsed = JSON.parse(bulkJson);
                                    alert(`Valid JSON. Contains ${parsed.length} items.`);
                                } catch (err) {
                                    alert("Invalid JSON format");
                                }
                            }}
                            className="px-6 py-2.5 border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        >
                            Preview
                        </button>
                    </div>

                    {bulkResult && (
                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                            <strong>Upload Complete</strong>
                            <p className="mt-1">{bulkResult.created} resources created, {bulkResult.failed} failed.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
