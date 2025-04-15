import React, { useEffect, useRef } from 'react'
import { useChartStore } from "../store/useChartStore"
import { useAuthStore } from '../store/useAuthStore'
import { useThemeStore } from '../store/useThemeStore'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'
import MessageSkeleton from './skeletons/MessageSkeleton'
import NoChartSelected from './NoChartSelected'
import { format, isSameDay } from 'date-fns'

function ChartCotainer() {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeToMessages } = useChartStore()
  const { authUser } = useAuthStore()
  const { fontSize } = useThemeStore()
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages();
    }
    subscribeToMessages();

    return () => {
      unsubscribeToMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeToMessages]);

  const formatTime = (timestamp) => {
    return format(new Date(timestamp), 'HH:mm')
  };

  const formatDate = (timestamp) => {
    return format(new Date(timestamp), 'MMM d, yyyy')
  };

  const isMessageFromAuthUser = message => {
    return message.senderId._id === authUser._id;
  };

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-hidden bg-base-100'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  if (!selectedUser) {
    return <NoChartSelected />;
  }

  return (
    <div className='flex-1 flex flex-col overflow-hidden bg-base-100'>
      <ChatHeader />
      
      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className='flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4 scroll-smooth'
      >
        {messages.map((message, index) => {
          const isFirstMessage = index === 0 || 
            !isSameDay(new Date(messages[index - 1].createdAt), new Date(message.createdAt));
          
          return (
            <React.Fragment key={message._id}>
              {/* Date Separator */}
              {isFirstMessage && (
                <div className="flex items-center justify-center my-2 sm:my-4 animate-fade-in">
                  <div className="px-2 py-0.5 text-xs text-base-content/50 bg-base-200 rounded-full">
                    {formatDate(message.createdAt)}
                  </div>
                </div>
              )}

              {/* Message */}
              <div 
                className={`flex ${isMessageFromAuthUser(message) ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`max-w-[90%] sm:max-w-[70%] space-y-0.5`}>
                  {/* Message Content */}
                  <div className={`
                    rounded-2xl px-3 py-1.5
                    ${isMessageFromAuthUser(message) 
                      ? 'bg-primary text-primary-content rounded-br-none' 
                      : 'bg-base-200 rounded-bl-none'
                    }
                    transition-all duration-200
                    hover:shadow-md
                  `}>
                    {message.text && (
                      <p 
                        className="text-sm sm:text-base break-words"
                        style={{ fontSize: `${Math.min(Math.max(parseInt(fontSize), 12), 24)}px` }}
                      >
                        {message.text}
                      </p>
                    )}
                    {message.image && (
                      <img 
                        src={message.image} 
                        alt="Message attachment" 
                        className="mt-1 rounded-lg max-w-full h-auto shadow-sm hover:shadow-md transition-shadow duration-200"
                      />
                    )}
                  </div>

                  {/* Time */}
                  <div className={`text-[10px] sm:text-xs text-base-content/50 ${isMessageFromAuthUser(message) ? 'text-right' : 'text-left'}`}>
                    {formatTime(message.createdAt)}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
}

export default ChartCotainer;
