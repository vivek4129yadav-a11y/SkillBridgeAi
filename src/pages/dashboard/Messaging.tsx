import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip, 
  Smile,
  Check,
  CheckCheck,
  Clock,
  Filter,
  User as UserIcon
} from 'lucide-react';

const Messaging = () => {
  const [selectedChat, setSelectedChat] = useState(1);

  const chats = [
    { id: 1, name: 'Rahul Sharma', lastMsg: 'I have attached my certification documents.', time: '10:25 AM', unread: 2, online: true, role: 'Senior Electrician' },
    { id: 2, name: 'Priya Patel', lastMsg: 'Looking forward to the interview tomorrow.', time: 'Yesterday', unread: 0, online: false, role: 'Site Supervisor' },
    { id: 3, name: 'Amit Kumar', lastMsg: 'Thank you for the opportunity.', time: 'Yesterday', unread: 0, online: true, role: 'Junior Electrician' },
    { id: 4, name: 'Sneha Gupta', lastMsg: 'When can I expect the offer letter?', time: '2 days ago', unread: 0, online: false, role: 'Project Manager' },
  ];

  const messages = [
    { id: 1, sender: 'candidate', text: 'Hello, I saw the job posting for Senior Electrician.', time: 'Yesterday, 4:15 PM' },
    { id: 2, sender: 'me', text: 'Hi Rahul! Thanks for reaching out. Your profile looks impressive.', time: 'Yesterday, 4:20 PM' },
    { id: 3, sender: 'candidate', text: 'I have 8 years of experience in industrial wiring.', time: 'Yesterday, 4:22 PM' },
    { id: 4, sender: 'me', text: 'Great. Could you share your certification from the Trade Council?', time: 'Today, 10:20 AM' },
    { id: 5, sender: 'candidate', text: 'I have attached my certification documents.', time: 'Today, 10:25 AM' },
  ];

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-160px)] flex bg-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden animate-fade-in shadow-2xl">
      
      {/* Sidebar: Chat List */}
      <div className="w-80 border-r border-gray-800 flex flex-col bg-gray-900/60">
        <div className="p-4 border-b border-gray-800 space-y-4">
          <h2 className="text-xl font-bold text-white">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full p-4 flex gap-3 hover:bg-gray-800/40 transition-all border-b border-gray-800/30 text-left ${
                selectedChat === chat.id ? 'bg-indigo-600/10 border-l-4 border-l-indigo-600' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
                  <UserIcon size={24} />
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-gray-900 rounded-full" />
                )}
              </div>
              <div className="flex-grow overflow-hidden">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-white truncate">{chat.name}</h4>
                  <span className="text-[10px] text-gray-500">{chat.time}</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5 truncate">{chat.role}</p>
                <p className={`text-[11px] mt-1 truncate ${chat.unread > 0 ? 'text-white font-bold' : 'text-gray-500'}`}>
                  {chat.lastMsg}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="flex-shrink-0 self-center">
                  <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {chat.unread}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main: Chat Window */}
      <div className="flex-grow flex flex-col bg-gray-900/20 backdrop-blur-sm">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600/20 rounded-full flex items-center justify-center text-indigo-400">
               <UserIcon size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{chats.find(c => c.id === selectedChat)?.name}</h3>
              <p className="text-[10px] text-emerald-400">Active now</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <button className="hover:text-white transition-all"><Phone size={18} /></button>
            <button className="hover:text-white transition-all"><Video size={18} /></button>
            <button className="hover:text-white transition-all"><MoreVertical size={18} /></button>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] space-y-1`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'me' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-gray-800 text-gray-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <div className={`flex items-center gap-2 text-[10px] text-gray-500 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <span>{msg.time}</span>
                  {msg.sender === 'me' && <CheckCheck size={12} className="text-indigo-400" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-900/60 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:text-white"><Paperclip size={20} /></button>
            <div className="flex-grow relative">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl py-3 px-4 text-sm text-white focus:border-indigo-500 outline-none transition-all pr-12"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-400 transition-all">
                <Smile size={20} />
              </button>
            </div>
            <button className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl shadow-lg shadow-indigo-600/20 transition-all">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Candidate Details */}
      <div className="w-64 border-l border-gray-800 p-6 hidden xl:block bg-gray-900/60">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gray-800 rounded-3xl mx-auto flex items-center justify-center text-gray-500 border border-gray-700 shadow-xl">
             <UserIcon size={48} />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{chats.find(c => c.id === selectedChat)?.name}</h3>
            <p className="text-xs text-gray-500">{chats.find(c => c.id === selectedChat)?.role}</p>
          </div>
          <div className="pt-4 flex justify-center gap-2">
            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-full border border-indigo-500/20 font-bold">92% Match</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20 font-bold">Verified</span>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <div>
            <h4 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">Recent Actions</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />
                <div className="text-xs text-gray-400">Moved to <span className="text-white font-bold">Interview</span> stage</div>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                <div className="text-xs text-gray-400">Completed <span className="text-white font-bold">Electrical Safety</span> test</div>
              </div>
            </div>
          </div>

          <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold rounded-xl transition-all border border-gray-700">
            View Candidate Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
