"use client";

import { useState } from "react";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bp-nav" role="navigation" aria-label="VISORA main navigation">
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 600px) {
            .bp-nav {
              padding: 0 16px !important;
            }
            .bp-nav-meta {
              display: none !important;
            }
            .bp-nav-btn {
              padding: 4px 10px !important;
              font-size: 8.5px !important;
            }
          }
        `}} />
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Hamburger trigger (three lines menu) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              padding: "8px",
              outline: "none",
            }}
            aria-label="Open navigation menu"
          >
            <div style={{ width: "16px", height: "1px", background: "rgba(220, 240, 255, 0.95)" }} />
            <div style={{ width: "16px", height: "1px", background: "rgba(220, 240, 255, 0.95)" }} />
            <div style={{ width: "16px", height: "1px", background: "rgba(220, 240, 255, 0.95)" }} />
          </button>

          <div className="bp-nav-logo" aria-label="VISORA AI">
            VISORA
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <span className="bp-nav-meta">
            Systems Blueprint&nbsp; v2.4
          </span>
          <button className="bp-nav-btn" type="button" aria-label="Request access to VISORA AI">
            Request Access
          </button>
        </div>
      </nav>

      {/* Side Menu Drawer overlay */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(3, 5, 8, 0.65)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {/* Slide-out Menu Panel */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "280px",
              height: "100%",
              background: "rgba(8, 14, 22, 0.98)",
              borderRight: "1px solid rgba(80, 138, 205, 0.22)",
              padding: "40px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              boxShadow: "10px 0 30px rgba(0, 0, 0, 0.5)",
              position: "relative",
            }}
          >
            {/* Header / close bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "rgba(100, 160, 225, 0.85)",
                }}
              >
                NAVIGATION_PORT //
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(120, 175, 235, 0.80)",
                  fontSize: "16px",
                  padding: "4px",
                }}
              >
                ✕
              </button>
            </div>

            {/* Menu Navigation Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "What is VISORA", href: "#what-is-visora" },
                { label: "What is VNGE", href: "#what-is-vnge" },
                { label: "About Us", href: "#about-us" },
              ].map((link, idx) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "rgba(220, 240, 255, 0.90)",
                    textDecoration: "none",
                    padding: "8px 12px",
                    border: "1px solid transparent",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "rgba(8, 14, 22, 0.5)",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(80, 138, 205, 0.35)";
                    e.currentTarget.style.background = "rgba(8, 20, 35, 0.6)";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.background = "rgba(8, 14, 22, 0.5)";
                    e.currentTarget.style.color = "rgba(220, 240, 255, 0.90)";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "8.5px",
                      color: "rgba(100, 160, 225, 0.50)",
                    }}
                  >
                    0{idx + 1}
                  </span>
                  {link.label}
                </a>
              ))}
            </div>

            {/* Bottom blueprint directory meta info */}
            <div
              style={{
                position: "absolute",
                bottom: "24px",
                left: "24px",
                right: "24px",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "7.5px",
                color: "rgba(75, 125, 185, 0.40)",
                lineHeight: 1.4,
              }}
            >
              VISORA SYSTEM DIRECTORY //
              <br />
              All navigation interfaces active.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
