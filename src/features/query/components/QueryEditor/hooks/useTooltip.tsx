import { useCallback, useEffect, useState } from "react";
import {
    disableRunShortcutTooltipPermanently,
    markRunShortcutTooltipShown,
    shouldShowRunShortcutTooltip,
} from "../../../utils/shortcutTooltip";

export const useTooltip = (query: string) => {
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShowTooltip(query.length !== 0 && shouldShowRunShortcutTooltip());
    }, [setShowTooltip, query]);

    const permanentlyRemoveTooltip = useCallback(() => {
        disableRunShortcutTooltipPermanently();
        setShowTooltip(false);
    }, []);

    const onTooltipShown = useCallback(() => {
        markRunShortcutTooltipShown();
    }, []);

    return {
        showTooltip,
        permanentlyRemoveTooltip,
        onTooltipShown,
    };
};
