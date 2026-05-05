import React from 'react';
import { Users, UserPlus, Shield, Mail, MoreVertical, Plus } from 'lucide-react';

const TeamManagement = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="text-indigo-400" size={32} />
            Team Management
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Manage your recruiters and hiring managers.</p>
        </div>
        <button className="btn-primary">
          <UserPlus size={18} />
          Invite Member
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900/60 border-b border-gray-800">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                { name: 'Arjun Mehta', email: 'arjun@company.com', role: 'Admin', dept: 'Operations' },
                { name: 'Sana Khan', email: 'sana@company.com', role: 'Recruiter', dept: 'HR' },
                { name: 'Priya Sharma', email: 'priya@company.com', role: 'Hiring Manager', dept: 'Engineering' },
              ].map((member, i) => (
                <tr key={i} className="hover:bg-gray-800/30 transition-all group">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center font-bold">
                        {member.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-white">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Shield size={14} className="text-indigo-400" />
                      {member.role}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-sm text-gray-400">{member.dept}</span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button className="text-gray-500 hover:text-white">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-8 border-dashed border-2 flex flex-col items-center justify-center text-center gap-4 py-12">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-gray-600">
            <Mail size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Pending Invites</h3>
            <p className="text-gray-500 text-sm mt-1">You have 2 outstanding invitations.</p>
          </div>
          <button className="text-sm font-bold text-indigo-400 hover:underline">View Pending →</button>
        </div>

        <div className="glass-card p-8 bg-indigo-600/10 border-indigo-500/20">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Shield size={20} className="text-indigo-400" />
            Security Tip
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Ensure your Admin users have 2FA enabled. Only grant 'Admin' role to trusted organizational leaders to protect your recruitment pipeline and data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
