import { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to CinemaHub support. How can I help you today?',
      sender: 'support',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate support response
    setTimeout(() => {
      const responses = [
        'Thank you for your message. A support agent will assist you shortly.',
        'I understand your concern. Let me help you with that.',
        'Could you please provide more details about your issue?',
        'I\'ve noted your query. Our team will get back to you within 24 hours.',
      ];
      
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'support',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, supportMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-6 px-4">
        <div className="container mx-auto max-w-4xl h-[calc(100vh-200px)] flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Live Support Chat</h1>
            <p className="text-muted-foreground">Chat with our support team</p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 p-6 bg-card rounded-t-xl border border-b-0 border-border">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'support' && (
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-[70%] p-4 rounded-xl ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {message.sender === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <UserIcon className="h-5 w-5 text-accent" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="flex gap-2 p-4 bg-card rounded-b-xl border border-t-0 border-border">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" variant="cinema" className="gap-2">
              <Send className="h-4 w-4" />
              Send
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chat;
