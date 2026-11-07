import React, { useState, useEffect } from "react";
import styles from "./ResponsiveDemo.module.css";

/**
 * ResponsiveDemo Component
 * Demonstrates:
 * 1. Mobile-First responsive navigation with hamburger toggle
 * 2. Fluid typography scaling with CSS clamp()
 * 3. Dynamic viewport width & breakpoint detector badge
 * 4. Responsive multi-column layout adapting from 1 -> 2 -> 3 columns
 * 5. Flexible image/media card with aspect-ratio
 */
const ResponsiveDemo = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine active breakpoint label
  const getBreakpoint = () => {
    if (windowWidth < 640) return { label: "Mobile (<640px)", color: "#ef4444" };
    if (windowWidth < 1024) return { label: "Tablet (640px - 1023px)", color: "#f59e0b" };
    return { label: "Desktop (≥1024px)", color: "#10b981" };
  };

  const currentBp = getBreakpoint();

  return (
    <div className={styles.container}>
      {/* Dynamic Breakpoint Indicator Bar */}
      <div className={styles.viewportIndicator}>
        <span>Viewport Width: <strong>{windowWidth}px</strong></span>
        <span
          className={styles.breakpointBadge}
          style={{ backgroundColor: currentBp.color }}
        >
          {currentBp.label}
        </span>
      </div>

      {/* Responsive Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.brand}>RespWeb</div>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        <ul className={`${styles.navLinks} ${menuOpen ? styles.navActive : ""}`}>
          <li><a href="#hero" onClick={() => setMenuOpen(false)}>Hero</a></li>
          <li><a href="#units" onClick={() => setMenuOpen(false)}>Units</a></li>
          <li><a href="#grid" onClick={() => setMenuOpen(false)}>Cards</a></li>
          <li><a href="#media" onClick={() => setMenuOpen(false)}>Media</a></li>
        </ul>
      </nav>

      {/* Fluid Hero Section */}
      <header id="hero" className={styles.heroSection}>
        <span className={styles.tag}>Day 11: Responsiveness Concepts</span>
        <h1 className={styles.fluidHeading}>
          One Codebase for Every Device Screen
        </h1>
        <p className={styles.heroDescription}>
          This heading and body typography smoothly scales using modern{" "}
          <code>clamp()</code> functions—ensuring no awkward text overflow on mobile
          or microscopic text on ultra-wide monitors.
        </p>
        <div className={styles.heroActions}>
          <button className={styles.btnPrimary}>Resize Browser</button>
          <button className={styles.btnSecondary}>Learn Breakpoints</button>
        </div>
      </header>

      {/* Responsive Columns / Grid Section */}
      <section id="grid" className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Responsive Layout Architecture</h2>
          <p>Stacks to 1 column on mobile, 2 columns on tablet, and 3 columns on desktop.</p>
        </div>

        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📱</div>
            <h3>1. Fluid Grids & %</h3>
            <p>
              Containers define fluid boundaries rather than rigid pixel dimensions,
              allowing child content to reflow naturally.
            </p>
            <div className={styles.codeSnippet}>width: min(100%, 1200px);</div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>📐</div>
            <h3>2. CSS Media Queries</h3>
            <p>
              Media queries conditionally override rules at designated breakpoints
              following a mobile-first philosophy.
            </p>
            <div className={styles.codeSnippet}>@media (min-width: 768px)</div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>🖼️</div>
            <h3>3. Flexible Media</h3>
            <p>
              Images, SVGs, and videos are constrained with <code>max-width: 100%</code>{" "}
              so they never spill out of their parent containers.
            </p>
            <div className={styles.codeSnippet}>max-width: 100%; height: auto;</div>
          </div>
        </div>
      </section>

      {/* Responsive Media Showcase */}
      <section id="media" className={styles.section}>
        <div className={styles.mediaBox}>
          <div className={styles.mediaVisual}>
            <div className={styles.aspectRatioDemo}>
              <span>aspect-ratio: 16 / 9</span>
              <p>Scales fluidly across any screen ratio</p>
            </div>
          </div>
          <div className={styles.mediaContent}>
            <h3>Modern Responsive CSS Features</h3>
            <ul className={styles.featureList}>
              <li>
                <strong>clamp(min, val, max)</strong>: Seamless continuous scaling.
              </li>
              <li>
                <strong>aspect-ratio</strong>: Eliminates layout shift for videos and banners.
              </li>
              <li>
                <strong>CSS Grid auto-fit</strong>: Responsive grids without a single media query.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 Responsive Web Design Concepts — Day 11 Frontend</p>
      </footer>
    </div>
  );
};

export default ResponsiveDemo;
