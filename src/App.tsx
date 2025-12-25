import QueryPage from "./pages/QueryPage";
import { QueryDataProvider } from "./features/query/contexts/QueryDataContextProvider";
import { ActiveQueryProvider } from "./features/query/contexts/ActiveQueryContextProvider";
import "./main.css";

function App() {
    return (
        <QueryDataProvider initialQueries={{}}>
            <ActiveQueryProvider initialActiveQueryId={""}>
                <QueryPage />
            </ActiveQueryProvider>
        </QueryDataProvider>
    );
}

export default App;
