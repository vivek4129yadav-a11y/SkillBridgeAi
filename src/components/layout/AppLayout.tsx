import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import ChatWidget from '@/modules/chat/ChatWidget'

export default function AppLayout() {
    return (
        <div className="flex h-screen overflow-hidden" style={{ background: 'hsl(222 47% 8%)' }}>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
            <ChatWidget />
        </div>
    )
}
