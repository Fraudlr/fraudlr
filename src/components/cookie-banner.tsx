"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

/**
 * GDPR-compliant cookie consent banner
 * 
 * This component displays a cookie consent banner that complies with GDPR requirements:
 * - Positioned at bottom left of the screen
 * - Allows users to accept or reject all cookies
 * - Stores user preference in localStorage
 * - Does not use cookies until user consents
 * - Can be dismissed or configured
 */

type CookieConsent = "accepted" | "rejected" | null;

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
      // Slight delay for animation
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
    
    // Here you would initialize your analytics, tracking, etc.
    console.log("Cookies accepted - Initialize analytics");
  };

  const handleRejectAll = () => {
    localStorage.setItem("cookie-consent", "rejected");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
    
    // Ensure no tracking cookies are set
    console.log("Cookies rejected - Disable analytics");
  };

  const handleClose = () => {
    // Treating close as reject for GDPR compliance
    handleRejectAll();
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-md transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <Card className="border-fraudlr-red/20 bg-background/95 p-6 shadow-lg backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Cookie Consent
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              We use cookies to enhance your browsing experience, analyze site
              traffic, and personalize content. By clicking "Accept All", you
              consent to our use of cookies.{" "}
              <a
                href="/privacy-policy"
                className="text-fraudlr-red underline-offset-4 hover:underline"
              >
                Learn more
              </a>
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                onClick={handleAcceptAll}
                className="bg-fraudlr-red hover:bg-fraudlr-red/90"
              >
                Accept All
              </Button>
              <Button
                onClick={handleRejectAll}
                variant="outline"
                className="border-fraudlr-red/20 hover:bg-fraudlr-red/10"
              >
                Reject All
              </Button>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close cookie banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </Card>
    </div>
  );
}
