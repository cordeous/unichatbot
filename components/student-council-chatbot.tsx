'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PanelLeftOpen, PanelLeftClose, MessageSquarePlus, MessageSquare } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

type Message = {
  text: string
  sender: 'user' | 'bot'
  isLoading?: boolean
  error?: boolean
}

type Chat = {
  id: string
  name: string
  messages: Message[]
}

const WELCOME_MESSAGE = `Hello! I'm The Council Assistant. I can help you with information about:
• Student Council elections and voting
• Events and activities
• Membership opportunities
• Meeting schedules
• Contact information

How can I assist you today?`

export function StudentCouncilChatbotComponent() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'General Inquiry',
      messages: [{ text: WELCOME_MESSAGE, sender: 'bot' }]
    }
  ])
  const [activeChat, setActiveChat] = useState('1')
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        handleSend()
      }
    }

    document.addEventListener('keypress', handleKeyPress)
    return () => document.removeEventListener('keypress', handleKeyPress)
  }, [input])

  const handleSend = async () => {
    if (input.trim() === '' || isTyping) return

    const userInput = input.trim()
    setInput('')
    setIsTyping(true)

    // Add user message and loading message
    setChats(prev => prev.map(chat => 
      chat.id === activeChat 
        ? { 
            ...chat, 
            messages: [
              ...chat.messages, 
              { text: userInput, sender: 'user' },
              { text: '', sender: 'bot', isLoading: true }
            ]
          }
        : chat
    ))

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      
      setChats(prev => prev.map(chat => 
        chat.id === activeChat 
          ? {
              ...chat,
              messages: chat.messages
                .filter(msg => !msg.isLoading)
                .concat({ text: data.response, sender: 'bot' })
            }
          : chat
      ))
    } catch (error) {
      setChats(prev => prev.map(chat => 
        chat.id === activeChat 
          ? {
              ...chat,
              messages: chat.messages
                .filter(msg => !msg.isLoading)
                .concat({ 
                  text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
                  sender: 'bot',
                  error: true 
                })
            }
          : chat
      ))
    } finally {
      setIsTyping(false)
    }
  }

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `Chat ${chats.length + 1}`,
      messages: [{ text: WELCOME_MESSAGE, sender: 'bot' }]
    }
    setChats(prev => [...prev, newChat])
    setActiveChat(newChat.id)
  }

  return (
    <SidebarProvider>
      <div className="flex h-[600px] max-w-4xl mx-auto border rounded-lg overflow-hidden">
        <Sidebar className="min-w-[240px] border-r">
          <SidebarHeader className="p-4 flex justify-between items-center border-b">
            <h2 className="text-xl font-bold">The Council</h2>
            <SidebarTrigger>
              {({ open }: { open: boolean }) => (
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  {open ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
                </Button>
              )}
            </SidebarTrigger>
          </SidebarHeader>
          <SidebarContent>
            <div className="p-4">
              <Button onClick={createNewChat} className="w-full">
                <MessageSquarePlus className="mr-2 h-4 w-4" />
                New Chat
              </Button>
            </div>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveChat(chat.id)} 
                    isActive={activeChat === chat.id}
                    className="w-full transition-colors hover:bg-accent"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>{chat.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 border-t">
              <p className="text-sm text-muted-foreground">© 2023 Student Council</p>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-grow">
          <div className="bg-primary text-primary-foreground p-4">
            <h2 className="text-xl font-bold text-center">The Council</h2>
          </div>
          <ScrollArea className="flex-grow p-4">
            {chats.find(chat => chat.id === activeChat)?.messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`flex items-start ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{message.sender === 'user' ? 'U' : 'B'}</AvatarFallback>
                  </Avatar>
                  <div className={`mx-2 p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : message.error 
                        ? 'bg-destructive/10 text-destructive' 
                        : 'bg-secondary'
                  }`}>
                    {message.isLoading ? (
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="p-4 border-t">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}