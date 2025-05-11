import { Routes, Route } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHome, FantasyUserPersonalityAssociationPanel, PersonalitiyTypePanel, PersonalityAnswerPanel, QuestionChoicesPanel, QuestionsPanel, UserPanel, UserRolesPanel } from "./AdminPanel";

export default function AdminLayout() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-zinc-950">
      <AdminSidebar />
      <div className="ml-64 h-full overflow-auto p-8">
        <Routes>
          <Route path="" element={<AdminHome />} />
          <Route path="userPanel" element={<UserPanel />} />
          <Route path="userRolesPanel" element={<UserRolesPanel />} />
          <Route path="questionsPanel" element={<QuestionsPanel />} />
          <Route path="questionChoicesPanel" element={<QuestionChoicesPanel />} />          
          <Route path="personalitiyTypePanel" element={<PersonalitiyTypePanel />} />
          <Route path="personalityAnswerPanel" element={<PersonalityAnswerPanel />} />
          <Route path="fantasyUserPersonalityAssociationPanel" element={<FantasyUserPersonalityAssociationPanel />} />
        </Routes>
      </div>
    </div>
  );
}
