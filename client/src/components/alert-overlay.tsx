import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, BellOff } from "lucide-react";

interface AlertOverlayProps {
  isOpen: boolean;
  type: "intrusion" | "water" | "override" | null;
  onDismiss: () => void;
}

const alertContent = {
  intrusion: {
    title: "INTRUSION",
    description: "Unauthorized access detected on Smart Bag.",
  },
  water: {
    title: "WATER DETECTION",
    description: "Moisture detected inside the bag! Check your belongings.",
  },
  override: {
    title: "SYSTEM OVERRIDE",
    description: "Unusual system override pattern detected. Check bag controls.",
  }
};

export function AlertOverlay({ isOpen, type, onDismiss }: AlertOverlayProps) {
  // Use "intrusion" as a safe fallback if type is null
  const content = (type && alertContent[type]) ? alertContent[type] : alertContent.intrusion;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-destructive/90 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            className="w-full max-w-sm"
          >
            <div className="bg-black/40 border-2 border-white/20 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <motion.div 
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="w-24 h-24 rounded-full bg-destructive flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,0,0,0.6)]"
              >
                <ShieldAlert className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter animate-glitch">
                {content.title}
              </h2>
              <p className="text-white/80 font-medium mb-8 text-lg">
                {content.description}
              </p>

              <button
                onClick={onDismiss}
                className="w-full py-4 bg-white text-destructive rounded-xl font-bold text-xl uppercase tracking-widest hover:bg-white/90 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <BellOff className="w-6 h-6" />
                Dismiss Alarm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
