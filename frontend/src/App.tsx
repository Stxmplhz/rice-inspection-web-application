import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header.tsx";
import HistoryList from "./pages/HistoryList.tsx";
import CreateInspection from "./pages/CreateInspection.tsx";
import ResultInspection from "./pages/ResultInspection.tsx";
import EditInspection from "./pages/EditInspection.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<HistoryList />} /> 
            <Route path="/history" element={<Navigate to="/" replace />} />
            <Route path="/create" element={<CreateInspection />} />
            <Route path="/result/:id" element={<ResultInspection />} />
            <Route path="/edit/:id" element={<EditInspection />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}


export default App;