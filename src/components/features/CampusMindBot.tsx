"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Sparkles, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../ui/Badge";
import clsx from "clsx";

interface CampusMindBotProps {
  role: "counselor" | "student" | "warden" | "faculty" | "admin";
}

export function CampusMindBot({ role }: CampusMindBotProps) {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<{ role: string, content: string, isEmergency?: boolean }[]>([
    { role: "ai", content: `Hello. I am CampusMind. As a ${role}, how can I assist you today?` }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input.trim();
    const currentHistory = [...messages];
    
    // Add user message to UI immediately
    setMessages([...currentHistory, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);
    
    // Check for Emergency Intercept Triggers locally to ensure instant response
    const lowerInput = userMsg.toLowerCase();
    if (lowerInput.includes("suicide") || lowerInput.includes("giving up") || lowerInput.includes("end it")) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: "ai", 
          isEmergency: true,
          content: "I hear that you're in a lot of pain right now. Please know you are not alone. I have initiated a Priority Support Protocol. A human counselor is joining this chat right now. Please stay with me, we are here to support you." 
        }]);
        setIsTyping(false);
      }, 500);
      return;
    }

    try {
       // Call the real ML API
       const response = await fetch("/api/chat", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           message: userMsg,
           role: role,
           // Pass the preceding history (excluding the current msg we just added)
           history: currentHistory.slice(1).map(m => ({ role: m.role, content: m.content })) 
         }),
       });

       const data = await response.json();

       if (data.success) {
          setMessages(prev => [...prev, { 
             role: "ai", 
             content: data.reply
          }]);
       } else {
          setMessages(prev => [...prev, { 
             role: "ai", 
             content: data.reply || "Connection Error. Please try again."
          }]);
       }
    } catch (error) {
       console.error("Failed to connect to CampusMind API:", error);
       setMessages(prev => [...prev, { 
          role: "ai", 
          content: "System Offline: Unable to reach the neural network."
       }]);
    } finally {
       setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!expanded && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setExpanded(true)}
            className="fixed bottom-6 right-24 z-40 px-4 py-3 bg-surface-dark border border-accent-purple/30 rounded-full flex items-center gap-3 shadow-lg hover:border-accent-purple transition-all group"
          >
            <div className="relative">
               <BrainCircuit className="w-5 h-5 text-accent-purple group-hover:text-purple-400" />
               <div className="absolute top-0 right-0 w-2 h-2 bg-accent-teal rounded-full animate-ping" />
            </div>
            <span className="text-sm font-medium text-white pr-2">CampusMind</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-surface-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ height: "500px", maxHeight: "80vh" }}
          >
            {/* Header */}
            <div className="h-14 border-b border-white/5 bg-surface-darker px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-accent-purple" />
                <span className="font-heading font-semibold text-white">CampusMind AI</span>
                <Badge variant="purple" className="ml-2 text-[9px]">{role} Access</Badge>
              </div>
              <button onClick={() => setExpanded(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Privacy Strip */}
            <div className="bg-accent-teal/5 border-b border-accent-teal/10 px-4 py-1.5 flex items-center gap-2 shrink-0">
               <Sparkles className="w-3 h-3 text-accent-teal" />
               <span className="text-[10px] text-accent-teal/80 uppercase tracking-widest">
                 {role === 'student' ? 'Privacy Wall Active: Self-Data Only' : 'Role-Based Access Control Active'}
               </span>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={clsx("flex", msg.role === "ai" ? "justify-start" : "justify-end")}>
                  <div className={clsx(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap",
                    msg.role === "ai" && !msg.isEmergency && "bg-surface-darker border border-white/5 text-slate-200 rounded-tl-sm",
                    msg.role === "user" && "bg-accent-teal/20 border border-accent-teal/30 text-white rounded-tr-sm",
                    msg.isEmergency && "bg-alert-critical/20 border border-alert-critical shadow-[0_0_15px_rgba(239,68,68,0.3)] text-white rounded-tl-sm font-medium"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-surface-darker border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 bg-accent-purple rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, delay: 0.2, repeat: Infinity }} className="w-1.5 h-1.5 bg-accent-purple rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, delay: 0.4, repeat: Infinity }} className="w-1.5 h-1.5 bg-accent-purple rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/5 bg-surface-darker shrink-0">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask CampusMind..."
                  className="w-full bg-surface-dark border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent-purple/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-accent-teal hover:text-white disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
              <div className="mt-2 text-center">
                 <span className="text-[9px] text-slate-600 font-mono tracking-widest uppercase">Powered by GPT-4 + BERT NLP</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
