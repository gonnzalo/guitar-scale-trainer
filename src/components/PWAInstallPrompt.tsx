import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the install prompt
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Store in localStorage to not show again for a while
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Don't show if already installed or recently dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        // Don't show for 7 days after dismissal
        setShowInstallPrompt(false);
      }
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallPrompt(false);
    }
  }, []);

  if (!showInstallPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slide-up">
      <div className="card bg-primary-600 text-white shadow-xl">
        <div className="flex items-start gap-3">
          <div className="text-3xl">📱</div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Install App</h3>
            <p className="text-sm text-primary-100 mb-3">
              Install Guitar Scale Trainer for quick access and offline practice!
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleInstallClick}
                className="bg-white text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
              >
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="bg-primary-700 hover:bg-primary-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white hover:text-primary-200 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
