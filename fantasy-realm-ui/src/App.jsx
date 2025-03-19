import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizContainer from "./pages/quiz/QuizContainer";
import ResultsContainer from "./pages/results/ResultsContainer";
import HomeContainer from "./pages/home/HomeContainer";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
  return (
    <Router>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomeContainer />} />
              <Route path="/quiz" element={<QuizContainer />} />
              <Route path="/results" element={<ResultsContainer />} />
            </Routes>
            <div className="fixed bottom-4 left-4 z-50">
                <SidebarTrigger />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Router>
  );
}

export default App;