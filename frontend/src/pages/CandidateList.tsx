import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Candidate } from "../types/candidate";
import {
  getCandidates,
  deleteCandidate,
} from "../services/candidateService";

const CandidateList = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    const data = await getCandidates();
    setCandidates(data);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete Candidate?")) return;

    await deleteCandidate(id);

    loadCandidates();
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">

        Candidate List

      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200">

          <tr>

            <th className="p-3">Name</th>

            <th>Email</th>

            <th>ATS</th>

            <th>Match</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {candidates.map((candidate) => (

            <tr
              key={candidate.id}
              className="border-b text-center"
            >

              <td className="p-3">
                {candidate.candidate_name}
              </td>

              <td>
                {candidate.email}
              </td>

              <td>
                {candidate.ats_score}
              </td>

              <td>
                {candidate.match_score}
              </td>

              <td>

                <Link
                  to={`/candidate/${candidate.id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                >
                  View
                </Link>

                <button
                  onClick={() => handleDelete(candidate.id)}
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
  );
};

export default CandidateList;