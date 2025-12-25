import {
    QueryEditor,
    ResultsSection,
    QuerySidebar,
} from "../features/query/components/";
import { useState } from "react";
import { useActiveQuery } from "../features/query/hooks/useActiveQuery";

function QueryPage() {
    const [query, setQuery] = useState("");
    const { activeQueryId } = useActiveQuery();

    return (
        <div className="page">
            <aside className="sidebarContainer">
                <QuerySidebar setQuery={setQuery} />
            </aside>
            <main className="main">
                <QueryEditor
                    query={query}
                    setQuery={setQuery}
                    key={activeQueryId ?? "new"}
                />
                <ResultsSection />
            </main>
        </div>
    );
}

export default QueryPage;
