import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Ghost, Info, AlertCircle } from 'lucide-react';

export default function App() {
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const siteUrl = "https://paranormalmechanism.lovable.app/";

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
  };

  const handleOpenNewTab = () => {
    window.open(siteUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200 overflow-hidden">
      {/* Main Sandbox Frame Container */}
      <main className="flex-1 relative w-full h-screen bg-zinc-950">
        {/* Beautiful Ambient Background / Fallback Notice */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black">
          {/* Ambient glowing orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl p-8 rounded-2xl relative z-10 shadow-2xl"
          >
            <div className="w-12 h-12 bg-purple-950/50 border border-purple-500/20 rounded-full flex items-center justify-center text-purple-400 mx-auto mb-5">
              <Info className="w-6 h-6" />
            </div>
            
            <h2 className="font-display font-semibold text-xl text-zinc-100 mb-3">
              Launching Paranormal Mechanism
            </h2>
            
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              This portal serves the live website exactly as requested. If your browser security blocks embedded previews, please use the button below to launch it directly.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleOpenNewTab}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-750 text-zinc-200 font-medium text-sm rounded-xl border border-zinc-700/60 hover:border-zinc-600 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                Launch in New Window
                <ExternalLink className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-2 text-left bg-zinc-950/50 border border-zinc-800/40 p-3 rounded-lg mt-2">
                <AlertCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-500 leading-normal">
                  No modifications are applied. The target site remains completely untouched, preserving its full native functionality and visual styling.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* The Live Interactive Iframe */}
        <iframe
          key={iframeKey}
          ref={iframeRef}
          src={siteUrl}
          onLoad={() => setIsLoading(false)}
          className={`absolute inset-0 w-full h-full border-none z-10 transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          title="Paranormal Mechanism Live View"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
          referrerPolicy="no-referrer"
        />

        {/* Elegant Iframe Loader overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-[#09090b]/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
              <Ghost className="w-5 h-5 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-xs text-zinc-400 font-mono tracking-wider animate-pulse uppercase">
              Establishing Safe Connection...
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
