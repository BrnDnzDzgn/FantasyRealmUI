import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeContainer from "./pages/home/HomeContainer"
import Results from "./pages/results/Results"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App
