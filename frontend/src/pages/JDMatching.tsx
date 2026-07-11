import { useEffect, useState } from "react";
import { getCandidates } from "../services/candidateService";
import { matchResume } from "../services/resumeService";
import { Candidate } from "../types/candidate";

const JDMatching = () => {

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidateId, setCandidateId] = useState<number>(0);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const data = await getCandidates();
      setCandidates(data);

      if (data.length > 0) {
        setCandidateId(data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMatch = async () => {

    if (!jobDescription.trim()) {
      alert("Please enter Job Description");
      return;
    }

    try {

      setLoading(true);

      const data = await matchResume(
        candidateId,
        jobDescription
      );

      setResult(data);

    } catch (error) {

      console.log(error);

      alert("Matching Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">

        Resume vs Job Description Matching

      </h1>

      <div className="bg-white p-6 rounded shadow">

        <label className="font-semibold">

          Select Candidate

        </label>

        <select
          className="border p-2 rounded w-full mt-2 mb-5"
          value={candidateId}
          onChange={(e) =>
            setCandidateId(Number(e.target.value))
          }
        >
          {candidates.map((candidate) => (
            <option
              key={candidate.id}
              value={candidate.id}
            >
              {candidate.candidate_name}
            </option>
          ))}
        </select>

        <label className="font-semibold">

          Job Description

        </label>

        <textarea
          rows={8}
          className="border p-3 rounded w-full mt-2"
          placeholder="Paste Job Description..."
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
        />

        <button
          onClick={handleMatch}
          disabled={loading}
          className="mt-5 bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Matching..." : "Match Resume"}
        </button>

      </div>

      {result && (

        <div className="bg-white shadow rounded mt-8 p-6">

          <h2 className="text-2xl font-bold mb-5">

            Matching Result

          </h2>

          <p>
            <strong>Candidate:</strong>{" "}
            {result.candidate_name}
          </p>

          <p>
            <strong>Match Percentage:</strong>{" "}
            {result.match_percentage}%
          </p>

          <h3 className="font-bold mt-5">

            Matching Skills

          </h3>

          <ul className="list-disc ml-6">

            {result.matching_skills?.map(
              (skill: string, index: number) => (
                <li key={index}>{skill}</li>
              )
            )}

          </ul>

          <h3 className="font-bold mt-5">

            Missing Skills

          </h3>

          <ul className="list-disc ml-6">

            {result.missing_skills?.map(
              (skill: string, index: number) => (
                <li key={index}>{skill}</li>
              )
            )}

          </ul>

          <h3 className="font-bold mt-5">

            Skill Gap

          </h3>

          <p>{result.skill_gap}</p>

          <h3 className="font-bold mt-5">

            Recommendation

          </h3>

          <p>{result.recommendation}</p>

        </div>

      )}

    </div>

  );

};

export default JDMatching;