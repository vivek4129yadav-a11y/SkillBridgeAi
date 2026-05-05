import React from 'react';
import { Gift, Share2, Copy, Users, TrendingUp, DollarSign, Award } from 'lucide-react';

const Referrals = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Gift className="text-pink-400" size={32} />
            Referral Program
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Incentivize your employees and partners to bring in high-quality talent.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-4">Share & Earn</h2>
              <p className="text-indigo-100 max-w-md text-lg leading-relaxed mb-8">
                Invite fellow recruiters or refer candidates. Get <span className="font-bold text-white underline decoration-amber-400 underline-offset-4">₹500 Credits</span> for every successful placement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/20">
                  <code className="text-amber-300 font-mono font-bold tracking-widest">SANKALP-REF-2024</code>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-all"><Copy size={18} /></button>
                </div>
                <button className="px-8 py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Share Link
                </button>
              </div>
            </div>
            <div className="absolute -right-12 -top-12 opacity-10 rotate-12">
              <Gift size={240} />
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Award size={20} className="text-amber-400" />
              Recent Referral Rewards
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Karan J.', reward: '₹500 Credits', date: '2 hours ago', status: 'Credited' },
                { name: 'Meera S.', reward: 'Premium Job Slot', date: 'Yesterday', status: 'Pending' },
                { name: 'Sanket P.', reward: '₹500 Credits', date: '3 days ago', status: 'Credited' },
              ].map((ref, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-900/40 border border-gray-800 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-pink-500/10 text-pink-400 rounded-xl flex items-center justify-center">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-white">Referral by {ref.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-0.5">{ref.reward}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{ref.date}</p>
                    <span className={`text-[10px] font-black uppercase ${ref.status === 'Credited' ? 'text-emerald-400' : 'text-amber-400'}`}>{ref.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Referral Analytics</p>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-gray-300">Total Referrals</span>
                  <span className="text-xl font-bold text-white">42</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[65%] shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-900/40 rounded-2xl border border-gray-800">
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Earned</p>
                  <p className="text-lg font-black text-white">₹12,500</p>
                </div>
                <div className="p-4 bg-gray-900/40 rounded-2xl border border-gray-800">
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Conversion</p>
                  <p className="text-lg font-black text-emerald-400">18%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-amber-500/5 border-amber-500/20">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <TrendingUp size={16} />
              Boost Your Program
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Companies that offer referral bonuses see a <span className="text-white font-bold">40% increase</span> in candidate retention. Optimize your referral rules in settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
