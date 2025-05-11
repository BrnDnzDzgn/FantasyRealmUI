import { Link } from "react-router-dom";

export function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-zinc-800 text-white flex flex-col p-4 pt-12 space-y-4 fixed">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      <Link to="/adminPanel">Home</Link>
      <Link to="/adminPanel/userPanel">User Panel</Link>
      <Link to="/adminPanel/userRolesPanel">User Roles Panel</Link>
      <Link to="/adminPanel/questionsPanel">Questions Panel</Link>
      <Link to="/adminPanel/questionChoicesPanel">Question Choices Panel</Link>      
      <Link to="/adminPanel/personalitiyTypePanel">Personality Type Panel</Link>
      <Link to="/adminPanel/personalityAnswerPanel">Personality Answer Panel</Link>
      <Link to="/adminPanel/fantasyUserPersonalityAssociationPanel">Fantasy User Personality Association Panel</Link>
    </div>
  );
}
