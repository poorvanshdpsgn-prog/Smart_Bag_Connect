import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, BellOff, Eye } from "lucide-react";

interface AlertOverlayProps {
  isOpen: boolean;
  type: "intrusion" | "water" | "override" | "surveillance" | null;
  onDismiss: () => void;
}

const alertContent = {
  intrusion: {
    title: "INTRUSION",
    description: "Unauthorized access detected on Smart Bag.",
    icon: ShieldAlert,
    color: "bg-destructive",
    glow: "rgba(255,0,0,0.6)",
  },
  water: {
    title: "WATER DETECTION",
    description: "Moisture detected inside the bag! Check your belongings.",
    icon: ShieldAlert,
    color: "bg-destructive",
    glow: "rgba(255,0,0,0.6)",
  },
  override: {
    title: "SYSTEM OVERRIDE",
    description: "Unusual system override pattern detected. Check bag controls.",
    icon: ShieldAlert,
    color: "bg-destructive",
    glow: "rgba(255,0,0,0.6)",
  },
  surveillance: {
    title: "MOTION DETECTED",
    description: "Ultrasonic sensor picked up movement near the bag. Stay alert.",
    icon: Eye,
    color: "bg-orange-500",
    glow: "rgba(249,115,22,0.7)",
  },
};

export function AlertOverlay({ isOpen, type, onDismiss }: AlertOverlayProps) {
  const content = (type && alertContent[type]) ? alertContent[type] : alertContent.intrusion;
  const Icon = content.icon;

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
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm p-4 ${type === "surveillance" ? "bg-orange-500/90" : "bg-destructive/90"}`}
        >
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            className="w-full max-w-sm"
          >
            <div className="bg-black/40 border-2 border-white/20 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <motion.div
                animate={type === "surveillance"
                  ? { scale: [1, 1.15, 1] }
                  : { rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: type === "surveillance" ? 0.8 : 0.5 }}
                className={`w-24 h-24 rounded-full ${content.color} flex items-center justify-center mb-6`}
                style={{ boxShadow: `0 0 30px ${content.glow}` }}
              >
                <Icon className="w-12 h-12 text-white" />
              </motion.div>

              <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter animate-glitch">
                {content.title}
              </h2>
              <p className="text-white/80 font-medium mb-8 text-lg">
                {content.description}
              </p>

              <button
                onClick={onDismiss}
                className={`w-full py-4 bg-white rounded-xl font-bold text-xl uppercase tracking-widest hover:bg-white/90 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 ${type === "surveillance" ? "text-orange-500" : "text-destructive"}`}
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
