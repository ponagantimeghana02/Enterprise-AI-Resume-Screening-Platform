import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">

      <h2 className="text-xl font-bold mb-8">
        AI Resume
      </h2>

      <ul className="space-y-4">

        <li><Link to="/dashboard">Dashboard</Link></li>

        <li><Link to="/upload">Resume Upload</Link></li>

        <li><Link to="/candidates">Candidates</Link></li>

        <li><Link to="/search">Resume Search</Link></li>

        <li><Link to="/matching">JD Matching</Link></li>

        <li><Link to="/ranking">Ranking</Link></li>

        <li><Link to="/analytics">Analytics</Link></li>

        <li><Link to="/chat">Chat History</Link></li>

        <li><Link to="/admin">Admin</Link></li>

      </ul>

    </div>
  );
};

export default Sidebar;