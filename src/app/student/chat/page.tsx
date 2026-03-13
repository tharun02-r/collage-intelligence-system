"use client";

import { useState } from "react";
import { MessageSquare, Send, Sparkles, BrainCircuit, Activity } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import clsx from "clsx";

export default function CampusMindChatPage() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hello Alex. I am CampusMind. How can I assist you with your wellness or academics today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: "I notice you have midterms coming up based on your Academic schedule. Make sure to prioritize sleep. Would you like me to suggest a time management plan?"
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] flex flex-col animate-in fade-in">
      
      <div className="mb-4 shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-accent-purple" /> CampusMind AI
          </h1>
          <p className="text-slate-400 mt-1">Your personal, confidential campus intelligence assistant.</p>
        </div>
        <Badge variant="purple">Active Session</Badge>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-accent-purple/20 bg-surface-darker/50 backdrop-blur-sm shadow-2xl">
        
        {/* Chat Header */}
        <div className="h-14 border-b border-white/5 bg-surface-dark px-6 flex items-center justify-between shrink-0">
          <div className="bg-accent-teal/10 border border-accent-teal/20 px-3 py-1 rounded-full flex items-center gap-2">
             <Sparkles className="w-3.5 h-3.5 text-accent-teal" />
             <span className="text-[10px] text-accent-teal/90 uppercase tracking-widest font-medium">
               Privacy Wall Active: Self-Data Only
             </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
             <Activity className="w-4 h-4 text-accent-teal animate-pulse" /> Analyzed 5 recent data points
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={clsx("flex", msg.role === "ai" ? "justify-start" : "justify-end")}>
              <div className="flex gap-3 max-w-[80%]">
                 {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-lg bg-accent-purple/20 flex flex-shrink-0 items-center justify-center border border-accent-purple/30">
                       <BrainCircuit className="w-4 h-4 text-accent-purple" />
                    </div>
                 )}
                 <div className={clsx(
                   "rounded-2xl px-5 py-3.5 text-sm md:text-base leading-relaxed",
                   msg.role === "ai" 
                     ? "bg-surface-dark border border-white/5 text-slate-200 rounded-tl-sm" 
                     : "bg-accent-teal/20 border border-accent-teal/30 text-white rounded-tr-sm"
                 )}>
                   {msg.content}
                 </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                 <div className="w-8 h-8 rounded-lg bg-accent-purple/20 flex flex-shrink-0 items-center justify-center border border-accent-purple/30">
                    <BrainCircuit className="w-4 h-4 text-accent-purple" />
                 </div>
                 <div className="bg-surface-dark border border-white/5 rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-2">
                   <div className="w-2 h-2 bg-accent-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                   <div className="w-2 h-2 bg-accent-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                   <div className="w-2 h-2 bg-accent-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 md:p-6 border-t border-white/5 bg-surface-dark shrink-0">
          <div className="relative max-w-4xl mx-auto">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask CampusMind about your wellness, rules, or academics..."
              className="w-full bg-surface-darker border border-white/10 rounded-xl pl-5 pr-14 py-4 text-sm md:text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-accent-purple/50 transition-colors shadow-inner"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-accent-teal hover:text-white hover:bg-white/10 disabled:opacity-50 transition-colors"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>
          <div className="mt-3 text-center">
             <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Powered by GPT-4 + BERT NLP Model</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
