import Link from "next/link";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        
        {/* TOP COMPOSITION: Asymmetric 12-col grid */}
        <div className={styles.topGrid}>
          
          {/* LEFT NAVIGATION: ~5 cols */}
          <div className={styles.navigationColumn}>
            <nav className={styles.navigation}>
              <span className={styles.navigationHeading}>
                Explore
              </span>
              <ul className={styles.navigationList}>
                <li>
                  <Link href="/research" className={styles.navigationLink}>
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="/lab" className={styles.navigationLink}>
                    Lab
                  </Link>
                </li>
                <li>
                  <Link href="/insights" className={styles.navigationLink}>
                    Research & Insights
                  </Link>
                </li>
                <li>
                  <Link href="/progress" className={styles.navigationLink}>
                    Progress
                  </Link>
                </li>
              </ul>
            </nav>

            <nav className={styles.navigation}>
              <span className={styles.navigationHeading}>
                Adof Labs
              </span>
              <ul className={styles.navigationList}>
                <li>
                  <Link href="/company" className={styles.navigationLink}>
                    Company
                  </Link>
                </li>
                <li>
                  <Link href="/join" className={styles.navigationLink}>
                    Join
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className={styles.navigationLink}>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* RIGHT CTA: ~7 cols */}
          <div className={styles.cta}>
            <h2 className={styles.ctaHeading}>
              Some of the hardest problems in intelligence are still open.
            </h2>
            <p className={styles.ctaBody}>
              We’re looking for researchers, engineers and collaborators who want to work on them.
            </p>
            <div>
              <Link 
                href="/join"
                className={styles.ctaButton}
              >
                JOIN THE MISSION
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={styles.ctaIcon}
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* PRIMARY DIVIDER */}
        <div className={styles.divider} />

        {/* UTILITY ROW */}
        <div className={styles.utilityRow}>
          <p className={styles.copyright}>
            © 2026 AdofLabs. All rights reserved.
          </p>
          <div className={styles.utilityLinks}>
            <Link href="/privacy" className={styles.utilityLink}>
              Privacy
            </Link>
            <Link href="/terms" className={styles.utilityLink}>
              Terms
            </Link>
            <Link href="https://linkedin.com" className={styles.utilityLink}>
              LinkedIn
            </Link>
            <Link href="https://x.com" className={styles.utilityLink}>
              X
            </Link>
          </div>
        </div>

      </div>

      {/* OVERSIZED ADOFLABS WORDMARK */}
      <div 
        aria-hidden="true" 
        className={styles.wordmarkContainer}
      >
        <span className={styles.wordmark}>
          ADOF LABS
        </span>
      </div>
    </footer>
  );
}

