import React, { useState } from 'react';
import { Search, Send, ArrowLeft, MoreVertical, Paperclip } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { mockUsers } from '../lib/data';

interface MessagingInterfaceProps {
  onNavigate: (page: string) => void;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export function MessagingInterface({ onNavigate }: MessagingInterfaceProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock conversations
  const conversations = [
    {
      id: '1',
      user: mockUsers[0],
      lastMessage: 'Thanks! I\'ll send you the details soon.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 15),
      unread: 2
    },
    {
      id: '2',
      user: mockUsers[2],
      lastMessage: 'When can you start on the tutoring project?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unread: 0
    },
    {
      id: '3',
      user: mockUsers[3],
      lastMessage: 'Great work on the design! Looking forward to working with you again.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unread: 1
    }
  ];

  // Mock messages for selected conversation
  const messages: Message[] = [
    {
      id: '1',
      senderId: '1',
      content: 'Hi! I saw your application for the wedding photography gig. Your portfolio looks amazing!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: true
    },
    {
      id: '2',
      senderId: 'me',
      content: 'Thank you! I\'d love to work on your wedding. I have extensive experience with wedding photography.',
      timestamp: new Date(Date.now() - 1000 * 60 * 50),
      read: true
    },
    {
      id: '3',
      senderId: '1',
      content: 'That\'s great to hear. Can you share some of your recent wedding work?',
      timestamp: new Date(Date.now() - 1000 * 60 * 40),
      read: true
    },
    {
      id: '4',
      senderId: 'me',
      content: 'Absolutely! I\'ll send you a link to my portfolio website. You can also check my Instagram @abebephoto for recent work.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: true
    },
    {
      id: '5',
      senderId: '1',
      content: 'Perfect! I\'ll review it and get back to you by tomorrow.',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      read: true
    },
    {
      id: '6',
      senderId: '1',
      content: 'Thanks! I\'ll send you the details soon.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      read: true
    }
  ];

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation =>
    conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedUser = conversations.find((c) => c.id === selectedConversation)?.user;

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Mock sending message
      setMessageInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-none shadow-md overflow-hidden h-[calc(100vh-6rem)] bg-[#242526]">
          <div className="grid md:grid-cols-12 h-full">
            {/* Conversations List */}
            <div className="md:col-span-4 border-r border-gray-700 bg-[#242526]">
              <div className="p-4 border-b border-gray-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl text-white">Messages</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => onNavigate('freelancer-dashboard')}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#717182]" />
                  <Input
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-[#F5F5F5] border-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              </div>

              <ScrollArea className="h-[calc(100%-8rem)]">
                <div className="p-2 space-y-1">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation === conversation.id
                          ? 'bg-[#FFB300]/10'
                          : 'hover:bg-[#F5F5F5]'
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.user.avatar} />
                        <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm text-[#0A2239] truncate">
                            {conversation.user.name}
                          </p>
                          <span className="text-xs text-[#717182]">
                            {conversation.lastMessageTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm text-[#717182] truncate flex-1">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unread > 0 && (
                            <Badge className="h-5 w-5 flex items-center justify-center p-0 bg-[#FFB300] text-[#0A2239] border-none">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-8 flex flex-col bg-[#1E1E1E] h-full">
              {selectedUser ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedUser.avatar} />
                        <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white">{selectedUser.name}</p>
                        <p className="text-sm text-gray-300">{selectedUser.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="p-4 space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                                message.senderId === 'me'
                                  ? 'bg-[#FFB300] text-[#0A2239]'
                                  : 'bg-[#F5F5F5] dark:bg-gray-700 text-[#0A2239] dark:text-white'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.senderId === 'me' ? 'text-[#0A2239]/70' : 'text-[#717182] dark:text-gray-400'
                                }`}
                              >
                                {message.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-700 flex-shrink-0 bg-[#1E1E1E]">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-5 w-5 text-gray-400" />
                      </Button>
                      <Input
                        placeholder="Type your message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                        className="flex-1 bg-[#3E4042] border-none text-white placeholder-gray-400"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00] transition-all duration-200"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-[#717182]">
                    <p>Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
