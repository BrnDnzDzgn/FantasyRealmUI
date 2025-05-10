import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizContainer from "./pages/quiz/QuizContainer";
import ResultsContainer from "./pages/results/ResultsContainer";
import HomeContainer from "./pages/home/HomeContainer";
import PersonalityContainer from "./pages/personality/PersonalityContainer";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import ProfileContainer from "./pages/profile/ProfileContainer";
import LoginContainer from "./pages/login/LoginContainer";

function App() {
  return (
    <Router>
      <SidebarProvider defaultOpen={false}>
        <div className="relative flex min-h-screen overflow-x-hidden">
          <div className="fixed inset-y-0 left-0 z-50">
            <AppSidebar />
          </div>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomeContainer />} />
              <Route path="/quiz" element={<QuizContainer />} />
              <Route path="/results" element={<ResultsContainer />} />
              <Route path="/personality/:id" element={<PersonalityContainer />} />
              <Route path="/login" element={<LoginContainer/>} />
              <Route path="/profile" element={<ProfileContainer />} />
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