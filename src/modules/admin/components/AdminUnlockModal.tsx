import React from 'react';
import { Lock } from 'lucide-react';

interface AdminUnlockModalProps {
  secret: string;
  setSecret: (s: string) => void;
  handleUnlock: (e: React.FormEvent) => void;
  authError: string;
  isLoading: boolean;
}

export const AdminUnlockModal: React.FC<AdminUnlockModalProps> = ({
  secret,
  setSecret,
  handleUnlock,
  authError,
  isLoading,
}) => {
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

        {authError && <p className="text-red-500 text-sm mb-4">{authError}</p>}

        <button 
          type="submit" 
          disabled={isLoading || !secret}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50"
        >
          {isLoading ? 'Verifying...' : 'Unlock Panel'}
        </button>
      </form>
    </div>
  );
};
