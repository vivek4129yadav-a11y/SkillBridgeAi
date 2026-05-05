import React from 'react';
import { FileText, Download, CheckCircle2, Clock, AlertCircle, Search, Filter } from 'lucide-react';

const OffersContracts = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FileText className="text-indigo-400" size={32} />
            Offers & Contracts
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Manage digital offer letters, employment contracts, and compliance docs.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-gray-800 text-gray-300 font-bold rounded-xl hover:bg-gray-700 transition-all">Template Library</button>
          <button className="btn-primary">Generate New Offer</button>
        </div>
      </div>

      <div className="flex gap-4 mb-2">
        {['All', 'Pending Signature', 'Accepted', 'Drafts'].map((tab, i) => (
          <button key={i} className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${
            i === 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-500 hover:text-white'
          }`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900/60 border-b border-gray-800">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Issued Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                { name: 'Rahul Sharma', role: 'Electrician', status: 'Accepted', date: 'Oct 20, 2024' },
                { name: 'Anita Verma', role: 'UX Designer', status: 'Pending', date: 'Oct 22, 2024' },
                { name: 'Vikram Singh', role: 'Fitter', status: 'Draft', date: 'Oct 24, 2024' },
              ].map((offer, i) => (
                <tr key={i} className="hover:bg-gray-800/30 transition-all group">
                  <td className="px-6 py-6">
                    <p className="font-bold text-white">{offer.name}</p>
                  </td>
                  <td className="px-6 py-6 text-sm text-gray-400">{offer.role}</td>
                  <td className="px-6 py-6">
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-lg border flex items-center gap-1.5 w-fit ${
                      offer.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      offer.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-gray-800 text-gray-500 border-gray-700'
                    }`}>
                      {offer.status === 'Accepted' ? <CheckCircle2 size={12} /> : 
                       offer.status === 'Pending' ? <Clock size={12} /> : <FileText size={12} />}
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-sm text-gray-500">{offer.date}</td>
                  <td className="px-6 py-6 text-right">
                    <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-all">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-8 flex items-start gap-6 border-amber-500/20 bg-amber-500/5">
          <div className="p-4 bg-amber-500/10 text-amber-400 rounded-2xl">
            <AlertCircle size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Compliance Alert</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              3 Employment contracts are awaiting your organizational seal. Please review and sign them to finalize the hiring process for the upcoming batch.
            </p>
            <button className="mt-4 px-6 py-2 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-all text-xs">Review & Sign</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersContracts;
