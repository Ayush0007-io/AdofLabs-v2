"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "../../site-header.module.css";

const NAV_LINKS = [
  { name: "RESEARCH & INSIGHTS", href: "/research" },
  { name: "LAB", href: "/lab" },
  { name: "PROGRESS", href: "/progress" },
  { name: "COMPANY", href: "/company" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMenuOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const oldBodyOverflow = document.body.style.overflow;
    const oldHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = oldBodyOverflow;
      document.documentElement.style.overflow = oldHtmlOverflow;

      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1025px)");

    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    };

    media.addEventListener("change", handleDesktop);

    return () => {
      media.removeEventListener("change", handleDesktop);
    };
  }, []);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>

        {/* DESKTOP — RESTORE ORIGINAL WORKING DESIGN */}
        <div className={styles.desktopHeader}>
          <Link href="/" className={styles.desktopLogo}>
            <img src="/adoflogo (1).svg" alt="AdofLabs" />
          </Link>

          <nav
            className={styles.desktopNav}
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.desktopNavLink}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <Link href="/join" className={styles.desktopCta}>
            <span>JOIN THE MISSION</span>
            <span>→</span>
          </Link>
        </div>


        {/* MOBILE / TABLET */}
        <div className={styles.mobileHeader}>
          <Link
            href="/"
            className={styles.mobileLogo}
            onClick={() => setMenuOpen(false)}
          >
            <img src="/adoflogo (1).svg" alt="AdofLabs" />
          </Link>

          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

      </header>

      {mounted &&
        menuOpen &&
        createPortal(
          <div
            id="mobile-navigation"
            className={styles.mobileOverlay}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className={styles.mobileMenuHeader}>
              <Link
                href="/"
                className={styles.mobileMenuLogo}
                onClick={() => setMenuOpen(false)}
              >
                <img src="/adoflogo (1).svg" alt="AdofLabs" />
              </Link>

              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <nav className={styles.mobileNav}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <Link
              href="/join"
              className={styles.mobileCta}
              onClick={() => setMenuOpen(false)}
            >
              <span>JOIN THE MISSION</span>
              <span>→</span>
            </Link>
          </div>,
          document.body
        )}
    </>
  );
}
