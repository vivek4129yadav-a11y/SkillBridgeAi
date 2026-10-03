import React from 'react'
import ReactMarkdown from 'react-markdown'
import { ChatMessage } from './types'

interface ChatMessageItemProps {
    message: ChatMessage
    isStreamingToken: boolean
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message, isStreamingToken }) => {
    const isUser = message.role === 'user'

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div 
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${isUser ? 'text-white' : ''} chat-markdown`}
                style={isUser
                    ? { background: '#6366f1' }
                    : { background: 'hsl(222 47% 16%)', color: 'hsl(220 20% 85%)' }
                }
            >
                <ReactMarkdown>
                    {message.content || (isStreamingToken ? '●' : '')}
                </ReactMarkdown>
            </div>
        </div>
    )
}
