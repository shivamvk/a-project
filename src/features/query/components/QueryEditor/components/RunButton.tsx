import React, { useCallback, useEffect } from "react";

import styles from "./RunButton.module.css";

interface IRunButton {
    disabled: boolean;
    showTooltip: boolean;
    permanentlyRemoveTooltip: VoidFunction;
    onTooltipShown: VoidFunction;
}

function RunButton({
    disabled,
    showTooltip,
    permanentlyRemoveTooltip,
    onTooltipShown,
}: IRunButton) {
    const handleDismissTooltip = useCallback(() => {
        permanentlyRemoveTooltip();
    }, [permanentlyRemoveTooltip]);

    useEffect(() => {
        if (showTooltip) {
            onTooltipShown();
        }
    }, [showTooltip, onTooltipShown]);

    return (
        <div
            style={{
                position: "relative",
                display: "inline-flex",
                width: "100%",
            }}
        >
            <button type="submit" disabled={disabled}>
                Run
            </button>
            {showTooltip && (
                <div className={styles.runShortcutTooltip}>
                    Run with <strong>Ctrl / Cmd + Enter</strong>
                    <button
                        className={styles.tooltipClose}
                        onClick={handleDismissTooltip}
                        aria-label="Dismiss shortcut hint"
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
}

export default React.memo(RunButton);
