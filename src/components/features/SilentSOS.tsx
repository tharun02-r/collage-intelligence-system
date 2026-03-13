"use client";

import { useState } from "react";
import { AlertOctagon, X, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SilentSOS() {
  const [active, setActive] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const handleTrigger = () => {
    setTriggered(true);
    // In real app, trigger backend SOS event via WebSocket
  };

  return (
    <>
      {/* Persistent Floating Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActive(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-surface-darker border border-alert-critical text-alert-critical flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-shadow group"
      >
        <AlertOctagon className="w-7 h-7 group-hover:animate-pulse" />
      </motion.button>

      {/* SOS Modal Overlay */}
      <AnimatePresence>
        {active && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-sm bg-surface-dark border border-alert-critical/30 rounded-2xl overflow-hidden relative shadow-2xl"
            >
              <button 
                onClick={() => { setActive(false); setTriggered(false); }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 text-center">
                <div className="w-20 h-20 bg-alert-critical/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                   {triggered && (
                     <motion.div 
                        animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 bg-alert-critical rounded-full"
                     />
                   )}
                  <AlertOctagon className="w-10 h-10 text-alert-critical relative z-10" />
                </div>
                
                <h2 className="text-2xl font-heading font-semibold text-white mb-2">
                  {triggered ? "Help is on the way" : "Silent SOS"}
                </h2>
                
                <p className="text-slate-400 text-sm mb-8">
                  {triggered 
                    ? "A counselor has been notified and a peer buddy will check in on you shortly. We are here for you."
                    : "This will instantly alert a counselor and trusted peer buddy without sounding an alarm."}
                </p>

                {!triggered ? (
                  <button 
                    onClick={handleTrigger}
                    className="w-full py-4 bg-alert-critical hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(239,68,68,0.5)] flex items-center justify-center gap-2"
                  >
                    Hold to Trigger
                  </button>
                ) : (
                  <button 
                    className="w-full py-3 bg-surface-darker border border-white/10 hover:bg-white/5 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" /> Call Campus Crisis Line
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
