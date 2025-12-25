import React from "react";
import styles from "./ErrorState.module.css";

function EmptyState({ text }: { text?: string }) {
    return (
        <section
            aria-live="polite"
            role="status"
            style={{ padding: "2rem", textAlign: "center" }}
        >
            <svg
                className={styles.errorIcon}
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="1.5"
                />
                <line
                    x1="12"
                    y1="7"
                    x2="12"
                    y2="13"
                    stroke="currentColor"
                    stroke-width="1.5"
                />
                <circle cx="12" cy="17" r="1" fill="currentColor" />
            </svg>
            <p>{text || "Something went wrong"}</p>
        </section>
    );
}

export default React.memo(EmptyState);
