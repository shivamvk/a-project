import React from "react";

function Loader() {
    return (
        <section
            aria-busy="true"
            aria-live="polite"
            role="status"
            style={{ padding: "2rem", textAlign: "center" }}
        >
            <div style={{ marginBottom: "0.5rem" }}>
                <span
                    className="loader"
                    aria-hidden="true"
                    style={{
                        display: "inline-block",
                        width: "2rem",
                        height: "2rem",
                        border: "0.3rem solid #ccc",
                        borderTop: "0.3rem solid #333",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                    }}
                ></span>
            </div>
            <p>Loading…</p>
            <style>
                {`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </section>
    );
}

export default React.memo(Loader);
