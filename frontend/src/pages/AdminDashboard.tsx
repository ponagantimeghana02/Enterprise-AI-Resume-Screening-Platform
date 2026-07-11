import { useEffect, useState } from "react";
import {
  getUsers,
  getResumes,
  getDocuments,
  deleteUser,
  deleteResume,
} from "../services/adminService";

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [resumes, setResumes] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      setLoading(true);

      const [usersData, resumesData, documentsData] =
        await Promise.all([
          getUsers(),
          getResumes(),
          getDocuments(),
        ]);

      setUsers(usersData);
      setResumes(resumesData);
      setDocuments(documentsData);
    } catch (error) {
      console.log(error);
      alert("Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!window.confirm("Delete this user?")) return;

    await deleteUser(id);
    loadAdminData();
  };

  const handleDeleteResume = async (id: number) => {
    if (!window.confirm("Delete this resume?")) return;

    await deleteResume(id);
    loadAdminData();
  };

  if (loading) {
    return <h2>Loading Admin Dashboard...</h2>;
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-blue-500 text-white rounded p-6 text-center">
          <h2 className="text-lg">Users</h2>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>

        <div className="bg-green-500 text-white rounded p-6 text-center">
          <h2 className="text-lg">Resumes</h2>
          <p className="text-3xl font-bold">{resumes.length}</p>
        </div>

        <div className="bg-purple-500 text-white rounded p-6 text-center">
          <h2 className="text-lg">Documents</h2>
          <p className="text-3xl font-bold">{documents.length}</p>
        </div>

      </div>

      {/* Users Table */}
      <div className="bg-white rounded shadow p-5 mb-8">

        <h2 className="text-xl font-bold mb-4">
          Users
        </h2>

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-2">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user.id} className="border-b text-center">

                <td>{user.id}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>

                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Resumes Table */}
      <div className="bg-white rounded shadow p-5 mb-8">

        <h2 className="text-xl font-bold mb-4">
          Resumes
        </h2>

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-2">ID</th>
              <th>Candidate</th>
              <th>ATS</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {resumes.map((resume) => (

              <tr key={resume.id} className="border-b text-center">

                <td>{resume.id}</td>

                <td>{resume.candidate_name}</td>

                <td>{resume.ats_score}</td>

                <td>

                  <button
                    onClick={() => handleDeleteResume(resume.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Documents Table */}
      <div className="bg-white rounded shadow p-5">

        <h2 className="text-xl font-bold mb-4">
          Uploaded Documents
        </h2>

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-2">S.No</th>
              <th>Filename</th>
            </tr>

          </thead>

          <tbody>
            {resumes.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center p-4"> 
                  No documents found.
                </td>
              </tr>
            )}

            {resumes.map((doc,index) => (

              <tr key={doc.id} className="border-b text-center">

                <td>{index + 1}</td>

                <td>{doc.filename}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminDashboard;